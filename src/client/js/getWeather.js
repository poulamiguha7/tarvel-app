async function getWeather(latitude,longitude,countryname)
{

const weatherbit_API_KEY = '0373fa5879e9468ba1f5f1533f867e75';
//https://api.weatherbit.io/v2.0/current?&lat=38.123&lon=-78.543&key=0373fa5879e9468ba1f5f1533f867e75

const current_baseurl = 'https://api.weatherbit.io/v2.0/current?';
const query_param = '&lat='+latitude+'&lon='+longitude+'&key='+ weatherbit_API_KEY;
const final_current_url = current_baseurl+query_param;
console.log("getWeather URL was "+final_current_url);
const response = await fetch(final_current_url);
try{
         console.log("Calling getWeather with URL"+final_current_url); 
         const currentWeather = await response.json();
         return currentWeather;
    } 
    catch (error) {
      console.log("getWeather URL was "+final_current_url);
      console.log(error);
    }

}

export { getWeather }