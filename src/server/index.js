// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const  express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// npm install cors --save
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Use fetch
const fetch = require("node-fetch");

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Travel app listening on port 8081!')
});

// Define a Route for GET request
// Following code will call getCallback "handler function"
// when the server recieves request in following route

function sendProjData(req,res){
    console.log(projectData);
    res.send(projectData);
}
app.get('/all', sendProjData);

app.post("/add",getWeather);
async function getWeather(req, res, next) 
{
    console.log("Getting real data from weatherbit");
    console.log(req.body);
    const endpoint = req.body.endpoint;
    const response = await fetch(endpoint);
    try{
         console.log(" Calling weatherbit with URL"+endpoint); 
         const allData = await response.json();
         console.log("geonamesResponse: "+ allData);  
         return allData;
    } 
    catch (error) {
      console.log("Failed calling weatherbit with URL"+endpoint);
      console.log(error);
    }
    };


