const fs = require("fs");
const path = require("path");
const readline = require("readline");
const process = require('process');

const filePath = path.join(__dirname, "write.txt");
const writeableStream = fs.createWriteStream(filePath);
const interfaceInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interfaceInstance.setPrompt("Enter your text:\n");
interfaceInstance.prompt();

interfaceInstance.on("line", (input) => {
    if (input.toLowerCase() === "exit") {
        return interfaceInstance.close();
    }
    process.on('SIGINT', () => {
        interfaceInstance.close();
    });
    writeableStream.write(input + "\n");
});