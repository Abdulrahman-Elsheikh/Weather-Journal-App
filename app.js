/* Global Variables */
const apiKey = "59b0ba63dc4b66d1f7325805d8b94776";
const generateBtn = document.querySelector("#generate");
const feelings = document.querySelector("#feelings");
const zipCode = document.querySelector("#zip");

// Create a new date instance dynamically with JS
let d = new Date();
let m = d.getMonth()+1;
let newDate =  d.getDate()+' - '+ m +' - '+ d.getFullYear();

// Add event listener to the button
generateBtn.addEventListener('click', startProcess);

// Check that user input zip code and feeling
function startProcess(){

  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;

  if(!zipCode){
    return alert("Please enter the zip code!")
  }
  if(!feelings){
    return alert("Please enter what you feel!")
  }

// Chain the functions to update UI
  getData(zipCode, feelings,)
  .then(function(data){
    console.log(data);
    postData('/postData', {city: cityName, temp: temp, date: newDate, feelings: feelings});
  })
  .then(() =>
  updateUI()
  )
}

// Get Data from API
async function getData(zipCode, feelings){
  try {
    // Fetching the weather data from the api
    const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const response = await fetch(fullURL);

    if(response.status === 404 || response.status === 400){
      return alert("Please enter a valid zip code!");
    }

    // Transform data to json
    const weatherData = await response.json();
    temp = weatherData.main.temp;
    cityName = weatherData.name;
    console.log(temp);
    console.log(cityName);
    return temp, cityName;
  } catch(error) {
      console.log("error", error);
    }
}

// Async POST data to the server
const postData = async ( url = '', data = {})=>{
  console.log(data);
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header
});

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};

// Async Update UI after getting data from the server
const updateUI = async() => {
  const response = await fetch('/all');

  try {
    const allData = await response.json();
    console.log(allData);

    // update UI elements with new data
    const viewerCity = document.getElementById('city');
    const viewerDate = document.getElementById('date');
    const viewerTemp = document.getElementById('temp');
    const viewerFeeling = document.getElementById('content');
    viewerCity.innerHTML = allData.city;
    viewerDate.innerHTML = allData.date;
    viewerTemp.innerHTML = allData.temp;
    viewerFeeling.innerHTML = allData.userResponse;
  }
  catch(error) {
    console.log("error", error);
  }
}