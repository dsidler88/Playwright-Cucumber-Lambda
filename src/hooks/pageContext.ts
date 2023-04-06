import { Page } from "@playwright/test";
import { Logger } from "winston";

interface Ctx {
    page: Page;
    logger: Logger;
  }

export const ctx: Ctx = {
    // @ts-ignore
    page: undefined as Page,
    logger: undefined as Logger
}