
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Define App variables

const apiURL = 'http://localhost:8081';

// Call EventListener
document.getElementById('generate').addEventListener('click',performAction);

// Call the EventListener handler function to update UI based on user input
// This is the main function
function performAction(e){
    console.log("Calling performAction");
    const city = document.getElementById('zip').value;
    const user_date = document.getElementById('feelings').value;
    console.log("City is "+ city +" Date is: "+ user_date);

    const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
    const userName = '&username=p_guha';

    if (city === undefined || city === null){
        alert("Please enter a valid city name");
    }
    if (user_date === undefined || user_date === null){
      alert("Please enter a valid date");
     }

    // Call Async functions in chain
     Client.getCityLocation(geonamesURL,userName,city).then(function(data)
     {
        console.log("The city "+data.geonames[0]["name"]+' has long:'+ data.geonames[0]["lng"]+
        ' and lat: '+data.geonames[0]["lat"]);
        let latitude = data.geonames[0]["lat"];
        let longitude = data.geonames[0]["lng"];
        const weatherbit_API_KEY = '0373fa5879e9468ba1f5f1533f867e75';
        const current_baseurl = 'https://api.weatherbit.io/v2.0/current?';
        const query_param = '&lat='+latitude+'&lon='+longitude+'&key='+ weatherbit_API_KEY;
        const final_current_url = current_baseurl+query_param;
        console.log("getWeather URL was "+final_current_url);
        postdata('http://localhost:8081/add', { endpoint: final_current_url });
     } ).then (function(data) {
       console.log("Calling after postdata:");
       console.log("Data is "+data);
       console.log("JSON is "+JSON.stringify(data));
     });

const postdata = async (url, data = {} )=>{
      console.log("Now calling the postdata request inside postdata:");
      console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
              'Content-Type': 'application/json',
             },       
    body: JSON.stringify(data), 
  });
  try {
       console.log(response.text);
       const newData = await response.json();
       console.log(newData );
       return newData;
      }catch(error) {
        console.log("Inside error: Data: ", data);
     }
};

  /*  getWeatherByZip(baseurl,apikey,newZip).then( function(data) {
        //console.log(data);
        console.log("Calling postdata");
        postdata('/add', {temperature: data.main["temp"], date: newDate, userResponse: myfeeling})
        .then(updateUI())
    });*/
};

/*
http://api.geonames.org/searchJSON?q=naperville&username=p_guha&maxRows=1
const getData = async (url, city, userName) => {
    const response = await fetch(url + city + userName + '&maxRows=1');
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

// Async GET

const getWeatherByZip = async (baseurl,apikey,zip) => {
    const response = await fetch(baseurl+zip+',us&units=imperial&appid='+apikey);
    try{
     console.log("Called getWeatherByZip, Zipcode is "+zip); 
     const allData = await response.json();
     console.log("Temperature extracted from app: "+ allData.main["temp"]);  
     return allData;
    } 
    catch (error) {
      console.log(error);
    }
  };

// Async POST : User posts the response from weather app 
const postdata = async ( url = '/add', data = {})=>{
      console.log("Now calling the postdata request");
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };

  */


/*
const updateUI = async () => {
    const request = await fetch('/all');
    console.log("Call updateUI");
    try{
      const allData = await request.json();
      console.log("Call updateUI");
      document.getElementById('temp').innerHTML = allData.temperature; 
      document.getElementById('date').innerHTML = allData.date; 
      document.getElementById('content').innerHTML = allData.userResponse;   
    }catch(error){
      console.log("error", error);
    }
  };
  */

