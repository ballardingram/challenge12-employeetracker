// EXTERNAL PACKAGES > INQUIRER AND UTIL INSTALLED, FS DOES NOT REQUIRE INSTALL
// DOCUMENTATION > INQUIRER (https://www.npmjs.com/package/inquirer)
// DOCUMENTATION > UTIL (https://www.npmjs.com/package/util)
// DOCUMENTATION > FS (https://nodejs.dev/learn/the-nodejs-fs-module)
const res = require('express/lib/response');
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
    .then((res) => {
        let choice = res.dashboard;
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
        console.table(result);
        mainMenu();
    });
}

// FUNCTION > VIEW EMPLOYEES
function viewEmployees() {
    db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
            throw err;
        }
        console.table(result);
        mainMenu();
    });
}

// FUNCTION > ADD DEPARTMENT
function addDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the new department name?"
        }
    ]).then((res) => {
        let query = `INSERT INTO department SET ?`;
        db.query(query, {name: res.department_name}, (err) => {
            if (err) throw err;
            mainMenu();
        });
    });
}

// FUNCTION > ADD ROLE > INSERT INTO FUNCTION ONLY
function addRole() {
    const query = `
    SELECT
    department.id,
    department.name,
    roles.salary
    FROM employee
    JOIN roles
    on employee.roles_id = roles.id
    JOIN department
    on department.id = roles.department_id
    GROUP BY department.id, department.name`

    db.query(query, (err, res) => {
        if(err) throw err;
        const department = res.map(({id, name}) => ({
            value: id,
            name: `${id} ${name}`
        }));
        console.table(res);
        addRoleprompts(department);
    });
}

// PROMPTS > ADD ROLE
function addRoleprompts(department) {
    inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What is the new role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the new role salary?"
        },
        {
            type: "list",
            name: "department",
            message: "Assign the role a department by selecting an option below:",
            choices: department
        },
    ]).then((res) => {
        let query = `INSERT INTO roles SET ?`;
        db.query(query, {
            title: res.title,
            salary: res.salary,
            department_id: res.department
        }, (err) => {
            if(err) throw err;
            mainMenu();
        });
    });
}

// FUNCTION > ADD EMPLOYEE > INSERT INTO FUNCTION ONLY
function addEmployee() {
    const query = `
    SELECT
    roles.id,
    roles.title,
    roles.salary
    FROM roles`

    db.query(query, (err, res) => {
        if(err) throw err;
        const roles = res.map(({id, title, salary}) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`
        }));
        console.table(res);
        addEmployeeprompts(roles);
    });
}

// PROMPTS > ADD EMPLOYEE
function addEmployeeprompts(roles) {
    inquirer
    .prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "roles_id",
            message: "What is the employee's role?",
            choices: roles
        },
    ]).then((res) => {
        let query = `INSERT INTO employee SET ?`
        db.query(query, {
            first_name: res.first_name,
            last_name: res.last_name,
            roles_id: res.roles_id
        }, (err) => {
            if(err) throw err;
            mainMenu();
        })
    })
}

// FUNCTION > UPDATE EMPLOYEE > UPDATE FUNCTION ONLY
function updateEmployeeRole() {
    const query = `
    SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    roles.title,
    roles.salary,
    department.name,
    CONCAT(manager.first_name, manager.last_name)
    AS manager
    FROM employee
    JOIN roles
    ON employee.roles_id = roles.id
    JOIN department
    ON department.id = roles.department_id
    JOIN employee manager
    ON manager.id = employee.manager_id`

    db.query(query,(err, res) => {
        if(err) throw err;
        const fte = res.map(({id, first_name, last_name}) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));
        console.table(res);
        updateFTErole(fte);
    });
}

function updateFTErole(fte) {
    const query = `
    SELECT
    roles.id,
    roles.title,
    roles.salary
    FROM roles`

    db.query(query, (err, res) => {
        if(err) throw err;
        const newRole = res.map(({id, title, salary}) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`
        }));
        console.table(res);
        updateFTEprompts(fte, newRole);
    });
}

// PROMPT > UPDATE EMPLOYEE
function updateFTEprompts(fte, newRole) {
    inquirer
    .prompt([
        {
            type: "list",
            name: "employee",
            message: "To update an employee role, select an employee ID:",
            choices: fte
        },
        {
            type: "list",
            name: "roles",
            message: "Select a new role for the employee from the list below:",
            choices: newRole
        },
    ]).then((res) => {
        const query = `UPDATE employee SET roles_id = ? WHERE id = ?`
        db.query(query,[
            res.employee,
            res.roles
        ], (err) => {
            if(err) throw err;
            mainMenu();
        });
    });
}

// FUNCTION > END PROGRAM
function quit() {
    console.log("Thank you for using the Employee Tracker. Goodbye.");
    process.exit();
}