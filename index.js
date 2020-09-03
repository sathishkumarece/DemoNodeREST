//Importing required dependency modules - thirdparty
const express = require('express');
const bodyParser = require('body-parser'); 
const methodOverride = require('method-override');

//Importing required dependency modules - Application specific
const apiRouter = require('./routes/api-route');

//Creating instance of express
const app = express();

//Configuring express instance
// body parser added to parsing the incoming request bodies in a middleware before you handle it 
app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('/', (req, res) => {
    res.send('RESTful API listening!')
})

console.log(process.env);

//Routing to specific router
app.use('/api/employee', apiRouter);

//Configuring port
const port = process.env.PORT || 8181

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
