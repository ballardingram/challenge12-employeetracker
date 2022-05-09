// EXTERNAL PACKAGES > RQUIRED FOR FUNCTIONALITY
const express = require('express');
const { restoreDefaultPrompts } = require('inquirer');
const router = express.Router();
const db = require('../../db/connection');

// ROUTES > GET - ALL ROLES
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Your GET request for ALL Roles was successful.',
            data: rows
        });
    });
});

// ROUTES > GET - SINGLE ROLE
router.get('/roles/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, (err,rows) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'Your GET request for a SINGLE Role was successful.',
            data: row
        });
    });
});


// ROUTES > DELETE - SINGLE ROLE
router.get('/roles/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json ({
                message: 'Your request to DELETE a SINGLE Role was unsuccessful. Role Not Found.'
            });
        } else {
            res.json({
                message: 'Your request to DELETE a SINGLE Role was successful.',
                changes: result.affectedRows,
                id:  req.params.id
            });
        }
    });
});

module.exports = router;