const createBoilerplate = require("./createBoilerplate");
const fs = require("fs");

const { exec } = require("child_process");

module.exports = (projectname, packageJsonContent) => {
    console.info("> Initializing Node Project");
    fs.writeFileSync(projectname + "/package.json", packageJsonContent);
    console.info("> Done.\n");

    console.info("> Initializing git repository");
    exec(`cd ${projectname} && git init`);
    console.info("> Done.\n");

    console.info("> Creating .gitignore");
    fs.writeFileSync(projectname + "/.gitignore", "node_modules/");
    console.info("> Done.\n");

    fs.writeFileSync(projectname + "/README.md", "# REST API Boilerplate created using [rest-boilerplate-cli](https://npmjs.com/package/rest-boilerplate-cli)");
    
    console.info("> Installing Dependencies");
    exec(`cd ${projectname} && npm i express morgan body-parser cors`);
    console.info("> Done.\n");
    
    console.info("> Setting up project");
    createBoilerplate(projectname);
    console.info("> Done.\n");
}