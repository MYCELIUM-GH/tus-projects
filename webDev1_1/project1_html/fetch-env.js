const url =
	'https://api.openweathermap.org/data/2.5/weather';
const apiKey =
	'f00c38e0279b7bc85480c3fe775d518c';

async function weatherFn(cName) 
{
	const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
	const res = await fetch(temp);
	const data = await res.json();
		
	weatherShowFn(data);
}

function weatherShowFn(data) 
{
	const desc = data.weather[0].description || '';

    const formattedDesc = desc
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    
	$('#city-name').text(data.name);

	$('#date').text(moment().
		format('YYYY'));
    
    $('#temperature').
		html(`${Math.round(data.main.temp)}°C`);
    
    $('#description').text(formattedDesc);

    $('#weather-icon').
        attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
}

$(document).ready
(
    function () { weatherFn('Athlone'); }
);