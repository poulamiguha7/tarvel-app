async function updateUI() 
{
    const request = await fetch('http://localhost:8081/getAPIdata');
    try {

    const projectData = await request.json();
    console.log("projectData "+ projectData);
    let city = projectData.city;
    let depart_date = projectData.depart_date;
    let country = projectData.country;
    let dayleft = projectData.dayleft;
    let high_temp = projectData.high_temp;
    let low_temp = projectData.low_temp;
    let weather_text = projectData.weather_text;
    let image_url = projectData.image_url;
/*
    console.log(city);
    console.log(country);
    console.log(depart_date);
    console.log(dayleft);
    console.log(high_temp);
    console.log(low_temp);
    console.log(weather_text);
    console.log(image_url);*/

    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';
    let resultHTML = `
        <div class="destination">
            <div class="left-side">
                <img class="city-image" src=${image_url}>
            </div>
            <div class="right-side">
                <h3 id="dest-title">Your Destination: 
                    <span id="mark"> ${city},${country} </span>
                </h3>
                <h3>
                    Departing:<span id="mark"> ${depart_date}</span>
                </h3>
                <div>Your trip is<span id="mark"> ${dayleft}</span> days away.</div>
                <div class="weather-panel">
                    <h4>This is the weather you may expect on this date.</h4>
                    <p>High- <span id="mark">${high_temp}</span>, Low - <span id="mark">${low_temp}</span></p>
                    <p>${weather_text}</p>
                </div>
            </div>
        </div>`;
    resultContainer.innerHTML = resultHTML;
      } catch(error){
          console.log("error", error);
      };
}

export { updateUI }