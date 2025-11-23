const url =
	'https://api.openweathermap.org/data/2.5/weather';
const apiKey =
	'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready
(
    function () 
    {
	    weatherFn('Athlone');
    }
);

async function weatherFn(cName) 
{
	const temp =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;
	try 
    {
		const res = await fetch(temp);
		const data = await res.json();
		
		weatherShowFn(data);
	} catch (error) 
    {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data) 
{
	$('#city-name').text(data.name);

	$('#date').text(moment().
		format('YYYY'));
    
    $('#temperature').
		html(`${Math.round(data.main.temp)}°C`);
    
    const desc = data.weather[0].description || '';

    const formattedDesc = desc
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    
    $('#description').text(formattedDesc);

	$('#wind-speed').
		html(`Wind Speed: ${data.wind.speed} m/s`);

    $('#weather-icon').
        attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
}
