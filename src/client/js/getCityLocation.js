async function getCityLocation(geonamesURL,username,city)
{
     // http://api.geonames.org/searchJSON?q=naperville&maxRows=1&username=p_guha
    const response = await fetch(geonamesURL+city+username+'&maxRows=1');
    try{
        console.log("Calling geonames with URL"+geonamesURL+city+username+'&maxRows=1'); 
         const geonamesResponse = await response.json();
         console.log("geonamesResponse: "+ geonamesResponse);  
         return geonamesResponse;
    } 
    catch (error) {
      console.log(" getCityLocation URL was "+geonamesURL+city+username+'&maxRows=1');
      console.log(error);
    }
}

export { getCityLocation }