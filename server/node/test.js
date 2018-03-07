const express = require('express');

const server = express();
const port = process.env.PORT || '4000';


server.get('/test', function(req, res){
    res.send('<h1>working</h1>');
})

server.listen(port, function(){
    console.log('server is running on port', port);
})
