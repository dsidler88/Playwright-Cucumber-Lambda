##The purpose here is to dynamically spin up lambda functions for every Playwright test, theoretically running hundreds in parallel. Driven by Cucumber BDD
- On hold for now 😅 we'll get there. If I do complete this in my spare time it will likely not be with Cucumber, as it's on the way out.


npx playwright install

npm init playwright@latest --yes -- --quiet --browser=chromium --browser=firefox --browser=webkit --gha
npm i @cucumber/cucumber -D
npm i ts-node -D

"formatOptions":{
"snippetInterface": "async-await"
},

dryrun = true generates steps but doesn't execute tests.

Edit VSCode Cucumber settings. Cmd-,

Glue links feature steps to the steps code
