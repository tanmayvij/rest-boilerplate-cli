const { ncp } = require('ncp');
const path = require('path');

module.exports = (projectname) => {
  const source = path.join(__dirname, '../templates/');

  ncp.limit = 16;

  ncp(source, projectname, function (err) {
    if (err) {
      return console.error(err);
    }
  });
}