// EXTERNAL PACKAGES > REQUIRED FOR FUNCTIONALITY
// DOCUMENTATION > MYSQL2 (https://www.npmjs.com/package/mysql2)
const mysql = require ('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    // USERNAME > MYSQL USER NAME
    user: 'root',
    // PASSWORD > MYSQL PASSWORD - CHANGE LATER
    // DOCUMENTATION > HOW TO CHANGE MYSQL PASSWORD (https://www.cyberciti.biz/faq/mysql-change-user-password/)
    password: 'password',
    database: 'employeetracker'
},
    console.log('Connected to employeetracker database!')
);

module.exports = db;