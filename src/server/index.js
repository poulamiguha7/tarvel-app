// Setup empty JS object to act as endpoint for all routes
let projectData = {};

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

const moment = require('moment');
moment().format();
app.post("/add",getWeather);
async function getWeather(req, res) 
{
    const endpoint = req.body.endpoint;
    const dayleft = req.body.days;
    const image_url = req.body.image_url;
    const city_name = req.body.city_name;
    const country_name = req.body.country_name;
    const depart_date = req.body.depart_date;
    const weather_response_type = req.body.weather_response_type;
    const country_pixabay_url = req.body.country_pixabay_url;

    projectData["city"] = city_name;
    projectData["country"] = country_name;
    projectData["depart_date"] = depart_date;
    projectData["dayleft"] = dayleft;
    projectData["weather_response_type"] = weather_response_type;

    // Weather Response 
    const response = await fetch(endpoint);
    try{
         const allData = await response.json();
         if ( weather_response_type === 'current' ) 
          {
            projectData["high_temp"] = allData["data"][dayleft].high_temp;
            projectData["low_temp"] = allData["data"][dayleft].low_temp;
            projectData["weather_text"] = allData["data"][dayleft].weather.description + " throughout the day."; 
         }
         else  {
          // weather_response_type === 'historical'
          projectData["high_temp"] = allData["data"][0].max_temp;
          projectData["low_temp"] = allData["data"][0].min_temp;
          projectData["weather_text"] = " "; 
         }
    } 
    catch (error) {
      console.log("Failed calling weatherbit with URL"+endpoint);
      console.log(error);
    }
    // Image response
    let display_image_url = "";
    let image_response = await fetch(image_url);
    try{
         let image_data = await image_response.json();
         let total_count = image_data["total"];
         if (total_count > 0) {
          display_image_url = image_data["hits"][0].previewURL;
         }
         else {
                let country_image_response  = await fetch(country_pixabay_url);
                try {
                    let country_image_data = await country_image_response.json();
                    let total_count = country_image_data["total"];
                    if (total_count > 0) {
                        display_image_url = country_image_data["hits"][0].previewURL;
                      }
                    else {
                        // No Image found just display a default one!
                        display_image_url = 'https://cdn.pixabay.com/photo/2016/01/09/18/27/old-1130731_150.jpg';
                          }
                      }
                  catch(error) {
                        console.log("Failed calling Pixabay with URL"+country_pixabay_url);
                        console.log(error);
                }
         }
         // Set Pixabay URL to Projectdata
         projectData["image_url"] = display_image_url;
    } 
    catch (error) {
      console.log("Failed calling Pixabay with URL"+endpoint);
      console.log(error);
    }
    };

// Send response data to update UI
function sendProjData(req,res){
  console.log(projectData);
  res.send(projectData);
};
app.get('/getAPIdata', sendProjData);

app.get('/test', function(req, res) {
  res.json({
    status : 200
  })
})

module.exports = app;
