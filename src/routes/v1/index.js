const express = require('express');
const departmentRoute = require('./department.route');

const router = express.Router();

router.use('/department', departmentRoute);

module.exports = router;
