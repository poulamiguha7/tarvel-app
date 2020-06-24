
/* Global Variables */
const apiURL = 'http://localhost:8081';
const userName = '&username=p_guha';
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const weatherBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const historical_baseurl = 'https://api.weatherbit.io/v2.0/history/daily?';
const weatherbit_API_KEY = '0373fa5879e9468ba1f5f1533f867e75';
const getimage_url = "https://pixabay.com/api/?key=17181884-9b247fd6e2afaf1b2bc54caed&page=1&image_type=photo&per_page=3&q=";

//Call EventListener
document.getElementById('generate').addEventListener('click',performAction);

//Write the EventListener handler function to update UI based on user input
function performAction(e){
    // Get User inputs
    const city = document.getElementById('city').value;
    if (city === undefined || city === null)
    {
      alert("Please enter a valid city name");
    }
    const user_date = document.querySelector('input[type="date"]').value;
    const user_date_formatted = Client.convertDate_to_String(user_date);
    // Get counter
    let daysLeft = Client.getDaysLeft(user_date_formatted);
    if (daysLeft <= 0 ) {
      alert("Please enter a Future date within one year.");
    }

    // Call Async functions
     Client.getCityLocation(geonamesURL,userName,city).then(async function(data)
     {
        const latitude = data.geonames[0]["lat"];
        const longitude = data.geonames[0]["lng"];
        const countryname = data.geonames[0]["countryName"];
        const countrycode = data.geonames[0]["countryCode"];
        
        let query_param = "";
        let final_current_url = "";
        let weather_response_type = "";
        // Determine API based on day's left 
        if (daysLeft <= 15) {
          query_param = '&lat='+latitude+'&lon='+longitude+'&days=15&units=I&key='+ weatherbit_API_KEY;
          final_current_url = weatherBaseURL + query_param;
          weather_response_type = 'current';
        }
        else {
            if (daysLeft < 365) {
                let startdate = Client.getLastYearDay(user_date_formatted);
                let enddate = Client.addOneday(startdate);
                // set URL for historical weather retrieval for prediction
                query_param =  '&lat='+latitude+'&lon='+longitude+'&start_date='+startdate+'&end_date='+enddate+'&units=I&key='+ weatherbit_API_KEY;
                final_current_url = historical_baseurl + query_param;
                weather_response_type = 'historical';
              }
                else 
                    { 
                      alert("Please Enter a Departure Date within this Year.");
                    }
        }
        // Get Pixabay URL for image
        let final_pixabay_url = getimage_url + city + "+travel";
        // Use the URL has default if no city picture found
        let country_pixabay_url = getimage_url + countryname +"+travel";

        const result = await postdata(apiURL+'/add', { 
                endpoint: final_current_url, 
                days: daysLeft, 
                image_url:final_pixabay_url, 
                country_pixabay_url: country_pixabay_url,
                city_name: city, 
                country_name: countryname,
                weather_response_type: weather_response_type,
                depart_date: user_date_formatted });
     }).then(Client.updateUI());

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


