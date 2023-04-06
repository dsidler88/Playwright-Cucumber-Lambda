import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000 * 2)

import { expect } from "@playwright/test";
import { ctx } from "../../hooks/pageContext";


Given('user search for a {string}', async function (book) {
    ctx.logger.info("Searching for a book: " + book)
    await ctx.page.locator("input[type='search']").type(book);
    await ctx.page.waitForTimeout(2000);
    await ctx.page.locator("mat-option[role='option'] span").click();
});
When('user add the book to the cart', async function () {
    await ctx.page.locator("//button[@color='primary']").click();
});
Then('the cart badge should get updated', async function () {
    const badgeCount = await ctx.page.locator("#mat-badge-content-0").textContent();
    expect(Number(badgeCount)).toBeGreaterThan(0);
});
