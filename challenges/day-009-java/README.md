# Java Selenium Dynamic WebTable Automation & XPath Axes

## 💡 Concept
Enterprise applications present large tables with dynamic sorting, filtering, and pagination. Hardcoded row indices (`tr[3]/td[2]`) break frequently when table data shifts.

## 🚀 Key Takeaways
- Use **relative XPath axes** (`ancestor::tr`, `following-sibling::td`) to anchor searches against known cell values (e.g. Username/Email) rather than fixed indices.
- Encapsulate table parsing into reusable helper utilities (`WebTableHelper`) that handle column maps and multi-page pagination.
- Extract tabular data into structured Java collections (`List<Map<String, String>>`) for clean assertion handling.
