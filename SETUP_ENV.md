# Setting Up Secure Credentials

This project uses environment variables to securely handle sensitive information like login credentials. Follow these steps to set up your environment:

## Option 1: Using a .env file (for local development only)

1. Create a `.env` file in the root of your project (this file should NEVER be committed to version control)
2. Add your credentials in the following format:

```
EMAIL=your_email@example.com
PASSWORD=your_password
```

3. The `dotenv` package is already configured in the project to load these values

## Option 2: Using command-line variables (recommended for CI/CD)

Run your tests with the environment variables set directly:

```bash
EMAIL=your_email@example.com PASSWORD=your_password npx playwright test
```

## Option 3: Using GitHub Actions secrets (for CI/CD)

If you're using GitHub Actions, set up repository secrets and access them in your workflow:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Run tests
        run: npx playwright test
        env:
          EMAIL: ${{ secrets.EMAIL }}
          PASSWORD: ${{ secrets.PASSWORD }}
```

## Tips for Secure Credential Handling

1. Never hardcode credentials in your test files
2. Add `.env` to your `.gitignore` file (it's already there in this project)
3. Regularly rotate your credentials
4. Consider using temporary credentials for testing when possible
5. For extra security, use a vault service like AWS Secrets Manager or HashiCorp Vault 