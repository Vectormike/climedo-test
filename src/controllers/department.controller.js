const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { departmentService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const departments = await departmentService.getDepartments();
  res.status(httpStatus.OK).send(departments);
});

const create = catchAsync(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(httpStatus.CREATED).send(department);
});

const update = catchAsync(async (req, res) => {
  const department = await departmentService.updateDepartment(req.params.departmentId, req.body);
  res.status(httpStatus.OK).send(department);
});

const getById = catchAsync(async (req, res) => {
  const department = await departmentService.getDepartmentById(req.params.departmentId);
  res.status(httpStatus.OK).send(department);
});

const search = catchAsync(async (req, res) => {
  const department = await departmentService.searchDepartment(req.body);
  res.status(httpStatus.CREATED).send(department);
});

const deleteById = catchAsync(async (req, res) => {
  await departmentService.deleteDepartment(req.params.departmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  search,
  deleteById,
};
