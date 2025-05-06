# Playwright TypeScript Demo

This project demonstrates automated testing using Playwright with TypeScript. It includes examples for login testing with Amazon.

## Prerequisites

- Node.js (v14 or newer)
- npm (comes with Node.js)
- Git

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Sehajpreet01/Playwright-TS-Learn.git
cd Playwright-TS-Learn
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with your credentials:

```
EMAIL=your_email@example.com
PASSWORD=your_password
```

**Note:** Never commit this file to version control. It's already added to `.gitignore` for security.

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode (with visible browser)

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/example.spec.ts
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

## View Test Reports

```bash
npx playwright show-report
```

## Project Structure

- `tests/` - Contains actual test files
- `tests-examples/` - Contains example test files from Playwright (reference only)
- `playwright.config.ts` - Playwright configuration
- `pages/` - Page Object Models (if implemented)

## Environment Variables

This project uses environment variables to securely handle credentials. You have three options:

1. **Using a .env file (for local development)**:
   Create a `.env` file as described above.

2. **Command-line variables (in PowerShell)**:
   ```powershell
   $env:EMAIL="your_email@example.com"; $env:PASSWORD="your_password"; npx playwright test
   ```

3. **CI/CD environments**:
   Configure secrets in your CI/CD platform.

## Debugging Tests

- **View trace files**: After test failure, run `npx playwright show-report`
- **Debug in VS Code**: Use the Playwright extension for VS Code for step-by-step debugging

## Updating Playwright

```bash
npm install -D @playwright/test@latest
npx playwright install --with-deps
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is open-source and available under the MIT License. 