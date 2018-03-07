
const express = require('express');
const mysql = require('mysql');
const credentials = require('./mysqlcredentials.js');
const bodyParser = require('body-parser');
const path = require('path');


const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use( bodyParser.json() );
server.use(express.static(path.join(__dirname, 'client', 'dist')));

server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
    next();
});


server.get('/students', function(req, res){
    const db = mysql.createConnection(credentials);
    db.query("SELECT id, name, grade, course FROM students", function(error, results, fields){
        const output = {
            success: false,
            data: [],
            errors: []
        };

        if(!error){
            output.success = true;
            output.data = results;
        }else{
            output.error = error;
        }

        const json_output = JSON.stringify(output);
        res.send(json_output);
    })
})


server.post('/addStudent', function(req, res){
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

server.post('/deleteStudent', function(req, res){
    const db = mysql.createConnection(credentials);
    console.log('req.body yo::',req.body);
    db.query(`DELETE FROM students WHERE id = ${req.body.id}`, function(error, results, fields){
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

server.post('/editStudent', function(req,res){
    const db = mysql.createConnection(credentials);
    db.query(`UPDATE students SET name = '${req.body.name}', course = '${req.body.course}', grade = ${req.body.grade} WHERE id = ${req.body.id}`, function(error, results, fields){
        const output = {
            success: false,
            data: [],
            errors: []
        };
        if(!error){
            output.success = true;
            output.data = results;
        }else{
            output.error = error;
        }

        const json_output = JSON.stringify(output);
        res.send(json_output);


    })
})











server.listen(5500, 'localhost', function(){
    console.log('server is running at port 5500');
});
