// EXTERNAL PACKAGES > REQUIRED FOR FUNCTIONALITY
// INSTALLED > NODE (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
// INSTALLED > MYSQL2 (https://www.npmjs.com/package/mysql2)
// INSTALLED > INQUIRER (https://www.npmjs.com/package/inquirer)
// INSTALLED > CONSOLE.TABLE (https://www.npmjs.com/package/console.table)
const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

// PORT > STANDARD SYNTAX FOR PORT
const PORT = process.env.PORT || 3001;
const app = express();
app.use('/api', apiRoutes);

// MIDDLEWARE > EXPRESS
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// ERROR ROUTES > DEFAULT REQUEST NOT FOUND - ANY OTHER
app.use((req, res) => {
    res.status(404).end();
});

// PORT > START SERVER ANTE DB CONNECTION
db.connect(err => {
    if (err) throw err;
    console.log('Databse connected.');
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}!`);
    });
});