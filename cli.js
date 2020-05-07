#!/usr/bin/env node
const { program } = require("commander");
const init = require('./init');

const d = {
    "v": "1.1.0",
    "description": "Command Line Interface to create boilerplate app for building a REST API using Node.js & Express.",
    "action": () => {
        console.log("Usage: rest init <projectname>");
    }
}

program.version(d.v).description(d.description).action(d.action);

program.command("init <projectname>").description("Initialize a new REST App").action((projectname) => init(projectname));

program.parse(process.argv);