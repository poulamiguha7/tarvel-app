
/* Global Variables */

// Define App variables

const apiURL = 'http://localhost:8081';

// Call EventListener
document.getElementById('generate').addEventListener('click',performAction);

// Call the EventListener handler function to update UI based on user input
// This is the main function
function performAction(e){
    console.log("Calling performAction");
    const city = document.getElementById('city').value;
    const user_date = document.querySelector('input[type="date"]');
    console.log("City is "+ city +" Start Date is: "+ user_date.value);
    let daysLeft = Client.getDaysLeft(user_date.value);

    if (daysLeft <= 0 ) {
      alert("Please enter a future date.");
    }
    console.log("Your trip will start in "+ daysLeft +' days!')

    const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
    const userName = '&username=p_guha';

    if (city === undefined || city === null){
        alert("Please enter a valid city name");
    }

    // Call Async functions in chain
     Client.getCityLocation(geonamesURL,userName,city).then(async function(data)
     {
        console.log("The city "+data.geonames[0]["name"]+' has long:'+ data.geonames[0]["lng"]+
        ' and lat: '+data.geonames[0]["lat"]);
        let latitude = data.geonames[0]["lat"];
        let longitude = data.geonames[0]["lng"];
        let countryname = data.geonames[0]["countryName"];
        let countrycode = data.geonames[0]["countryCode"];
        const weatherbit_API_KEY = '0373fa5879e9468ba1f5f1533f867e75';
        const current_baseurl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
        const query_param = '&lat='+latitude+'&lon='+longitude+'&days=15&units=I&key='+ weatherbit_API_KEY;
        let final_current_url = "";
        if (daysLeft <= 15 ) {
          final_current_url = current_baseurl+query_param;
        }
        else {
          alert("Please call a different API.")
        }
        // Get Pixabay URL for image
        let getimage_url = "https://pixabay.com/api/?key=17181884-9b247fd6e2afaf1b2bc54caed&page=1&image_type=photo&per_page=3&q=";
        
        let final_pixabay_url = getimage_url + city + "+travel";

        console.log("getWeather URL was "+final_current_url);
        const result = await postdata('http://localhost:8081/add', { endpoint: final_current_url, days: daysLeft, image_url:final_pixabay_url , city_name: city, country_name: countryname,depart_date: user_date.value });
     }).then(function(data) {
       console.log("Calling after postdata:");
       console.log("data");
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
       const newData = await response.json();
       console.log("Inside postdata: ");
       return newData;
      }catch(error) {
        console.log("Inside postdata error: Data: ", data);
     }
};

};


