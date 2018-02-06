
const express = require('express'); //need to install npm
const credentials = require('./mysqlcredentials.js');
const mysql= require('mysql'); //need to install npm
const bodyParser= require('body-parser');


const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use( bodyParser.json() );

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
    next();
});
//"next" is middleware?



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
    const db = mysql.createConnection(credentials);
    console.log(req.body);
    // console.log(JSON.stringify(req.body));
    // res.send(JSON.stringify(req.body));
    db.query(`INSERT INTO students (name, course, grade) VALUES ('${req.body.name}', '${req.body.course}', ${req.body.grade})`, function(error, results, fields){
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

server.delete('/student', function(req, res){
    const db = mysql.createConnection(credentials);
    console.log(req.body);
    db.query(`DELETE FROM students WHERE id = ${req.body.student_id}`, function(error, results, fields){
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


server.listen(3000, function(){
    console.log('server is running, and bonesaw is ready')
});
