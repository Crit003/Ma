document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const revealBtn = document.getElementById('revealBtn');
    const cameraContainer = document.getElementById('cameraContainer');
    const video = document.getElementById('video');
    const captureBtn = document.getElementById('captureBtn');
    const result = document.getElementById('result');
    const heartsContainer = document.querySelector('.hearts');
    
    // Create additional floating hearts
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heartsContainer.appendChild(heart);
    }
    
    // Reveal Button Click Handler
    revealBtn.addEventListener('click', async () => {
        try {
            // Play romantic sound effect (optional)
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-romantic-sigh-1175.mp3');
            audio.volume = 0.3;
            audio.play().catch(e => console.log("Audio play prevented:", e));
            
            // Request camera access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
            
            video.srcObject = stream;
            cameraContainer.style.display = 'block';
            revealBtn.style.display = 'none';
            
            // Romantic message with typing effect
            const messages = [
                "Behold... the most beautiful person on Earth!",
                "Your beauty takes our breath away...",
                "The mirror of perfection is before you...",
                "True beauty has been revealed..."
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            typeWriter(randomMessage, result);
            
        } catch (err) {
            result.textContent = "Oh no! We couldn't access the camera. " + 
                                "Please grant permissions to see the beauty.";
            result.classList.add('show');
            console.error("Camera error:", err);
        }
    });
    
    // Capture Button Click Handler
    captureBtn.addEventListener('click', async () => {
        try {
            // Create canvas to capture image
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            
            // Apply vintage filter
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'sepia(50%) brightness(105%) contrast(105%)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';
            
            // Convert to blob
            canvas.toBlob(async (blob) => {
                // Show sending animation
                result.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending this beautiful moment...';
                result.classList.add('show');
                
                // Stop camera
                const stream = video.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                
                // Simulate sending (in a real app, you would send to server)
                setTimeout(() => {
                    const responses = [
                        "Your beauty has been captured forever!",
                        "This moment is now eternal...",
                        "The world is brighter with your beauty in it!",
                        "This image will make the angels jealous!"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    result.innerHTML = `<i class="fas fa-heart" style="color: #ff6b8a;"></i> ${randomResponse}`;
                    
                    // Create download link
                    const downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = 'beautiful-moment.jpg';
                    downloadLink.textContent = ' Download Your Photo';
                    downloadLink.style.marginLeft = '10px';
                    downloadLink.style.color = '#6b8aff';
                    downloadLink.style.textDecoration = 'none';
                    downloadLink.style.fontWeight = 'bold';
                    
                    result.appendChild(document.createElement('br'));
                    result.appendChild(downloadLink);
                    
                    // Play success sound
                    const successAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
                    successAudio.volume = 0.2;
                    successAudio.play().catch(e => console.log("Audio play prevented:", e));
                    
                }, 2000);
                
            }, 'image/jpeg', 0.9);
            
        } catch (err) {
            result.textContent = "Oh dear! We couldn't capture the moment. Please try again.";
            result.classList.add('show');
            console.error("Capture error:", err);
        }
    });
    
    // Typewriter effect function
    function typeWriter(text, element, speed = 50) {
        element.textContent = '';
        element.classList.add('show');
        let i = 0;
        
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }
});