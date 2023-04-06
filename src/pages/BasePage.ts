import { Page } from "@playwright/test";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";

export class BasePage {
  public page: Page;
  public logger = createLogger(options("Base Page"));
  constructor(page: Page) {
    this.page = page;
  }

  public async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    this.logger.info(`Navigating to URL: ${url}`);
  }

}
