const express = require('express');
const app = express(); // represents a running express app. Most projects will use only one.

app.get('/', (req, res) => { // this is the route
    res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express telling node to listen to http requests on port 5000
