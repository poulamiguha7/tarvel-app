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

app.post("/add",getWeather);

async function getWeather(req, res) 
{
    console.log("Getting real data from weatherbit");
    console.log(req.body);
    const endpoint = req.body.endpoint;
    const dayleft = req.body.days;
    const image_url = req.body.image_url;
    const city_name = req.body.city_name;
    const country_name = req.body.country_name;
    const depart_date = req.body.depart_date;

    projectData["city"] = city_name;
    projectData["country"] = country_name;
    projectData["depart_date"] = depart_date;
    projectData["dayleft"] = dayleft;

    // Weather Response 
    const response = await fetch(endpoint);
    try{
         console.log(" Calling weatherbit with URL"+endpoint); 
         const allData = await response.json();
          
         projectData["high_temp"] = allData["data"][dayleft].high_temp;
         projectData["low_temp"] = allData["data"][dayleft].low_temp;
         projectData["weather_text"] = allData["data"][dayleft].weather.description; 
    } 
    catch (error) {
      console.log("Failed calling weatherbit with URL"+endpoint);
      console.log(error);
    }

    // Image response
    console.log("image request url : "+ image_url); 
    console.log("city_name: "+ city_name); 
    console.log("country_name: "+ country_name); 
    console.log("depart_date: "+ depart_date); 
    console.log("dayleft: "+ dayleft); 
    let image_response = await fetch(image_url);
    let display_image_url = "";
    try{
         console.log(" Calling Pixabay with URL"+image_url); 
         let image_data = await image_response.json();
         let total_count = image_data["total"];
         if (total_count > 0) {
          display_image_url = image_data["hits"][0].previewURL;
         }
         else {
          display_image_url = 'https://cdn.pixabay.com/photo/2016/01/09/18/27/old-1130731_150.jpg';
         }
         projectData["image_url"] = display_image_url;

         console.log(projectData);
    } 
    catch (error) {
      console.log("Failed calling Pixabay with URL"+endpoint);
      console.log(error);
    }
    };
