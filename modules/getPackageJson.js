const { prompt } = require("inquirer");

module.exports = async (projectname) => {
    const questions = [
        {
            type: "input",
            name: "repoUrl",
            message: "Git Repository"
        },
        {
            type: "input",
            name: "author",
            message: "Author"
        },
        {
            type: "input",
            name: "license",
            message: "License",
            default: "ISC"
        }
    ];

    const initParams = await prompt(questions);

    const packageDefaults = {
        "name": projectname,
        "version": "1.0.0",
        "description": "REST API initialized using rest-boilerplate-cli",
        "main": "app.js",
        "scripts": {
            "start": "node app.js"
        },
        "repository": {
            "type": "git",
            "url": "git+" + initParams.repoUrl
        },
        "author": initParams.author,
        "license": initParams.license
    };
    return JSON.stringify(packageDefaults, null, 2);
}