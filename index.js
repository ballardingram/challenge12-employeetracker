// EXTERNAL PACKAGES > INQUIRER AND UTIL INSTALLED, FS DOES NOT REQUIRE INSTALL
// DOCUMENTATION > INQUIRER (https://www.npmjs.com/package/inquirer)
// DOCUMENTATION > UTIL (https://www.npmjs.com/package/util)
// DOCUMENTATION > FS (https://nodejs.dev/learn/the-nodejs-fs-module)
const inquirer = require('inquirer');
const db = require('./db/connection');
require("console.table");

// PROMPTS > TRACKER QUESTIONS - MAIN MENU
// DOCUMENTATION > ASYNC AND AWAIT (https://www.npmjs.com/package/inquirer#methods)
// DOCUMENTATION > SWITCH CASE (https://www.w3schools.com/java/java_switch.asp)
(function () {
    mainMenu();
})();

function mainMenu() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "dashboard",
            mesage: "Select an option below:",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS",
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES",
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES",
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT",
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE",
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE",
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE",
                },
                {
                    name: "Quit",
                    value: "QUIT",
                },
            ],
        },
    ])
    .then((answer) => {
        let choice = answer.choice;
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    });
}

// FUNCTIONS > FUNCTION TO ACCESS DATABASE AND RETURN RESULTS
// FUNCTION > VIEW DEPARTMENTS
function viewDepartments() {
    db.query("SELECT * FROM DEPARTMENT", (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result);
        mainMenu();
    });
}

// FUNCTION > VIEW ROLES
function viewRoles() {
    db.query("SELECT * FROM roles", (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result['department_id', 'department_name']);
        mainMenu();
    });
}

// FUNCTION > VIEW EMPLOYEES
function viewEmployees() {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result);
        mainMenu();
    });
}

// FUNCTION > ADD DEPARTMENT
function addDepartment() {
    db.query("INSERT INTO DEPARTMENT, department_name VALUES (results)", (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result);
        mainMenu();
    });
}

// FUNCTION > INITIALIZE PROGRAM
//function init () {
//}

// FUNCTION > END PROGRAM
function quit() {
    console.log("Thank you for using the Employee Tracker. Goodbye.");
    process.exit();
}