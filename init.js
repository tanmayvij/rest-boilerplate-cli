const fs = require("fs");

const art = require("./modules/art");
const createRemoteRepo = require("./modules/createRemoteRepo");
const gitPush = require("./modules/gitPush");
const getPackageJson = require("./modules/getPackageJson");
const createFiles = require("./modules/createFiles");

module.exports = async (projectname) => {
    
    art();
    
    console.info("Creating new REST App in " + projectname);
    if(!fs.existsSync(projectname)) {
        fs.mkdirSync(projectname);
    }

    const initParams = await getPackageJson(projectname);
    createFiles(projectname, initParams);
    
    const remoteRepoUrl = await createRemoteRepo(projectname);
    if(remoteRepoUrl) {
        await gitPush(projectname, remoteRepoUrl);
    }
    
};