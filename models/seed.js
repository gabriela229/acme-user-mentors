function seed(User){
  return Promise.all([
    User.create({name: 'Big Bird'}),
    User.create({name: 'Cookie Monster'}),
    User.create({name: 'Oscar the Grouch'})
  ])
  .then(function([BB, CM, OtG]){
    return Promise.all([
      User.generateAward(BB.id),
      User.generateAward(BB.id),
      User.generateAward(CM.id),
      User.generateAward(OtG.id)
    ]);
  })
  .then(function(users){
    // console.log(users);
    console.log('done seeding');
  })
  .catch(err => console.log(err.message));
}

module.exports = seed;
