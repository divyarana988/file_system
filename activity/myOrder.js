#!/usr/bin/env node

const { view } = require("./commands/view");
const { help } = require("./commands/help");
const { organise } = require("./commands/organise");

let input = process.argv.slice(2);
let command = input[0];

switch (command) {
    case "view":
        view(input[1], input[2]);
        break;
    case "help":
        help();
        break;
    case "organise":
        organise(input[1]);
        break;
    default:
        console.log("wrong command");
}