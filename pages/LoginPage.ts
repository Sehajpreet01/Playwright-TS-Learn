// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput: string;
  private passwordInput: string;
  private submitButton: string;
  private logoutButton: string;
  private welcomeHeader: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.submitButton = '#login-button';
    this.logoutButton = '#react-burger-menu-btn';
    this.welcomeHeader = '.app_logo';
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async isLogoutVisible(): Promise<Locator> {
    return this.page.locator(this.logoutButton);
  }

  async getWelcomeText(): Promise<Locator> {
    return this.page.locator(this.welcomeHeader);
  }
}