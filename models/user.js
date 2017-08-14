var db = require('./db');
var Sequelize = db.Sequelize;
var Award = require('./award');

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mentorStatus: {
    type: Sequelize.BOOLEAN
  }
});

User.findUsersViewModel = function(){
   return User.findAll({
     include: [{model: User, as: 'mentor'}, {model: Award, as: 'awards'}]
   })
   .then((users) => {
     return {users};
   });
};

User.destroyById = function(id){
  return User.destroy({
    where: {
      id: id
    }
  });
};

User.updateUserFromRequestBody = function(id, body){
  User.findOne({
    where: {
      id: id
    }
  })
  .then(function(user){
    for (var key in body){
      user[key] = body[key];
    }
    return user.save();
  });
};

User.generateAward = function(userId){
  return Promise.all([
    User.findOne({
      where: {
        id: userId
      }
    }),
    Award.create({name: '', userId: userId})
  ])
  // .then(function())
};

User.removeAward = function(userId, awardId){
  return Award.findOne({
    where: {
      id: awardId
    }
    // include: [{model: Award, as: 'awards'}]
  })
  .then(function(award){
    return award.destroy();
  })
  // .then(function(user){
  //   user.awards = user.awards.filter(function(val){
  //     console.log(val.id, awardId);
  //     return val.id.toString() !== awardId;
  //     });
  //      console.log(user.awards);
  //      console.log(awardId)
  //   return user.save({awards: user.awards});
    // console.log(user.awards)

    // })
};

User.belongsTo(User, {as: 'mentor'});
Award.belongsTo(User);
User.hasMany(Award, {as: 'awards'});
// User.belongsToMany(Award, {as: 'awards'});

module.exports = User;
