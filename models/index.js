var db = require('./db');
var seedFile = require('./seed');


const User = require('./user');

const sync = () => {
  return db.sync({ force: true });
};

const seed = () => {
  return seedFile(User);
};

module.exports = {
  User,
  sync,
  seed
};
