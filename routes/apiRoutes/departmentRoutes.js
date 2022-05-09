// EXTERNAL PACKAGES > RQUIRED FOR FUNCTIONALITY
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// ROUTES > GET - ALL DEPARTMENTS
// NOTE > DIRECTLY REFERENCING MODULE 12 'UDEVELOPIT' SYNTAX
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;
    db.query (sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Your GET request for ALL Departments was successful.',
            data: rows
        });
    });
});

// ROUTES > GET - SINGLE DEPARTMENT
// NOTE > SAME SYNTAX RATIONAL AS ABOVE
router.get('/departments/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, (err,rows) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'Your GET request for a SINGLE Department was successful.',
            data: row
        });
    });
});

// ROUTES > DELETE - SINGLE DEPARTMENT
// NOTE > SAME SYNTAX RATIONAL AS ABOVE
router.delete('/departments/:id', (req, res) => {
    const sql =  `DELETE FROM departments WHERE id =?`;
    const params = [req.params.id];
    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Your DELETE request for a SINGLE Department was successful.',
            data: row
        });
    });
});

module.exports = router;