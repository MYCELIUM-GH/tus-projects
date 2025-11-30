async function updateStats() 
{
    try 
    {
        const response = await fetch('https://ironhills.dev/api/stats');
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }

        const data = await response.json();
        
        document.getElementById('cpu-stat').innerHTML = 
            `CPU: ${Math.round(data.cpu_temp)}°C / ${Math.round(data.cpu_usage)}%`;
        
        document.getElementById('ram-stat').innerHTML = 
            `RAM: ${data.ram_used_gb} / ${data.ram_total_gb} GB`;

        document.getElementById('disk-total').innerHTML = 
            `NVME: ${data.disk_total_gb} GB`;

        document.getElementById('disk-used').innerHTML = 
            `Used: ${data.disk_used_gb} GB`;
        
        const freeSpace = data.disk_total_gb - data.disk_used_gb;

        document.getElementById('disk-free').innerHTML = 
            `Free: ${Math.round(freeSpace)} GB`;

        document.getElementById('net-download').innerHTML = 
            `<i class="fa-regular fa-circle-down"></i> ${data.download_kbs} kBps`;

        document.getElementById('net-upload').innerHTML = 
            `<i class="fa-regular fa-circle-up"></i> ${data.upload_kbs} kBps`;
        
        const spotifyStatElement = document.getElementById('spotify-stat');
        if (spotifyStatElement) 
        {
            if (data.spotify_track) 
            {
                spotifyStatElement.innerHTML = 
                    `Now Playing: **${data.spotify_track}** by ${data.spotify_artist}`;
            } 
            else 
            {
                spotifyStatElement.innerHTML = 
                    `(No music playing)`;
            }
        }


    } catch (error) { console.error("Error fetching or processing stats:", error); }
}

document.addEventListener('DOMContentLoaded', () => 
{
    updateStats();
    setInterval(updateStats, 5000);
});