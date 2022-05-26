// EXTERNAL PACKAGES > REQUIRED FOR FUNCTIONALITY
// EXTERNAL PACKAGES > INQUIRER AND UTIL INSTALLED, FS DOES NOT REQUIRE INSTALL
// DOCUMENTATION > MYSQL2 (https://www.npmjs.com/package/mysql2)
// DOCUMENTATION > INQUIRER (https://www.npmjs.com/package/inquirer)
// DOCUMENTATION > FS (https://nodejs.dev/learn/the-nodejs-fs-module)
const mysql = require ("mysql2");
const inquirer = require("inquirer");
require("console.table");

// CONNECTION > DATABASE
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeetracker'
},
    console.log('Welcome to the Employee Tracker Database!')
)

// FUNCTION > START DATABASE
db.connect(function (err) {
    if (err) throw err;
    mainMenu();
});

// PROMPTS > TRACKER QUESTIONS - MAIN MENU
function mainMenu() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "dashboard",
            message: "Select an option below:",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit',
            ]
        }
    ]).then((res) => {
        console.log(res.dashboard);
        switch(res.dashboard) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Quit':
                db.end();
                break;
        }
    }).catch((err) => {
        if (err) throw err;
    });
}

function viewAllDepartments(){
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result);
        mainMenu();
    })
}