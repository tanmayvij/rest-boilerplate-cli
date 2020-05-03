const { exec } = require("child_process");
const fs = require("fs");
const { prompt } = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const git = require("simple-git/promise");
const { Octokit } = require("@octokit/rest");
const { createBasicAuth } = require("@octokit/auth");
const Configstore = require("configstore");
const config = new Configstore("rest-boilerplate-cli");

module.exports = async (projectname) => {
    
    console.info(
        chalk.blue(figlet.textSync("REST Boilerplate"))
        );
    
    
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
    
    console.info("Creating new REST App in " + projectname);
    if(!fs.existsSync(projectname)) {
        fs.mkdirSync(projectname);
    }

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
    console.info("Creating package.json file...");
    fs.writeFileSync(projectname + "/package.json", JSON.stringify(packageDefaults, null, 2));
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
    await createBoilerplate(projectname);
    console.info("Done.\n");
    
    // Creating remote repository
    var choice = await prompt({
        "type": "confirm",
        "name": "remoteRepoBoolean",
        "message": "Do you want to create a remote repository?"
    });
    if(choice.remoteRepoBoolean) {
        var remoteRepoName = (await prompt({
            "type": "input",
            "name": "remoteRepoName",
            "message": "Repository Name?",
            "default": projectname
        })).remoteRepoName;
        var remoteRepoUrl = await createRemoteRepo(remoteRepoName);
        
        // Pushing default files
        choice = await prompt({
            "type": "confirm",
            "name": "pushChoice",
            "message": "Stage all existing files and push?"
        });
        if(choice.pushChoice)
        {
            gitPush(projectname, remoteRepoUrl);
        }
    }

};

function createBoilerplate(projectname) {
    const app = fs.readFileSync(__dirname + '/templates/app.js', {encoding: "utf-8"});
    const router = fs.readFileSync(__dirname + '/templates/system/index.js', {encoding: "utf-8"});
    const get = fs.readFileSync(__dirname + '/templates/system/modules/get.js', {encoding:"utf-8"});
    const post = fs.readFileSync(__dirname + '/templates/system/modules/post.js', {encoding: "utf-8"});

    fs.mkdirSync(projectname + "/system");
    fs.mkdirSync(projectname + "/system/modules");
    
    fs.writeFileSync(projectname + "/app.js", app);
    fs.writeFileSync(projectname + "/system/index.js", router);
    fs.writeFileSync(projectname + "/system/modules/get.js", get);
    fs.writeFileSync(projectname + "/system/modules/post.js", post);
    
}

async function createRemoteRepo(name) {
    
    var token = config.get("token");
    if(!token)
    {
        const credentials = await prompt([
            {
                "type": "input",
                "name": "username",
                "message": "Enter your GitHub username",
                "validate": (input) => {if(!input.length) return false; else return true;}
            },
            {
                "type": "password",
                "name": "password",
                "message": "Enter your GitHub password",
                "validate": (input) => {if(!input.length) return false; else return true;}
            }
        ]);
    
        
        const auth = createBasicAuth({
            username: credentials.username,
            password: credentials.password,
            token: {scopes:["repo"]},
            on2Fa() {
                return prompt("Two-factor authentication code");
            }
        });
        const authOutput = await auth({ type: "token" });
        token = authOutput.token;
        config.set("token", token);
    }
    try {

        const octokit = new Octokit({
            auth: token
        });
        const obj = await octokit.repos.createForAuthenticatedUser({name});
        return obj.data.html_url;
    }
    catch(e) {
        console.info(e);
    }
}

async function gitPush(projectname, url) {
    try {
        var commit = (await prompt({
            "type": "input",
            "name": "commit",
            "message": "Commit Message?",
            "default": "App created using rest-boilerplate-cli"
        })).commit;
        console.info("Adding remote 'origin'...");
        await git(projectname).addRemote("origin", url);
        console.info("Staging changes...");
        await git(projectname).add([
            '.gitignore',
            'app.js',
            'package-lock.json',
            'package.json',
            'README.md',
            'system'
        ]);
        console.info("Creating commit with message '" + commit + "'...");
        await git(projectname).commit(commit);
        console.info("Pushing to master branch...");
        await git(projectname).push("origin", "master");
        console.info("Done.");
    }
    catch(e) {
        console.info(e);
    }
}