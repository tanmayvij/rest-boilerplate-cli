# REST API Boilerplate CLI
Command Line Interface to create boilerplate app for building a REST API using Node.js & Express.

## Usage:
`npm i -g rest-boilerplate-cli`

`rest init <projectname>`

## Options:
* `rest --version, -V` (Display the current version of the CLI)
* `rest --help, -h` (Display help for the command)

## Features:
* Upon running the command, it will walk you through the process of initializing a boilerplate application in the current directory with a package.json file, app.js, express router and empty GET and POST modules.
* A git repository is initialized in the project directory and express is installed via npm.
* You can also create a remote repository on GitHub within the CLI. During the first run you will be prompted for your GitHub username and password. A token is then generated and stored in `configstore` for future use. You are also provided with the option to stage all the default files, commit and push them to the newly created remote repository.