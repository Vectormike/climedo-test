const httpStatus = require('http-status');
const { Department } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get departments
 * @returns {Promise<Departments>}
 */
const getDepartments = async () => {
  const departments = await Department.find();
  if (!departments) {
    throw new ApiError(httpStatus.NOT_FOUND, `Records not found`);
  }
  return departments;
};

/**
 * Create a department
 * @body {Object} departmentBody
 * @returns {Promise<Department>}
 */
const createDepartment = async (departmentBody) => {
  const department = await Department.create(departmentBody);
  if (!department) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department was not created');
  }
  return department;
};

/**
 * Update a department
 * @param {Object} departmentBody
 * @param {ObjectId} departmentId
 * @returns {Promise<Department>}
 */
const updateDepartment = async (departmentId, departmentBody) => {
  const department = await Department.findById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  Object.assign(department, departmentBody);
  await department.save();
  return department;
};

/**
 * Get department by id
 * @param {ObjectId} id
 * @returns {Promise<Department>}
 */
const getDepartmentById = async (id) => {
  return Department.findById(id);
};

/**
 * Search for a department by name
 * @param {ObjectId} id
 * @returns {Promise<Department>}
 */
const searchDepartment = async (departmentBody) => {
  const department = await Department.findOne(departmentBody);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  return department;
};

/**
 * Delete a department
 * @param {ObjectId} id
 * @returns {Promise<Department>}
 */
const deleteDepartment = async (id) => {
  await Department.findOneAndRemove(id, { useFindAndModify: false });
  return error;
};

module.exports = {
  createDepartment,
  updateDepartment,
  getDepartmentById,
  getDepartments,
  searchDepartment,
  deleteDepartment,
};
