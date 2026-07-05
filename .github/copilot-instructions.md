# Copilot Instructions

This repository is a Playwright E2E test suite for `https://qaplayground.dev`. There is no app source code here—only automated tests in `tests/`.

## What to know

- Primary files:
  - `package.json` — no npm test scripts defined; run Playwright directly.
  - `playwright.config.js` — test directory is `./tests`, `fullyParallel` is disabled, `headless: true`, reporter is HTML, and trace is enabled on first retry.
  - `tests/*.spec.js` — the entire test coverage lives here.
- Tests target production-like URLs directly, not a local dev server.
- The project uses Playwright with JavaScript and Playwright’s built-in fixtures: `test`, `expect`, `page`.

## Workflow

- Install deps: `npm install`
- Install Playwright browsers: `npx playwright install`
- Run all tests: `npx playwright test`
- Run one file: `npx playwright test tests/dynamic-table.spec.js`
- Open the report: `npx playwright show-report`

## Patterns to follow

- Use `page.goto()` with full app URLs, as there is no `baseURL` enabled.
- Prefer Playwright selectors already used in the repo:
  - `page.getByRole('button', { name: ... })`
  - `page.getByText(...)`
  - `page.locator(...)`
- Keep suites focused by feature:
  - `tests/dynamic-table.spec.js` for the Dynamic Table app.
  - `tests/verify-your-account.spec.js` for account verification.
  - `tests/teste.spec.js` for broader site navigation and mixed app flows.
- For dynamic content, use the existing approach of extracting page text and validating against expected values rather than hard-coded order.

## Project-specific details

- `tests/dynamic-table.spec.js` validates dynamic table rows, image `src` paths, and loaded image dimensions using `naturalWidth > 0`.
- `tests/verify-your-account.spec.js` extracts the 6-digit confirmation code from `small.info` and types it into the `input.code` fields.
- `tests/teste.spec.js` includes exploratory navigation through the main site and app links.

## Avoid

- Adding application/server code; this repo is test automation only.
- Assuming local environment variables or `dotenv` are active; the config has those lines commented out.
- Creating new scripts in `package.json` unless the feature explicitly needs them.
