// EXTERNAL PACKAGES > INQUIRER AND UTIL INSTALLED, FS DOES NOT REQUIRE INSTALL
// DOCUMENTATION > INQUIRER (https://www.npmjs.com/package/inquirer)
// DOCUMENTATION > UTIL (https://www.npmjs.com/package/util)
// DOCUMENTATION > FS (https://nodejs.dev/learn/the-nodejs-fs-module)
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');



// PROMPTS > TRACKER QUESTIONS - MAIN MENU
// DOCUMENTATION > ASYNC AND AWAIT (https://www.npmjs.com/package/inquirer#methods)
const groupQuestions = async () => {
    const answers = await inquirer
    .prompt ([
        {
            type: 'list',
            name: 'menu',
            message: 'Choose an option to start:',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee']
        }
    ]);
};

//FUNCTION > INITIALIZE PROGRAM
function init() {
    inquirer.prompt(groupQuestions)
    console.log(data)
}

init();