// EXTERNAL PACKAGES > REQUIRED FOR FUNCTIONALITY
// DOCUMENTATION > MYSQL2 (https://www.npmjs.com/package/mysql2)
const mysql = require ('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    // USERNAME > MYSQL USER NAME
    user: 'root',
    // PASSWORD > MYSQL PASSWORD - CHANGE LATER
    password: 'B#nTuck#r1989',
    database: 'employeetracker'
},
    console.log('Connected to employeetracker database!')
);

module.exports = db;