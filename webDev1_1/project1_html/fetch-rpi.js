function updateStats() 
{
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => 
        {
            document.getElementById('cpu-stat').innerHTML = 
                `CPU: ${data.cpu_temp}°C / ${data.cpu_usage}%`;
            
            document.getElementById('ram-stat').innerHTML = 
                `RAM: ${data.ram_used_gb} / ${data.ram_total_gb} GB`;

            if (data.spotify_track) 
            {
                document.getElementById('spotify-stat').innerHTML = 
                    `Now Playing: **${data.spotify_track}** by ${data.spotify_artist}`;
            } 
            else 
            {
                document.getElementById('spotify-stat').innerHTML = 
                    `(No music playing)`;
            }

        })
}

updateStats();
setInterval(updateStats, 5000);