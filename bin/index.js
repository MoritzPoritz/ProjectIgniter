#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const fs = require('fs');
const path = require('path');

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
};
const options = yargs
    .usage("Usage: -t <type>")
    .option("t", {
        alias: "type",
        describe: "The type of project you want to set up",
        type: "string",
        demandOption: true
    })
    .argv;

let configJSON = fs.readFileSync(path.resolve('bin/creators.json'));
let config = JSON.parse(configJSON);
var creatorObject;

switch (options.type) {
    case "standard":
        creatorObject = config.standard;
        break;
}

console.log(config)

createdMessage = (type, value) => {
    const message = " > " + chalk.white(type) + " " + chalk.yellow.bold(value) + " " + chalk.green.italic("created");
    return message;
}
for (let property in creatorObject) {
    try {
        if (creatorObject[property].type == "dir") {
            if (!fs.existsSync(creatorObject[property].value)) {
                fs.mkdir(creatorObject[property].value, (err) => {
                    console.log(createdMessage("folder", creatorObject[property].value));
                });
            }
        } else if (creatorObject[property].type == "file") {
            if (!fs.existsSync(creatorObject[property].value)) {

                const data = new Uint8Array(Buffer.from("#comment goes here"));
                fs.writeFile(creatorObject[property].value, data, () => {
                    console.log(createdMessage("file", creatorObject[property].value));
                })
            }
        }
    } catch (err) {
        console.error(err)
    }


}