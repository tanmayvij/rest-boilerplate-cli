const git = require("simple-git/promise");

const { prompt } = require("inquirer");

module.exports = async (projectname, url) => {
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