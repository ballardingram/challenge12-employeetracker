// EXTERNAL PACKAGES > REQUIRED FOR FUNCTIONALITY
// DOCUMENTATION > EXPRESS (https://www.npmjs.com/package/express)
const express = require('express');
const router = express.Router();

// ROUTES > LINK TO OTHER APIROUTES
router.use(require('./departmentRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;