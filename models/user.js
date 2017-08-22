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
     var findAvailableMentors = User.findAvailableMentors;
     return {users, findAvailableMentors};
   });
};

User.findAvailableMentors = function(usrId){
  return User.findAll({
    where: {
      mentorStatus: true,
      id: {
        $ne: usrId
      }
    }
  })
  .then((users) => {
    console.log(Array.isArray(users), users);
    return users;
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
  return User.findOne({
    where: {
      id: id
    },
    include: [{model: User, as: 'mentor'}, {model: Award, as: 'awards'}]
  })
  .then(function(user){
    if (user.mentorId){
      user.setMentor(null);
    } else {
      user.setMentor(body.mentorId);
    }
    return user.save();
  });
};

User.generateAward = function(userId){
  return Award.create({name: '', userId: userId})
    .then(function(){
      return User.findOne({
        where: {
          id: userId
        },
        include: [{model: Award, as: 'awards'}]
        })
        .then(function(user){
          if (user.awards.length >= 2){
            user.mentorStatus = true;
          }
          return user.save();
    });

  });
};

User.removeAward = function(userId, awardId){
  return Award.findOne({
    where: {
      id: awardId
    }
  })
  .then(function(award){
    return award.destroy();
  })
  .then(function(){
    return User.findOne({
        where: {
          id: userId
        },
        include: [{model: Award, as: 'awards'}]
    })
      .then(function(user){
        if (user.awards.length < 2){
          user.mentorStatus = false;
          User.update({
            mentorId: null
          }, {
            where: {
              mentorId: user.id
            }
          });
        }
        return user.save();
      });
    });
};

User.belongsTo(User, {as: 'mentor'});
Award.belongsTo(User);
User.hasMany(Award, {as: 'awards'});

module.exports = User;
