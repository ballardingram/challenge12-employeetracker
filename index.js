// EXTERNAL PACKAGES > INQUIRER AND UTIL INSTALLED, FS DOES NOT REQUIRE INSTALL
// DOCUMENTATION > INQUIRER (https://www.npmjs.com/package/inquirer)
// DOCUMENTATION > UTIL (https://www.npmjs.com/package/util)
// DOCUMENTATION > FS (https://nodejs.dev/learn/the-nodejs-fs-module)
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// ROUTES > API ROUTES NEEDED
const departmentRoute = require("./routes/apiRoutes/departmentRoutes");
const employeeRoute = require ("./routes/apiRoutes/employeeRoutes");
const roleRoute = require ("./routes/apiRoutes/roleRoutes");
const routeIndex = require ("./routes/apiRoutes/index");

// PROMPTS > TRACKER QUESTIONS - MAIN MENU
// DOCUMENTATION > ASYNC AND AWAIT (https://www.npmjs.com/package/inquirer#methods)
// DOCUMENTATION > SWITCH CASE (https://www.w3schools.com/java/java_switch.asp)
const mainMenu = async () => {
    await inquirer
    .prompt ([
        {
            type: 'list',
            name: 'mainmenu',
            message: 'Choose an option to start:',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
        },
    ])
    .then((answer) => {
        switch (answer.action) {
            case 'View All Departments':
                departmentRoute.displayAll(mainMenu);
                break;
        }
    });
};

//FUNCTION > INITIALIZE PROGRAM
function init() {
    inquirer.prompt(mainMenu)
    console.log(data)
}

init();