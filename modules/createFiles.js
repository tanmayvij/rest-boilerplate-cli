const createBoilerplate = require("./createBoilerplate");
const fs = require("fs");

const { exec } = require("child_process");

module.exports = (projectname, packageJsonContent) => {
    console.info("Creating package.json file...");
    fs.writeFileSync(projectname + "/package.json", packageJsonContent);
    console.info("Done.\n");

    console.info("Initializing git repository...");
    exec(`cd ${projectname} && git init`);
    console.info("Done.\n");

    console.info("Creating .gitignore file...");
    fs.writeFileSync(projectname + "/.gitignore", "node_modules/");
    console.info("Done.\n");

    console.info("Creating README.md file...");
    fs.writeFileSync(projectname + "/README.md", "# REST API Boilerplate created using [rest-boilerplate-cli](https://npmjs.com/package/rest-boilerplate-cli)");
    console.info("Done.\n");

    console.info("Installing express...");
    exec(`cd ${projectname} && npm i express`);
    console.info("Done.\n");
    
    console.info("Setting up boilerplate code...");
    createBoilerplate(projectname);
    console.info("Done.\n");
}