var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var User = require('./models/User.js')
var jwt = require('./services/jwt.js')
var app = express()

app.use(bodyParser.json())

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    
    next()
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth')

app.post('/register', function(req,res){
    var user = req.body

    var newUser = new User.model({
        name: user.name,
        password: user.password
    })

    var payload = {
        iss: req.hostname,
        sub: user._id
    };

    var token = jwt.encode(payload, "mySecret...");

    newUser.save(function(err){
        res.status(200).send({
                user: newUser.toJSON(), 
                token: token
            });
        })
    })

var server = app.listen(3000, function(){
    console.log('server listening on ', server.address())
})