import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ctx } from "../../hooks/pageContext";
import { LoginPage } from "../../pages/LoginPage";

setDefaultTimeout(60 * 1000 * 2)
let loginPage = undefined

Given('User navigates to the application', async function () {
    //page context set in before hook. PO initialized in navigation step
    loginPage = new LoginPage(ctx.page)
    await loginPage.navigateTo(process.env.BASEURL)
    loginPage.logger.info("loginpage logger")
})

Given('User click on the login link', async function () {
    await loginPage.loginLink.click()
});

Given('User enter the username as {string}', async function (username) {
    await loginPage.usernameInput.type(username);
}); 

Given('User enter the password as {string}', async function (password) {
    await loginPage.passwordInput.type(password);

})

When('User click on the login button', async function () {
    await loginPage.submitButton.click()
    loginPage.page.waitForLoadState();
    loginPage.logger.info("Waiting for 2 seconds")
    await loginPage.page.waitForTimeout(1000);
});


Then('Login should be success', async function () {
    const text = await loginPage.usernameBadge.textContent();
    ctx.logger.info("THIS IS THE CONTEXT LOGGER: Username: " + text);

})

When('Login should fail', async function () {
    const failureMesssage = loginPage.failureMessage;
    await expect(failureMesssage).toBeVisible();
});
