const Configstore = require("configstore");

const { prompt } = require("inquirer");
const { Octokit } = require("@octokit/rest");
const { createBasicAuth } = require("@octokit/auth");

const config = new Configstore("rest-boilerplate-cli");

module.exports = async (projectname) => {
    
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
            const obj = await octokit.repos.createForAuthenticatedUser({name: remoteRepoName});
            return obj.data.html_url;
        }
        catch(e) {
            console.info(e);
        }
    }
    else {
        return null;
    }
}