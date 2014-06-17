var express  = require('express'), 
    mongoose = require('mongoose'); 

// Declaring environment variables 
var mongoDBHost = process.env.OPENSHIFT_MONGODB_DB_HOST; 
var mongoDBPort = process.env.OPENSHIFT_MONGODB_DB_PORT;
var nodeJSPort  = process.env.OPENSHIFT_NODEJS_PORT || '8080'; 
var nodeJSIP    = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; 

// Setting options for connecting to MongoDB
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: '<Your Username>',
  pass: '<Your Password>'
}

// mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
var dbURI = 'mongodb://' + mongoDBHost + ':' + mongoDBPort + '/tsfv3?options'

// Connecting to the Database
mongoose.connect(dbURI, options);

// Declaring schema for Mongoose 
var Cat = mongoose.model('Cat', { name: String });

// Start Express Server... 
var app = express();

app.get('/', function(req, res){

  var kitty = new Cat({ name: 'Zildjian' });

  kitty.save(function (err) {

    if (err) {
    	res.send("error");
    } else {
    	res.send('meow');
    }

  });

});

app.listen(nodeJSPort, nodeJSIP);