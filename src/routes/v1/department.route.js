const express = require('express');
const validate = require('../../middlewares/validate');
const departmentValidation = require('../../validations/department.validation');
const departmentController = require('../../controllers/department.controller');

const router = express.Router();

router.get('/getDepartments', departmentController.getAll);
router.post('/create', validate(departmentValidation.createDepartment), departmentController.create);
router.put('/update/:departmentId', departmentController.update);
router.get('/getDepartment/:departmentId', departmentController.getById);
router.get('/searchDepartment', departmentController.search);

module.exports = router;
