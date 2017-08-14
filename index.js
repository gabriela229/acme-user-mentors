var models = require('./models');
var User = models.User;
var app = require('./app');

models.sync()
  .then(function(){
    return models.seed();
  })
  .then(() => {
    var port = process.env.PORT || 3000;

    app.listen(port, function(){
      console.log(`listening on port ${port}`);
    });
  });
