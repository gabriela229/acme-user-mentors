const expect = require('chai').expect;
const {User} = require('../../models');

describe('findUserViewModel', () => {
  it('exists', () => {
    expect(User.findUserViewModel()).to.be.ok;
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
