const fs = require("fs-extra");
try {
    fs.ensureDir("results");
    fs.emptyDir("results");

} catch (error) {
    console.log("Folder not created! " + error);
}