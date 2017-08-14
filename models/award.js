var db = require('./db');
var faker = require('faker');

var Sequelize = db.Sequelize;
var Award = db.define('award', {
  name: {
    type: Sequelize.STRING,
    set: function(){
      var awardStr = faker.company.catchPhrase();
      this.setDataValue('name', awardStr);
    }
  }
});

// Award.generate = function(){
//   console.log(faker.company.catchPhrase(), 'catchphrase');
// };

module.exports = Award;
