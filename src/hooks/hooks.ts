import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { ctx } from "./pageContext";
import { invokeBrowser } from "../helper/browsers/browserFactory";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    //get from test execution command.
    getEnv();
    //try invoking browser in Before instead of BeforeAll. will also need to move close()
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "results/videos",
        },
    });
    const page = await context.newPage();
    ctx.page = page;
    ctx.logger = createLogger(options(scenarioName));
    ctx.logger.info("Logging for this scenario: "+scenarioName+"")
});

After(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;
    if (result?.status == Status.FAILED) {
        img = await ctx.page.screenshot({ path: `./results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await ctx.page.video().path();
    }
    await ctx.page.close();
    await context.close();
    if (result?.status == Status.FAILED) {
        this.attach(
            img, "image/png"
        );
        this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
    }

});

AfterAll(async function () {
    
    await browser.close();
    ctx.logger.info("Browser closed")
})