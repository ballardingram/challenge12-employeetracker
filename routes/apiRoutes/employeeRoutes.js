// EXTERNAL PACKAGES > RQUIRED FOR FUNCTIONALITY
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// ROUTES > GET - ALL EMPLOYEES by LAST NAME
router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, department.name
                AS department_name
                FROM employees`
})

// ROUTES > GET - SINGLE EMPLOYEE
router.get('/employees/:id' , (req, res) => {
    const sql = `SELECT * FROM employees WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(400).json ({ error: err.message });
            return;
        }
        res.json ({
            mesasge: 'Your request to GET a SINGLE Employee is successful.',
            data: row
        });
    });
});

// ROUTES > POST - CREATE EMPLOYEE
router.post('/employees', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if (errors) {
        res.statuis(400).json({ error: errors});
        return;
    }
    const sql = `INSERT INTO employee (first_name, last_name, email, role_id, manager_id) VALUES (?,?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.email, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
        res.status(400).json({ error: err.message});
        return;
        }
        res.json({
            message: 'Your request to CREATE a SINGLE Employee is successful.',
            data: body
        });
    });
});

// ROUTES > PUT - UPDATE EMPLOYEE EMAIL
router.put('/employees/:id', (req, res) => {
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }

    const sql = `UPDATE employees SET role = ? WHERE id = ?`;
    const params =  [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Your request to UPDATE a SINGLE EMPLOYEE role was unsuccessful. Tip: Employee may not exist by ID.',
            });
        } else {
            res.json({
                message: 'Your request to UPDATE a SINGLE EMPLOYEE role was successful.',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// ROUTES > DELETE - SINGLE EMPLOYEE
router.delete('/employees/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Your request to DELETE a SINGLE EMPLOYEE was unsuccessful. Tip: Employee may already be deleted or not exist by ID.',
            });
        } else {
            res.json({
                mesage: 'Your request to DELETE a SINGLE EMPLOYEE was successful.',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;