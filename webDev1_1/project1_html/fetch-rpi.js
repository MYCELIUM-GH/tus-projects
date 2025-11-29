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

            document.getElementById('disk-total').innerHTML = 
                `NVME: ${data.disk_total_gb} GB`;

            document.getElementById('disk-used').innerHTML = 
                `Used: ${data.disk_used_gb} GB`;
            
            let freeSpace = data.disk_total_gb - data.disk_used_gb;

            document.getElementById('disk-free').innerHTML = 
                `Free: ${freeSpace} GB`;

            document.getElementById('net-download').innerHTML = 
                `Download: ${data.download_kbs} kBps`;

            document.getElementById('net-upload').innerHTML = 
                `Upload: ${data.upload_kbs} kBps`;

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