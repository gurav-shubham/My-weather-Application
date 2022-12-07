'use strict';


const submitBtnElm = document.querySelector('#submitBtn');
const userInputElm = document.querySelector('#inputBox');

// all item under this line
const cityNameElm = document.querySelector('#nameOfCity');
const countryCodeElm = document.querySelector('#NameOfDay');
const currentTempElm = document.querySelector('#resiveCelcious');
const weatherIconElm = document.querySelector('#imageIcon');
const getDescriptionElm = document.querySelector('#description');


// weather icon start here
const cloudsWetherIconElm = document.querySelector('#cloudsWetherIcon');
const clearWetherIconElm = document.querySelector('#clearWeather');

cloudsWetherIconElm.style.display = 'none'
clearWetherIconElm.style.display = 'none'


submitBtnElm.addEventListener('click',(evt) => 
{
	evt.preventDefault();
	fetch('https://api.openweathermap.org/data/2.5/weather?q='+userInputElm.value+'&appid=bb459a9b116eee77f3b727de61f3a4b5')
	.then(response => response.json())
	.then(data => 
	{
		let cityName = data.name;
		let countryCode = data.sys.country;
		let temputeres = data.main.temp;
		let currentTemp = temputeres - 273.15;
		let mainWeather = data.weather[0].main;
		let getDescription = data.weather[0].description;

		setWeatherIcon(mainWeather)
		// showing item to ui 
		showingItemToUI(cityName,countryCode,currentTemp,getDescription)
	})
});

function setWeatherIcon(mainWeather)
{
	if(mainWeather === 'Clouds')
		{
			weatherIconElm.style.display = 'none';
			clearWetherIconElm.style.display = 'none';
			cloudsWetherIconElm.style.display = ''
		}else if(mainWeather === 'Haze')
		{
			cloudsWetherIconElm.style.display = 'none';
			clearWetherIconElm.style.display = 'none';
			weatherIconElm.style.display = '';
			
		}else if(mainWeather === "Clear")
		{
			weatherIconElm.style.display = 'none';
			cloudsWetherIconElm.style.display = 'none'
			clearWetherIconElm.style.display = '';
		}
}
// showing item to ui 
function showingItemToUI(name,country,temputers,descripttion)
{
	cityNameElm.textContent = name;
	countryCodeElm.textContent = country;
	currentTempElm.textContent = temputers.toFixed(2);
	getDescriptionElm.textContent = descripttion;
}
