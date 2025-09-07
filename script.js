// Enhanced romantic website with song lyrics modification
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced romantic website loaded for Aya Abdel Mawla 💖');
    
    // Get DOM elements
    const entryScreen = document.getElementById('entryScreen');
    const mainContent = document.getElementById('mainContent');
    const enterBtn = document.getElementById('enterBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const romanticMode = document.getElementById('romanticMode');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const loveCounter = document.getElementById('loveCounter');
    const loveScore = document.getElementById('loveScore');
    const gameHearts = document.getElementById('gameHearts');
    const shareLove = document.getElementById('shareLove');
    
    let musicPlaying = false;
    let romanticModeActive = false;
    let loveSeconds = 0;
    let gameScore = 0;
    
    // Modified song lyrics with "آية عبد المولى" instead of "ليلى"
    const modifiedLyrics = [
        "خطوة ورا خطوة بتمشيها.. دي اللحظة اللي أنا مستنيها",
        "والأرض اللي بتمشي فوقيها.. مفيش قدك يا حبيبتي عليها",
        "خطوة ورا خطوة بقرب لك.. جايلك عشان أفرح قلبك",
        "وعمري اللي كان قبل ما قابلك مش بحسب أيامه من قبلك",
        "فستانك الأبيض الي هياخد منك حتة",
        "وعلشان اليوم دة رسمت وعملت أنا مليون خطة",
        "والناس بتغني والدنيا بتعزف زفة",
        "والمزيكا تعلى ومعاها تعلى السقفة",
        "حبيتي وعمري وأميرتي.. يا بكرة الي مددلي إيده",
        "يا قصري وبيتي وجزيرتي وحلم قدرت أوصل ليه",
        "وقالوا الشعر عن آية عبد المولى وكاتبوا في سحرها دواوين",
        "وأنا وآية عبد المولى بقينا لبعض في دنيتنا سوا عايشين.. عايشين"
    ];
    
    // Update song lyrics in the HTML
    function updateSongLyrics() {
        const lyricsContainer = document.querySelector('.song-lyrics');
        if (lyricsContainer) {
            lyricsContainer.innerHTML = modifiedLyrics.map(line => 
                `<p class="lyric-line">${line}</p>`
            ).join('');
        }
    }
    
    // Entry button click handler
    enterBtn.addEventListener('click', function() {
        // Add fade out animation to entry screen
        entryScreen.classList.add('fade-out');
        
        // Play background music after user interaction
        playBackgroundMusic();
        
        // Show main content after animation
        setTimeout(() => {
            entryScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Add entrance animation to main content
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                mainContent.style.transition = 'all 1s ease';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                
                // Start love counter
                startLoveCounter();
                
                // Initialize love game
                initializeLoveGame();
                
                // Update song lyrics
                updateSongLyrics();
                
            }, 100);
            
        }, 1000);
    });
    
    // Background music control
    function playBackgroundMusic() {
        backgroundMusic.play().then(() => {
            musicPlaying = true;
            updateMusicButton();
        }).catch(e => {
            console.log('Audio autoplay prevented, creating alternative melody');
            createRomanticMelody();
            musicPlaying = true;
            updateMusicButton();
        });
    }
    
    function createRomanticMelody() {
        // Create a simple romantic melody using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Romantic melody notes (frequencies in Hz)
            const melody = [
                { freq: 523.25, duration: 0.5 }, // C5
                { freq: 587.33, duration: 0.5 }, // D5
                { freq: 659.25, duration: 0.5 }, // E5
                { freq: 698.46, duration: 0.5 }, // F5
                { freq: 783.99, duration: 1.0 }, // G5
                { freq: 659.25, duration: 0.5 }, // E5
                { freq: 587.33, duration: 0.5 }, // D5
                { freq: 523.25, duration: 1.0 }, // C5
            ];
            
            let currentTime = audioContext.currentTime;
            
            function playMelody() {
                melody.forEach((note, index) => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(note.freq, currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0, currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
                    gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);
                    
                    oscillator.start(currentTime);
                    oscillator.stop(currentTime + note.duration);
                    
                    currentTime += note.duration;
                });
                
                // Repeat melody
                setTimeout(() => {
                    if (musicPlaying) {
                        currentTime = audioContext.currentTime;
                        playMelody();
                    }
                }, currentTime * 1000 - Date.now());
            }
            
            playMelody();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    // Music toggle functionality
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (musicPlaying) {
                backgroundMusic.pause();
                musicPlaying = false;
            } else {
                playBackgroundMusic();
            }
            updateMusicButton();
        });
    }
    
    function updateMusicButton() {
        if (musicToggle) {
            musicToggle.textContent = musicPlaying ? '🎵 إيقاف الموسيقى' : '🎵 تشغيل الموسيقى';
        }
    }
    
    // Song control functionality
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                playPauseBtn.textContent = '⏸️ إيقاف الأغنية';
                musicPlaying = true;
            } else {
                backgroundMusic.pause();
                playPauseBtn.textContent = '▶️ تشغيل الأغنية';
                musicPlaying = false;
            }
            updateMusicButton();
        });
    }
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            backgroundMusic.volume = this.value / 100;
        });
        
        // Set initial volume
        backgroundMusic.volume = 0.7;
    }
    
    // Romantic mode toggle
    if (romanticMode) {
        romanticMode.addEventListener('click', function() {
            romanticModeActive = !romanticModeActive;
            
            if (romanticModeActive) {
                document.body.classList.add('romantic-mode');
                romanticMode.textContent = '✨ إيقاف الوضع الرومانسي';
                createSpecialEffects();
            } else {
                document.body.classList.remove('romantic-mode');
                romanticMode.textContent = '✨ وضع رومانسي خاص';
            }
        });
    }
    
    // Love counter
    function startLoveCounter() {
        setInterval(() => {
            loveSeconds++;
            if (loveCounter) {
                loveCounter.textContent = loveSeconds;
            }
        }, 1000);
    }
    
    // Love game initialization
    function initializeLoveGame() {
        if (!gameHearts) return;
        
        // Create game hearts
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.className = 'game-heart';
            heart.textContent = ['💖', '💕', '💗', '💝'][Math.floor(Math.random() * 4)];
            heart.addEventListener('click', function() {
                gameScore += 10;
                if (loveScore) {
                    loveScore.textContent = gameScore;
                }
                
                // Add click effect
                this.style.transform = 'scale(1.5)';
                this.style.background = 'rgba(255, 107, 157, 0.5)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.background = 'rgba(255, 107, 157, 0.1)';
                }, 300);
                
                // Create floating score
                createFloatingScore(this, '+10');
            });
            
            gameHearts.appendChild(heart);
        }
    }
    
    function createFloatingScore(element, score) {
        const floatingScore = document.createElement('div');
        floatingScore.textContent = score;
        floatingScore.style.position = 'absolute';
        floatingScore.style.color = '#ff6b9d';
        floatingScore.style.fontWeight = 'bold';
        floatingScore.style.fontSize = '1.2rem';
        floatingScore.style.pointerEvents = 'none';
        floatingScore.style.animation = 'floatScore 1s ease-out forwards';
        
        const rect = element.getBoundingClientRect();
        floatingScore.style.left = rect.left + 'px';
        floatingScore.style.top = rect.top + 'px';
        
        document.body.appendChild(floatingScore);
        
        setTimeout(() => {
            if (floatingScore.parentNode) {
                floatingScore.parentNode.removeChild(floatingScore);
            }
        }, 1000);
    }
    
    // Share love functionality
    if (shareLove) {
        shareLove.addEventListener('click', function() {
            const loveMessage = `💖 أعلن أمام العالم كله أنني أحب آية عبد المولى بكل قلبي وروحي! 💖\n\nهذا الموقع الرومانسي مخصص لها: ${window.location.href}`;
            
            if (navigator.share) {
                navigator.share({
                    title: '💖 إعلان حب لآية عبد المولى',
                    text: loveMessage,
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(loveMessage).then(() => {
                    alert('تم نسخ رسالة الحب! يمكنك مشاركتها الآن 💕');
                });
            }
        });
    }
    
    // Add romantic particle effects
    function createHeartParticles() {
        const heartsContainer = document.querySelector('.floating-hearts');
        if (!heartsContainer) return;
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = ['💖', '💕', '💗', '💝', '🌹', '💐', '✨'][Math.floor(Math.random() * 7)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
        }, 1500);
    }
    
    // Add interactive hover effects to message cards
    function addCardInteractivity() {
        const messageCards = document.querySelectorAll('.interactive-card');
        
        messageCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add sparkle effect
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.className = 'sparkle';
                sparkle.style.position = 'absolute';
                sparkle.style.top = '10px';
                sparkle.style.left = '10px';
                sparkle.style.fontSize = '1.5rem';
                sparkle.style.pointerEvents = 'none';
                
                this.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
            });
            
            // Add click effect for interactive hearts
            const clickableHearts = card.querySelectorAll('.clickable-heart');
            clickableHearts.forEach(heart => {
                heart.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Create heart explosion
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            const explosionHeart = document.createElement('div');
                            explosionHeart.innerHTML = this.textContent;
                            explosionHeart.className = 'heart-explosion';
                            explosionHeart.style.position = 'fixed';
                            explosionHeart.style.left = e.clientX + 'px';
                            explosionHeart.style.top = e.clientY + 'px';
                            explosionHeart.style.fontSize = '1.5rem';
                            explosionHeart.style.pointerEvents = 'none';
                            explosionHeart.style.zIndex = '9999';
                            explosionHeart.style.setProperty('--random-x', (Math.random() * 200 - 100) + 'px');
                            explosionHeart.style.setProperty('--random-y', (Math.random() * 200 - 100) + 'px');
                            
                            document.body.appendChild(explosionHeart);
                            
                            setTimeout(() => {
                                if (explosionHeart.parentNode) {
                                    explosionHeart.parentNode.removeChild(explosionHeart);
                                }
                            }, 2000);
                        }, i * 100);
                    }
                });
            });
        });
    }
    
    // Special effects for romantic mode
    function createSpecialEffects() {
        // Create more intense heart rain
        const romanticRain = document.querySelector('.romantic-rain');
        if (romanticRain) {
            romanticRain.style.animation = 'rainFall 8s linear infinite';
        }
        
        // Add pulsing effect to all hearts
        const allHearts = document.querySelectorAll('.floating-heart, .heart, .game-heart');
        allHearts.forEach(heart => {
            heart.style.animation += ', heartPulse 1s ease-in-out infinite';
        });
    }
    
    // Easter egg: Double click on title for special effect
    const mainTitle = document.getElementById('mainTitle');
    if (mainTitle) {
        mainTitle.addEventListener('dblclick', function(e) {
            // Create massive heart explosion
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.innerHTML = ['💖', '💕', '💗', '💝', '🌹'][Math.floor(Math.random() * 5)];
                    heart.className = 'heart-explosion';
                    heart.style.position = 'fixed';
                    heart.style.left = e.clientX + 'px';
                    heart.style.top = e.clientY + 'px';
                    heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
                    heart.style.pointerEvents = 'none';
                    heart.style.zIndex = '9999';
                    heart.style.setProperty('--random-x', (Math.random() * 400 - 200) + 'px');
                    heart.style.setProperty('--random-y', (Math.random() * 400 - 200) + 'px');
                    
                    document.body.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode) {
                            heart.parentNode.removeChild(heart);
                        }
                    }, 2000);
                }, i * 50);
            }
        });
    }
    
    // Love explosion function for buttons
    window.showLoveExplosion = function(button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = ['💖', '💕', '💗', '💝'][Math.floor(Math.random() * 4)];
                heart.className = 'heart-explosion';
                heart.style.position = 'fixed';
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.fontSize = '2rem';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                heart.style.setProperty('--random-x', (Math.random() * 300 - 150) + 'px');
                heart.style.setProperty('--random-y', (Math.random() * 300 - 150) + 'px');
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 2000);
            }, i * 80);
        }
        
        // Change button text temporarily
        const originalText = button.textContent;
        button.textContent = 'مفاجأة رومانسية! 💕';
        button.style.background = 'linear-gradient(45deg, #ff1493, #ff69b4)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(45deg, #ff6b9d, #c44569)';
        }, 2000);
    };
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatScore {
            0% { transform: translateY(0px); opacity: 1; }
            100% { transform: translateY(-50px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize interactive features after entry
    setTimeout(() => {
        createHeartParticles();
        addCardInteractivity();
    }, 2000);
    
    // Typing effect for beloved name on entry screen
    function typeWriter(element, text, speed = 150) {
        if (!element) return;
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Start typing effect for name
    const typingName = document.getElementById('typingName');
    if (typingName) {
        setTimeout(() => {
            typeWriter(typingName, 'آية عبد المولى');
        }, 1000);
    }
});