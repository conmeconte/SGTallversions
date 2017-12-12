
const express = require('express'); //need to install npm
const credentials = require('./mysqlcredentials.js');
const mysql= require('mysql'); //need to install npm
const bodyParser= require('body-parser');


const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use( bodyParser.json() );

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get('/student', function(req, res){
    const db = mysql.createConnection(credentials);
    db.query("SELECT * FROM students", function(error, results, fields){
        const output = {
            success: false,
            data: [],
            errors: []
        };
        if(!error){
            output.success=true;
            output.data= results;
        } else{
            output.error= error;
        }

        const json_output= JSON.stringify(output);
        res.send(json_output);


    });
});

server.post('/student', function(req, res){
    res.send(JSON.stringify(req.body));
    console.log(req.body);
});

server.delete('/student', function(){
    console.log('good job you deleted')
});


server.listen(3000, function(){
    console.log('server is running, and bonesaw is ready')
});
