// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready!');
    
    // Initialize the romantic website
    initializeRomanticWebsite();
});

function initializeRomanticWebsite() {
    // Entry button functionality
    const enterBtn = document.getElementById('enterBtn');
    const entryScreen = document.getElementById('entryScreen');
    const mainContent = document.getElementById('mainContent');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            // Add fade out animation to entry screen
            entryScreen.classList.add('fade-out');
            
            // Play background music
            if (backgroundMusic) {
                backgroundMusic.play().catch(e => console.log('Music autoplay prevented'));
            }
            
            // Show main content after animation
            setTimeout(() => {
                entryScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                startLoveCounter();
                startEngagementTimer();
                initializeFloatingHearts();
                initializeLoveGame();
                initializeInteractiveFeatures();
            }, 1000);
        });
    }
    
    // Music controls
    const musicToggle = document.getElementById('musicToggle');
    const romanticMode = document.getElementById('romanticMode');
    
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                this.textContent = '🎵 إيقاف الموسيقى';
            } else {
                backgroundMusic.pause();
                this.textContent = '🎵 تشغيل الموسيقى';
            }
        });
    }
    
    if (romanticMode) {
        romanticMode.addEventListener('click', function() {
            toggleRomanticMode();
        });
    }
}

// Love counter functionality
function startLoveCounter() {
    const loveCounter = document.getElementById('loveCounter');
    let seconds = 0;
    
    setInterval(() => {
        seconds++;
        if (loveCounter) {
            loveCounter.textContent = seconds.toLocaleString();
        }
    }, 1000);
}

// Engagement timer functionality
function startEngagementTimer() {
    const engagementDate = new Date('2025-06-23T00:00:00');
    
    function updateTimer() {
        const now = new Date();
        const timeDiff = now - engagementDate;
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Initialize floating hearts
function initializeFloatingHearts() {
    const floatingHearts = document.querySelector('.floating-hearts');
    const hearts = ['💖', '💕', '💗', '💝', '🌹', '💐', '✨'];
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        if (floatingHearts) {
            floatingHearts.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 8000);
        }
    }
    
    // Create hearts periodically
    setInterval(createFloatingHeart, 2000);
}

// Love game functionality
function initializeLoveGame() {
    const gameHearts = document.getElementById('gameHearts');
    const loveScore = document.getElementById('loveScore');
    let score = 0;
    
    if (!gameHearts) return;
    
    // Create game hearts
    for (let i = 0; i < 12; i++) {
        const gameHeart = document.createElement('div');
        gameHeart.className = 'game-heart';
        gameHeart.textContent = '💖';
        gameHeart.addEventListener('click', function() {
            score += 10;
            if (loveScore) {
                loveScore.textContent = score;
            }
            
            // Heart click animation
            this.style.transform = 'scale(1.3)';
            this.style.background = 'rgba(255, 107, 157, 0.3)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = 'rgba(255, 107, 157, 0.1)';
            }, 200);
            
            // Create floating heart effect
            createClickHeart(this);
        });
        
        gameHearts.appendChild(gameHeart);
    }
}

// Create heart effect on click
function createClickHeart(element) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Interactive features
function initializeInteractiveFeatures() {
    // Interactive hearts
    const clickableHearts = document.querySelectorAll('.clickable-heart');
    clickableHearts.forEach(heart => {
        heart.addEventListener('click', function() {
            this.style.transform = 'scale(1.5)';
            this.style.filter = 'drop-shadow(0 0 15px rgba(255, 107, 157, 1))';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.8))';
            }, 300);
            
            createClickHeart(this);
        });
    });
    
    // Interactive cards
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    // Photo hearts interaction
    const photoHearts = document.querySelectorAll('.photo-heart');
    photoHearts.forEach(heart => {
        heart.addEventListener('click', function() {
            this.style.transform = 'scale(1.5)';
            this.style.filter = 'drop-shadow(0 0 15px rgba(255, 107, 157, 1))';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.filter = 'none';
            }, 500);
            
            createClickHeart(this);
        });
    });
    
    // Main title interaction
    const mainTitle = document.getElementById('mainTitle');
    if (mainTitle) {
        mainTitle.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'titlePulse 3s ease-in-out infinite';
            }, 100);
            
            // Create multiple hearts
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createClickHeart(this);
                }, i * 200);
            }
        });
    }
    
    // Song controls
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (playPauseBtn && backgroundMusic) {
        playPauseBtn.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                this.textContent = '⏸️ إيقاف الأغنية';
            } else {
                backgroundMusic.pause();
                this.textContent = '▶️ تشغيل الأغنية';
            }
        });
    }
    
    if (volumeSlider && backgroundMusic) {
        volumeSlider.addEventListener('input', function() {
            backgroundMusic.volume = this.value / 100;
        });
    }
    
    // Share love button
    const shareLove = document.getElementById('shareLove');
    if (shareLove) {
        shareLove.addEventListener('click', function() {
            const message = 'أعلن أمام العالم كله أنني أحب آية عبد المولى بكل قلبي وروحي 💖';
            
            if (navigator.share) {
                navigator.share({
                    title: 'إعلان حب',
                    text: message,
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                navigator.clipboard.writeText(message + ' ' + window.location.href)
                    .then(() => {
                        alert('تم نسخ رسالة الحب! 💖');
                    })
                    .catch(() => {
                        alert('رسالة الحب: ' + message);
                    });
            }
        });
    }
}

// Photo magic effects
function createPhotoMagic() {
    const photoWrapper = document.getElementById('engagementPhotoWrapper');
    if (!photoWrapper) return;
    
    // Create sparkles
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = 'sparkleAnimation 2s ease-out forwards';
        
        photoWrapper.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
    
    // Photo glow effect
    const photo = document.getElementById('engagementPhoto');
    if (photo) {
        photo.style.filter = 'sepia(20%) saturate(1.5) brightness(1.3) contrast(1.2) hue-rotate(15deg) drop-shadow(0 0 30px rgba(255, 107, 157, 0.8))';
        
        setTimeout(() => {
            photo.style.filter = 'sepia(20%) saturate(1.3) brightness(1.15) contrast(1.1) hue-rotate(15deg)';
        }, 3000);
    }
}

// Heart rain effect
function createHeartRain() {
    const hearts = ['💖', '💕', '💗', '💝', '🌹', '💐'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.top = '-50px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = 'rainFall 4s linear forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 100);
    }
}

