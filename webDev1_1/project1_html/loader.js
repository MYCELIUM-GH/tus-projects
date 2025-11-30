        const outputElement = document.getElementById('output');
        const loader = document.getElementById('loader');
        const mainContent = document.getElementById('mainContent');
        const cursor = document.getElementById('cursor');
        let sequenceIndex = 0;
        let charIndex = 0;
        const typingDelay = 10;
        const lineDelay = 200;
        const bootSequence = 
        [
            "Initialising WebUI x.x.x...",
            "Checking fetchers... [ OK ]",
            "Loading main content... [ OK ]",
            "Starting Portainer...",
            "  - Main services starting... [ OK ]",
            "  - Secondary services starting... [ OK ]",
            "Loading UI components...",
            "Establishing secure connection to mainframe...",
            "Connection successful (Latency: 12ms)",
            "Authentication check in progress...",
            "User 'admin' authorised.",
            "Loading complete. Launching web application...",
            " "
        ];

        function typeLine() 
        {
            if (sequenceIndex < bootSequence.length) 
            {
                const currentLine = bootSequence[sequenceIndex];
                if (charIndex < currentLine.length) 
                {
                    outputElement.textContent += currentLine.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeLine, typingDelay);
                } 
                else 
                {
                    outputElement.textContent += '\n';
                    sequenceIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, lineDelay);
                }
            } 
            else { finishLoading(); }
        }

        function finishLoading() 
        {
            cursor.style.display = 'none';
            setTimeout(() => 
            {
                loader.style.opacity = '0';
                setTimeout(() => 
                {
                    loader.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    setTimeout(() => 
                    {
                        mainContent.style.opacity = '1';
                    }, 50);
                }, 1000);
            }, 500);
        }
        window.onload = function() { typeLine(); }
        