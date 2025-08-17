const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "..", "out", "_next", "static");

function obfuscateFiles(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            obfuscateFiles(filePath);
        } else if (filePath.endsWith(".js")) {
            const code = fs.readFileSync(filePath, "utf8");
            const obfuscated = JavaScriptObfuscator.obfuscate(code, {
                compact: true,
                controlFlowFlattening: true,
            }).getObfuscatedCode();
            fs.writeFileSync(filePath, obfuscated, "utf8");
        }
    });
}

obfuscateFiles(folder);
console.log("JS obfuscation done!");
