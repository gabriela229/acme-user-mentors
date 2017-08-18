const expect = require('chai').expect;
const models = require('../models');
const User = models.User;
const db = require('../models/db');

describe('models', () => {
  before(function () {
    return db.sync({force: true});
  });

  afterEach(function(){
    return db.sync({force: true});
  });


  describe('findUserViewModel', () => {
    it('exists', () => {
      expect(User.findUsersViewModel()).to.be.ok;
    });
  });

  describe('create', () => {
    it('exists', () => {
      expect(User.create()).to.be.ok;
    });
  });

  describe('destroyById', () => {
    it('exists', () => {
      expect(User.destroyById()).to.be.ok;
    });
  });

  describe('updateUserFromRequestBody', () => {
    it('exists', () => {
      expect(User.updateUserFromRequestBody()).to.be.ok;
    });
  });

  describe('generateAward', () => {
    it('exists', () => {
      expect(User.generateAward()).to.be.ok;
    });
  });

  describe('removeAward', () => {
    it('exists', () => {
      expect(User.removeAward()).to.be.ok;
    });
  });
})
