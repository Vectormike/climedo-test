const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../src/app');
const Department = require('../../src/models/department.model');
const { apiKey } = require('../../src/validations/custom.validation');

/**
 * root level hooks
 */

async function format(department) {
  // get department from database
  const dbDepartment = (await Department.findOne({ email: department.email })).transform();
}

describe('Departments API', async () => {
  let dbDepartment;

  const key = '123456';

  beforeEach(async () => {
    dbDepartment = {
      firstDepartment: {
        email: 'branstark@gmail.com',
        apiKey: key,
        name: 'Ali John',
        contactName: 'Victor Jonah',
        contactEmail: 'victorjonah199@gmail.com',
      },
    };

    await Department.deleteMany({});
    await Department.insertMany([dbDepartment.branStark]);
  });

  describe('POST /v1/department/create', () => {
    it('should create a new department when request is ok', () => {
      return request(app)
        .post('/v1/department/create')
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body).to.include(apiKey);
        });
    });

    it('should get all departments', () => {
      return request(app)
        .get('/v1/department/getDepartments')
        .query({ page: 2, perPage: 1 })
        .expect(httpStatus.OK)
        .then(async (res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          expect(res.body[0].name).to.be.equal('Ali John');
        });
    });
  });

  describe('PATCH /v1/department/:departmentId', () => {
    it('should update department', async () => {
      const id = (await Department.findOne(dbDepartment.branStark))._id;
      const { name } = department;

      return request(app)
        .patch(`/v1/department/${id}`)
        .send({ name })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.be.equal(name);
          expect(res.body.email).to.be.equal(dbUsers.branStark.email);
        });
    });
  });
});
