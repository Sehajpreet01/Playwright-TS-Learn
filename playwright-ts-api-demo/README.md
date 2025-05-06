# Playwright TypeScript API Testing Demo

This project demonstrates how to use Playwright for API testing with TypeScript.

## Setup

1. Make sure you have Node.js installed (version 14 or newer)
2. Install the dependencies:
   ```
   npm install
   ```
3. Install Playwright browsers:
   ```
   npx playwright install
   ```

## Project Structure

- `playwright.config.ts` - Playwright configuration file
- `tests/api.test.ts` - API tests
- `utils/apiService.ts` - API service class for making HTTP requests

## Running Tests

Run all tests:
```
npx playwright test
```

Run a specific test file:
```
npx playwright test tests/api.test.ts
```

Run tests with UI mode (interactive):
```
npx playwright test --ui
```

View test report:
```
npx playwright show-report
```

## Understanding the Code

### Configuration File (playwright.config.ts)
- Sets the base URL for API requests
- Configures test timeouts and retries
- Sets up test reporting

### API Service (utils/apiService.ts)
- Contains methods for making HTTP requests to the API
- Organizes API calls into a reusable class
- Handles different HTTP methods (GET, POST, PUT, DELETE)

### Test File (tests/api.test.ts)
- Imports the test framework and API service
- Sets up the test environment
- Contains individual test cases for different API operations
- Uses assertions to verify API responses

## API Testing Concepts

1. **Request Context**: Playwright uses a request context to manage API calls, handling things like base URLs and headers.

2. **HTTP Methods**:
   - GET: Retrieve data
   - POST: Create new data
   - PUT: Update existing data
   - DELETE: Remove data

3. **Assertions**:
   - Status codes (200 OK, 201 Created, etc.)
   - Response body structure and content
   - Data types and values

4. **Test Organization**:
   - `test.describe()` groups related tests
   - `test.beforeAll()` runs setup code once before all tests
   - Individual `test()` functions for each test case 