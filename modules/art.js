const chalk = require("chalk");
const figlet = require("figlet");

module.exports = () => {
    const art = chalk.blue(figlet.textSync("REST Boilerplate"));
    console.info(art);
}