// Show blessings
function showBlessings() {
    const blessings = [
        'بارك الله لكما وبارك عليكما 🤲',
        'ألف مبروك الخطوبة السعيدة 💍',
        'ربنا يتمم على خير 🌹',
        'عقبال الفرح الكبير 💐',
        'الله يسعدكم ويبارك لكم 💖'
    ];
    
    blessings.forEach((blessing, index) => {
        setTimeout(() => {
            const blessingEl = document.createElement('div');
            blessingEl.textContent = blessing;
            blessingEl.style.position = 'fixed';
            blessingEl.style.top = '50%';
            blessingEl.style.left = '50%';
            blessingEl.style.transform = 'translate(-50%, -50%)';
            blessingEl.style.fontSize = '1.5rem';
            blessingEl.style.color = 'white';
            blessingEl.style.background = 'rgba(255, 107, 157, 0.9)';
            blessingEl.style.padding = '20px 30px';
            blessingEl.style.borderRadius = '25px';
            blessingEl.style.zIndex = '2000';
            blessingEl.style.textAlign = 'center';
            blessingEl.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            blessingEl.style.animation = 'fadeInOut 3s ease-in-out forwards';
            
            document.body.appendChild(blessingEl);
            
            setTimeout(() => {
                blessingEl.remove();
            }, 3000);
        }, index * 3500);
    });
}

// Love explosion effect
function showLoveExplosion(button) {
    const hearts = ['💖', '💕', '💗', '💝', '🌹', '💐', '✨'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        
        const angle = (i / 15) * 2 * Math.PI;
        const distance = 100 + Math.random() * 100;
        const endX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
        const endY = rect.top + rect.height / 2 + Math.sin(angle) * distance;
        
        heart.style.animation = `explodeHeart 2s ease-out forwards`;
        heart.style.setProperty('--endX', endX + 'px');
        heart.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

// Romantic mode toggle
function toggleRomanticMode() {
    const body = document.body;
    const isRomanticMode = body.classList.contains('romantic-mode');
    
    if (isRomanticMode) {
        body.classList.remove('romantic-mode');
        document.getElementById('romanticMode').textContent = '✨ وضع رومانسي خاص';
    } else {
        body.classList.add('romantic-mode');
        document.getElementById('romanticMode').textContent = '✨ إيقاف الوضع الرومانسي';
        
        // Add extra romantic effects
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
    
    @keyframes explodeHeart {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--endX, 0), var(--endY, 0)) scale(0); opacity: 0; }
    }
    
    @keyframes titleShimmer {
        0%, 100% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); }
        50% { text-shadow: 2px 2px 20px rgba(255, 107, 157, 0.8), 0 0 30px rgba(255, 107, 157, 0.6); }
    }
    
    @keyframes frameGlow {
        0%, 100% { opacity: 0.7; filter: blur(15px); }
        50% { opacity: 1; filter: blur(10px); }
    }
    
    @keyframes petalFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-15px) rotate(180deg); opacity: 1; }
    }
    
    @keyframes photoHeartFloat {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-10px) scale(1.1); }
    }
    
    @keyframes timerPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    @keyframes numberGlow {
        0% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); }
        100% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.8); }
    }
    
    @keyframes dateIconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes subtitleFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    @keyframes rotateHeart {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes loveFill {
        0%, 100% { width: 100%; }
        50% { width: 80%; }
    }
    
    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .romantic-mode {
        animation: romanticGlow 3s ease-in-out infinite;
    }
    
    @keyframes romanticGlow {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.1) saturate(1.2); }
    }
`;

document.head.appendChild(style);