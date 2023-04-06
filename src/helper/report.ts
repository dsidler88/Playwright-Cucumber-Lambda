const report = require("multiple-cucumber-html-reporter");
const os = require('os');
const username = process.env.USER ||os.userInfo().username
const plat = os.platform()
const ver = os.release()

report.generate({
    jsonDir: "results",
    reportPath: "results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "Test Report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: username+" environment",
        platform: {
            name: plat,
            version: ver,
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Book Cart Application" },
            { label: "Release", value: "X.X.X.X" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});