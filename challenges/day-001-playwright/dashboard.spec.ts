import { test, expect } from './login.fixture';

test.describe('Dashboard Suite - SDET Automation', () => {
  test('should display user metrics upon auto-authentication', async ({ authenticatedPage }) => {
    const isVisible = await authenticatedPage.isMetricsWidgetVisible();
    expect(isVisible).toBeTruthy();
  });
});