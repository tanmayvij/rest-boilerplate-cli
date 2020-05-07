const fs = require("fs");

module.exports = (projectname) => {
    const separator = (process.platform === 'win32') ? '\\' : '/';
    var rootArr =  __dirname.split(separator);
    rootArr.pop();
    var root = '';
    rootArr.forEach(element => {
        root += element;
        root += separator;
    });
    const app = fs.readFileSync(root + '/templates/app.js', {encoding: "utf-8"});
    const router = fs.readFileSync(root + '/templates/system/index.js', {encoding: "utf-8"});
    const get = fs.readFileSync(root + '/templates/system/modules/get.js', {encoding:"utf-8"});
    const post = fs.readFileSync(root + '/templates/system/modules/post.js', {encoding: "utf-8"});

    fs.mkdirSync(projectname + "/system");
    fs.mkdirSync(projectname + "/system/modules");
    
    fs.writeFileSync(projectname + "/app.js", app);
    fs.writeFileSync(projectname + "/system/index.js", router);
    fs.writeFileSync(projectname + "/system/modules/get.js", get);
    fs.writeFileSync(projectname + "/system/modules/post.js", post);
    
}