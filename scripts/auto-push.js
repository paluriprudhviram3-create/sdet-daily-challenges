import axios from 'axios';
import { sdetChallenges } from '../src/generator.js';

const token = process.env.GH_PAT || process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER || 'paluriprudhviram3-create';
const repo = 'sdet-daily-challenges';

async function run() {
  if (!token) {
    console.error('GH_PAT or GITHUB_TOKEN environment variable is missing.');
    process.exit(1);
  }

  // 1. Fetch existing challenges to determine next index
  let existing = [];
  try {
    const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/challenges`, {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
    });
    existing = res.data.map(item => item.name);
  } catch (err) {
    console.log('No existing challenges directory found or error:', err.message);
  }

  // Find first challenge that hasn't been pushed yet
  const nextChallenge = sdetChallenges.find(c => !existing.includes(`${c.id}-${c.tags[0].toLowerCase()}`));

  if (!nextChallenge) {
    console.log('All configured challenges are already pushed.');
    return;
  }

  console.log(`Pushing next challenge: ${nextChallenge.id} - ${nextChallenge.title}`);

  const folderPath = `challenges/${nextChallenge.id}-${nextChallenge.tags[0].toLowerCase()}`;
  const files = [
    { path: `${folderPath}/${nextChallenge.codeFilename}`, content: nextChallenge.codeContent },
    { path: `${folderPath}/${nextChallenge.testFilename}`, content: nextChallenge.testContent },
    { path: `${folderPath}/README.md`, content: nextChallenge.readmeContent }
  ];

  for (const f of files) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${f.path}`;
    let sha;
    try {
      const getRes = await axios.get(url, {
        headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
      });
      sha = getRes.data.sha;
    } catch (e) {}

    await axios.put(url, {
      message: `feat(sdet-daily): add ${nextChallenge.id} - ${nextChallenge.title}`,
      content: Buffer.from(f.content).toString('base64'),
      sha: sha || undefined
    }, {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
    });
    console.log(`Pushed: ${f.path}`);
  }

  console.log('Daily challenge committed successfully!');
}

run().catch(err => {
  console.error('Run failed:', err.response?.data || err.message);
  process.exit(1);
});
