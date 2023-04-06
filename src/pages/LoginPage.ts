import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from 'winston';

export class LoginPage extends BasePage {
  readonly logger: Logger;
  //readonly page: Page;
  readonly loginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly usernameBadge: Locator;
  readonly failureMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLink = this.page.locator("//span[text()='Login']")
    this.usernameInput = this.page.locator("input[formcontrolname='username']");
    this.passwordInput = this.page.locator("input[formcontrolname='password']");
    this.submitButton = this.page.locator("button[color='primary']");
    this.usernameBadge = this.page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]")
    this.failureMessage = this.page.locator("mat-error[role='alert']")

  }

  async goto() {
    await this.page.goto(process.env.BASEURL);
  }

  //this is NOT USED by the test steps, they are more granular
  //But this is useful if the user needs to re-log
  async login(username:string, password:string) {
    await this.usernameInput.type(username);
    await this.passwordInput.type(password)
  }
}