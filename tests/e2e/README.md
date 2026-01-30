# E2E Smoke Tests

This directory contains end-to-end smoke tests for the AI Tree project using Playwright.

## Test Coverage

### 1. Homepage Tests (`homepage.spec.ts`)
- ✅ Loads homepage for Estonian locale (`/et/`)
- ✅ Loads homepage for English locale (`/en/`)
- ✅ Displays navigation elements (search, language switcher)

### 2. Navigation Tests (`navigation.spec.ts`)
- ✅ Opens concept lightbox when clicking a concept node
- ✅ Navigates to tree view page

### 3. Locale Switch Tests (`locale-switch.spec.ts`)
- ✅ Switches from Estonian to English
- ✅ Switches from English to Estonian
- ✅ Preserves locale when navigating

### 4. Search Tests (`search.spec.ts`)
- ✅ Opens search modal with Cmd+K (Meta+K)
- ✅ Opens search modal by clicking search button
- ✅ Filters results when typing

### 5. Dark Mode Tests (`dark-mode.spec.ts`)
- ✅ Toggles dark mode on/off
- ✅ Persists dark mode preference across page reloads

### 6. Mobile Tests (`mobile.spec.ts`)
- ✅ Displays mobile navigation on 375px viewport
- ✅ Shows responsive header on mobile
- ✅ Allows scrolling through sections
- ✅ Displays level indicator when scrolled
- ✅ Opens and closes modals on mobile

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test tests/e2e/homepage.spec.ts

# Run tests in debug mode
npx playwright test --debug
```

## Configuration

Tests are configured in `/playwright.config.ts`:
- **Browser**: Chromium only (for fast CI)
- **Base URL**: http://localhost:3000
- **Web Server**: Automatically starts Next.js dev server
- **Timeout**: 120 seconds for server startup
- **Reporter**: HTML report (view with `npx playwright show-report`)

## Test Strategy

These are **smoke tests** designed to catch major regressions:
- Focus on critical user paths
- Use resilient selectors (ARIA roles, accessible names)
- Fallback gracefully when elements aren't found
- Keep tests fast and maintainable

## CI/CD

On CI:
- Retries: 2 attempts
- Workers: 1 (sequential)
- Uses existing server if available

## Debugging

If tests fail:
1. Run with `--headed` flag to see the browser
2. Use `--debug` flag for step-by-step debugging
3. Check the HTML report: `npx playwright show-report`
4. Use `page.pause()` in tests to inspect state

## Adding New Tests

1. Create a new `.spec.ts` file in `tests/e2e/`
2. Import `test` and `expect` from `@playwright/test`
3. Use `test.describe()` to group related tests
4. Use accessible selectors (roles, labels) when possible
5. Add fallbacks for brittle selectors
