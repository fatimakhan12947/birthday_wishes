// ==================== BIRTHDAY SURPRISE WEBSITE ====================
let currentSection = 0;
const sections = [
    'landing',
    'giftSection',
    'messageSection',
    'memoriesSection',
    'reasonsSection',
    'cakeSection',
    'cakeCelebrationSection',
    'finalSection'
];

let musicPlaying = false;
const audioContext = new(window.AudioContext || window.webkitAudioContext)();

document.addEventListener('DOMContentLoaded', () => {
    initBackgroundParticles();
    initFloatingHearts('landingHearts');
    setupNavigation();
    setupGiftInteraction();
    setupCakeInteraction();
    setupCakeCelebration();
    setupMemoryCards();
    setupReasonsCards();
    createSparklesEngine();
    createBackgroundMusic();
});

// ==================== BACKGROUND STARS & PARTICLES ====================
function initBackgroundParticles() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const particles = [];

    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2
        });
    }

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.2,
            color: getRandomColor()
        });
    }

    function getRandomColor() {
        const colors = ['#ff6b9d', '#ffd700', '#45aaf2', '#a55eea', '#ff4757', '#ffa502'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.opacity = Math.sin(Date.now() * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity * 0.3})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
}

// ==================== FLOATING HEARTS ====================
function initFloatingHearts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute; left: ${Math.random() * 100}%; bottom: -20px;
            font-size: ${Math.random() * 20 + 15}px; opacity: ${Math.random() * 0.5 + 0.3};
            animation: floatUp ${Math.random() * 3 + 3}s linear forwards;
            pointer-events: none; z-index: 0;
        `;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }

    setInterval(createHeart, 500);
    for (let i = 0; i < 10; i++) setTimeout(createHeart, i * 200);
}

// Add dynamic styles
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes floatUp { 0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; } 100% { transform: translateY(-100vh) rotate(360deg) scale(0); opacity: 0; } }
    @keyframes zoomOut { from { opacity: 1; transform: translate(-50%, -50%) scale(1); } to { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } }
    @keyframes sparkleFloat { 0% { opacity: 1; transform: scale(1) translate(0, 0); } 100% { opacity: 0; transform: scale(0) translate(50px, -100px); } }
    @keyframes emojiFloat { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(50px, -100px) scale(0); } }
    @keyframes flash { 0% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes trailFade { to { opacity: 0; transform: scale(0); } }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); } 20%, 40%, 60%, 80% { transform: translateX(10px); } }
    @keyframes floatIn { 0% { opacity: 0; transform: translateY(50px) scale(0.8); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(dynamicStyles);

// ==================== NAVIGATION ====================
function setupNavigation() {
    const openSurpriseBtn = document.getElementById('openSurprise');
    if (!openSurpriseBtn) return;

    openSurpriseBtn.addEventListener('click', () => {
        triggerMagicalTransition();
        setTimeout(() => {
            navigateToSection(1);
            launchFireworks();
            startConfetti();
        }, 1500);
    });
}

function navigateToSection(index) {
    sections.forEach((sectionId, i) => {
        const section = document.getElementById(sectionId);
        if (section) {
            if (i === index) { section.classList.add('active');
                section.scrollIntoView({ behavior: 'smooth' }); } else { section.classList.remove('active'); }
        }
    });
    currentSection = index;
}

function triggerMagicalTransition() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createSparkle(window.innerWidth / 2 + (Math.random() - 0.5) * 400, window.innerHeight / 2 + (Math.random() - 0.5) * 400);
        }, i * 10);
    }
    const flash = document.createElement('div');
    flash.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; z-index: 1000; pointer-events: none; animation: flash 1s ease-out forwards;`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 1000);
}

// ==================== GIFT INTERACTION ====================
function setupGiftInteraction() {
    const giftBox = document.getElementById('giftBox');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const funnyMessages = document.getElementById('funnyMessages');
    if (!giftBox || !yesBtn || !noBtn) return;

    const messages = ["Are you sure? 😂", "Try again 😜", "You can't escape the surprise 😆", "Nope, you have to open it! 🎁", "The gift wants to be opened! 🎉", "No backsies! 😋", "You know you want to... 😏", "Too late, you're already here! 🎊"];

    noBtn.addEventListener('mouseover', (e) => {
        noBtn.style.position = 'fixed';
        noBtn.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        noBtn.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        noBtn.style.zIndex = '1000';
        funnyMessages.textContent = messages[Math.floor(Math.random() * messages.length)];
        funnyMessages.style.animation = 'none';
        setTimeout(() => { funnyMessages.style.animation = 'slideUp 0.5s ease-out'; }, 10);
        createEmojiBurst(e.clientX, e.clientY);
    });

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        noBtn.style.position = 'fixed';
        noBtn.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        noBtn.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        funnyMessages.textContent = messages[Math.floor(Math.random() * messages.length)];
        funnyMessages.style.animation = 'none';
        setTimeout(() => { funnyMessages.style.animation = 'slideUp 0.5s ease-out'; }, 10);
    });

    yesBtn.addEventListener('click', () => openGift());
    giftBox.addEventListener('click', () => openGift());
}

function createEmojiBurst(x, y) {
    const emojis = ['😂', '😜', '😆', '🤣', '😋'];
    for (let i = 0; i < 5; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.cssText = `position: fixed; left: ${x}px; top: ${y}px; font-size: ${Math.random() * 20 + 20}px; pointer-events: none; z-index: 1001; animation: emojiFloat ${Math.random() * 1 + 0.5}s ease-out forwards;`;
        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 1500);
    }
}

function openGift() {
    const giftBox = document.getElementById('giftBox');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    if (!giftBox) return;

    giftBox.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        giftBox.style.animation = '';
        giftBox.classList.add('opened');
        const rect = giftBox.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        for (let i = 0; i < 50; i++) {
            setTimeout(() => { createSparkle(cx + (Math.random() - 0.5) * 200, cy + (Math.random() - 0.5) * 200); }, i * 20);
        }
        launchFireworks();
        startConfetti();
        if (yesBtn) yesBtn.style.display = 'none';
        if (noBtn) noBtn.style.display = 'none';
        setTimeout(() => { navigateToSection(2);
            revealBirthdayMessage(); }, 2000);
    }, 500);
}

// ==================== BIRTHDAY MESSAGE REVEAL ====================
function revealBirthdayMessage() {
    const messageCard = document.getElementById('birthdayMessage');
    if (!messageCard) return;
    const lines = ["Happy Birthday My Favorite Person ❤️", "May your life be filled with happiness, success, laughter,", "unforgettable adventures, and endless beautiful moments.", "You make every day brighter and more special.", "Today is all about celebrating you.", "Wishing you a magical birthday filled with love and joy. 🎂✨"];
    messageCard.innerHTML = '';
    lines.forEach((line, index) => {
        const p = document.createElement('p');
        p.className = 'message-line';
        p.textContent = line;
        p.style.animationDelay = `${index * 0.8}s`;
        messageCard.appendChild(p);
    });
    setTimeout(() => { navigateToSection(3);
        initScrollReveal(); }, 8000);
}

// ==================== MEMORY CARDS ====================
function setupMemoryCards() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    const memories = [
        { date: '2024-01-15', title: 'First Meeting', desc: 'The day our paths crossed and magic happened', icon: '🌟' },
        { date: '2024-02-14', title: 'Valentine\'s Day', desc: 'A day filled with love and beautiful surprises', icon: '💝' },
        { date: '2024-03-20', title: 'Spring Adventure', desc: 'Exploring new places and creating memories', icon: '🌸' },
        { date: '2024-04-05', title: 'Sunset Beach', desc: 'Walking hand in hand along the shore', icon: '🌅' },
        { date: '2024-05-10', title: 'Movie Marathon', desc: 'Laughing until our stomachs hurt', icon: '🎬' },
        { date: '2024-06-21', title: 'Summer Festival', desc: 'Dancing under the stars all night long', icon: '🎪' },
        { date: '2024-07-04', title: 'Fireworks Show', desc: 'Watching colors light up the night sky', icon: '🎆' },
        { date: '2024-08-15', title: 'Stargazing', desc: 'Counting stars and making wishes together', icon: '⭐' },
        { date: '2024-09-10', title: 'Autumn Walk', desc: 'Crunching leaves and sipping hot chocolate', icon: '🍂' },
        { date: '2024-10-31', title: 'Halloween Fun', desc: 'Dressing up and collecting sweet memories', icon: '🎃' }
    ];
    memories.forEach(memory => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `<div class="memory-image">${memory.icon}</div><div class="memory-date">📅 ${memory.date}</div><div class="memory-title">${memory.title}</div><div class="memory-desc">${memory.desc}</div>`;
        timeline.appendChild(card);
    });
}

// ==================== REASONS CARDS ====================
function setupReasonsCards() {
    const grid = document.getElementById('reasonsGrid');
    if (!grid) return;
    const reasons = [
        { icon: '😊', text: 'Your Beautiful Smile' }, { icon: '💖', text: 'Your Kindness' },
        { icon: '✨', text: 'Your Positivity' }, { icon: '🤗', text: 'Your Support' },
        { icon: '😂', text: 'Your Laughter' }, { icon: '💪', text: 'Your Courage' },
        { icon: '🎨', text: 'Your Creativity' }, { icon: '🧠', text: 'Your Intelligence' },
        { icon: '💕', text: 'Your Love' }, { icon: '🌟', text: 'Your Energy' },
        { icon: '🎵', text: 'Your Voice' }, { icon: '👑', text: 'Your Confidence' }
    ];
    reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.style.animationDelay = `${index * 0.2}s`;
        card.innerHTML = `<div class="reason-icon">${reason.icon}</div><div class="reason-text">${reason.text}</div>`;
        grid.appendChild(card);
    });
}

// ==================== OLD CAKE INTERACTION ====================
function setupCakeInteraction() {
    const blowBtn = document.getElementById('blowCandles');
    if (!blowBtn) return;
    let candlesBlown = false;

    blowBtn.addEventListener('click', () => {
        if (candlesBlown) return;
        candlesBlown = true;
        const flames = document.querySelectorAll('#cakeSection .flame');
        flames.forEach(flame => flame.classList.add('extinguished'));
        createSmoke();
        launchFireworks();
        setTimeout(() => { navigateToSection(6); }, 2000);
    });
}

function createSmoke() {
    const smokeContainer = document.getElementById('smokeContainer');
    if (!smokeContainer) return;
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.className = 'smoke-particle';
            smoke.style.left = Math.random() * 100 + '%';
            smoke.style.animationDelay = Math.random() * 0.5 + 's';
            smokeContainer.appendChild(smoke);
            setTimeout(() => smoke.remove(), 2000);
        }, i * 100);
    }
}

// ==================== NEW PREMIUM CAKE CELEBRATION ====================
function setupCakeCelebration() {
    const blowBtn = document.getElementById('blowCandlesBtn');
    if (!blowBtn) return;

    const cinematicOverlay = document.getElementById('cinematicOverlay');
    const cakeCard = document.getElementById('cakeCard');
    const wishMessage = document.getElementById('wishMessage');
    const windParticles = document.getElementById('windParticles');
    const celebrationSparks = document.getElementById('celebrationSparks');
    const balloonsContainer = document.getElementById('balloonsContainer');
    const cakeHearts = document.getElementById('cakeHearts');

    let candlesBlown = false;
    let cakeSectionActive = false;

    function addButtonSparkles() {
        const btnSparkles = blowBtn.querySelector('.btn-sparkles');
        if (!btnSparkles) return;
        setInterval(() => {
            if (candlesBlown) return;
            const sparkle = document.createElement('div');
            sparkle.className = 'btn-sparkle-particle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
            sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 100 - 50 + 'px');
            btnSparkles.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, 300);
    }
    addButtonSparkles();

    function createWindEffect() {
        if (!windParticles) return;
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const windLine = document.createElement('div');
                windLine.className = 'wind-line';
                windLine.style.left = Math.random() * 100 + '%';
                windLine.style.top = Math.random() * 60 + '%';
                windLine.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
                windLine.style.animationDelay = Math.random() * 0.5 + 's';
                windLine.style.height = (Math.random() * 150 + 50) + 'px';
                windParticles.appendChild(windLine);
                setTimeout(() => windLine.remove(), 2000);
            }, i * 50);
        }
    }

    function createCandleSmoke(smokeContainerId) {
        const smokeContainer = document.getElementById(smokeContainerId);
        if (!smokeContainer) return;
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const smoke = document.createElement('div');
                smoke.className = 'smoke-particle-small';
                smoke.style.left = (Math.random() - 0.5) * 20 + 'px';
                smoke.style.animationDelay = Math.random() * 0.5 + 's';
                smoke.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
                smokeContainer.appendChild(smoke);
                setTimeout(() => smoke.remove(), 3000);
            }, i * 100);
        }
    }

    function createCelebrationSparksEffect() {
        if (!celebrationSparks) return;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.className = 'celebration-spark';
                spark.style.left = centerX + 'px';
                spark.style.top = centerY + 'px';
                spark.style.setProperty('--sx', (Math.random() - 0.5) * 800 + 'px');
                spark.style.setProperty('--sy', (Math.random() - 0.5) * 800 + 'px');
                spark.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
                spark.style.width = (Math.random() * 8 + 3) + 'px';
                spark.style.height = spark.style.width;
                const colors = ['#ffd700', '#ff6b9d', '#45aaf2', '#ff4757', '#ffa502', '#2ed573', '#a55eea'];
                spark.style.background = colors[Math.floor(Math.random() * colors.length)];
                spark.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${spark.style.background}`;
                celebrationSparks.appendChild(spark);
                setTimeout(() => spark.remove(), 2500);
            }, i * 15);
        }
    }

    function createBalloons() {
        if (!balloonsContainer) return;
        const balloonEmojis = ['🎈', '🎈', '🎈', '🎀', '🎁', '🎊', '🎉'];
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
                balloon.style.left = Math.random() * 90 + '%';
                balloon.style.fontSize = (Math.random() * 2 + 2) + 'rem';
                balloon.style.animationDuration = (Math.random() * 5 + 6) + 's';
                balloon.style.animationDelay = Math.random() * 2 + 's';
                balloonsContainer.appendChild(balloon);
                setTimeout(() => balloon.remove(), 10000);
            }, i * 300);
        }
    }

    function createCakeHeartsEffect() {
        if (!cakeHearts) return;
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'cake-heart';
                heart.textContent = '❤️';
                heart.style.left = Math.random() * 90 + '%';
                heart.style.bottom = Math.random() * 50 + '%';
                heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
                heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
                cakeHearts.appendChild(heart);
                setTimeout(() => heart.remove(), 5000);
            }, i * 150);
        }
    }

    // ========== MAIN BLOW CANDLES ==========
    blowBtn.addEventListener('click', () => {
        if (candlesBlown) return;
        candlesBlown = true;
        cakeSectionActive = true;

        blowBtn.disabled = true;
        blowBtn.style.opacity = '0.6';
        blowBtn.style.cursor = 'not-allowed';
        const btnText = blowBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Blowing... 💨';

        if (cinematicOverlay) cinematicOverlay.classList.add('active');
        if (cakeCard) cakeCard.classList.add('zoom-effect');
        createWindEffect();

        setTimeout(() => {
            for (let i = 1; i <= 5; i++) {
                const flame = document.getElementById('flame' + i);
                if (flame) flame.classList.add('flickering');
            }
        }, 500);

        for (let i = 1; i <= 5; i++) {
            setTimeout(() => {
                const flame = document.getElementById('flame' + i);
                if (flame) {
                    flame.classList.remove('flickering');
                    flame.classList.add('extinguished');
                }
                createCandleSmoke('smoke' + i);
                const candle = document.querySelector('.candle-' + i);
                if (candle) {
                    const rect = candle.getBoundingClientRect();
                    for (let j = 0; j < 8; j++) {
                        createSparkle(rect.left + rect.width / 2 + (Math.random() - 0.5) * 30, rect.top + (Math.random() - 0.5) * 30);
                    }
                }
            }, 1500 + i * 600);
        }

        setTimeout(() => {
            createCelebrationSparksEffect();
            launchFireworks();
            startConfetti();
            createBalloons();
            createCakeHeartsEffect();
            if (cinematicOverlay) cinematicOverlay.classList.remove('active');
            if (cakeCard) cakeCard.classList.remove('zoom-effect');
            blowBtn.style.display = 'none';
            if (wishMessage) wishMessage.classList.remove('hidden');
            for (let i = 0; i < 50; i++) {
                setTimeout(() => { createSparkle(Math.random() * window.innerWidth, Math.random() * window.innerHeight); }, i * 30);
            }

            // ========== AUTO NAVIGATE TO FINAL SECTION ==========
            setTimeout(() => {
                if (wishMessage) {
                    wishMessage.style.opacity = '0';
                    wishMessage.style.transform = 'translateY(30px)';
                    wishMessage.style.transition = 'all 0.8s ease';
                }
                setTimeout(() => {
                    navigateToSection(7);
                    launchFireworks();
                    startConfetti();
                }, 800);
            }, 8000);

        }, 5000);
    });

    setInterval(() => {
        if (cakeSectionActive && currentSection === 6) {
            if (!cakeHearts) return;
            const heart = document.createElement('div');
            heart.className = 'cake-heart';
            heart.textContent = '💕';
            heart.style.left = Math.random() * 90 + '%';
            heart.style.bottom = Math.random() * 50 + '%';
            heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            cakeHearts.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }
    }, 800);
}

// ==================== SPARKLES ENGINE ====================
function createSparklesEngine() {
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 10; i++) createSparkle(e.clientX + (Math.random() - 0.5) * 50, e.clientY + (Math.random() - 0.5) * 50);
    });
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) createSparkle(e.clientX, e.clientY);
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    const colors = ['#ffd700', '#ff6b9d', '#45aaf2', '#a55eea', '#ffa502', '#ff4757'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.cssText = `position: fixed; left: ${x}px; top: ${y}px; width: ${Math.random() * 10 + 5}px; height: ${Math.random() * 10 + 5}px; background: ${color}; border-radius: 50%; pointer-events: none; z-index: 1000; box-shadow: 0 0 ${Math.random() * 10 + 5}px ${color}; animation: sparkleFloat ${Math.random() * 1 + 0.5}s ease-out forwards;`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
}

// ==================== FIREWORKS ENGINE ====================
function launchFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
            this.gravity = 0.05;
        }
        draw(ctx) { ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore(); }
        update() { this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay; }
    }

    function createFirework(x, y) {
        const colors = ['#ff6b9d', '#ffd700', '#45aaf2', '#a55eea', '#ff4757', '#ffa502', '#2ed573'];
        for (let i = 0; i < 100; i++) particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].alpha <= 0) particles.splice(i, 1);
            else { particles[i].update();
                particles[i].draw(ctx); }
        }
        if (particles.length > 0) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.6), i * 400);
    }
    animate();
}

// ==================== CONFETTI RAIN ====================
let confettiAnimationId = null;

function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const confetti = [];
    const colors = ['#ff6b9d', '#ffd700', '#45aaf2', '#a55eea', '#ff4757', '#ffa502', '#2ed573', '#ff6348'];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 3 + 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.wind = Math.random() * 2 - 1;
        }
        draw(ctx) { ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
            ctx.restore(); }
        update() { this.y += this.speed;
            this.x += this.wind;
            this.rotation += this.rotationSpeed; if (this.y > canvas.height + 100) { this.y = -100;
                this.x = Math.random() * canvas.width; } }
    }

    for (let i = 0; i < 200; i++) confetti.push(new ConfettiPiece());

    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(p => { p.draw(ctx);
            p.update(); });
        confettiAnimationId = requestAnimationFrame(animate); }
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    animate();
    setTimeout(() => { if (confettiAnimationId) { cancelAnimationFrame(confettiAnimationId);
            confettiAnimationId = null; }
        ctx.clearRect(0, 0, canvas.width, canvas.height); }, 15000);
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.2 });
    document.querySelectorAll('.memory-card, .reason-card').forEach(el => observer.observe(el));
}

// ==================== BACKGROUND MUSIC ====================
function createBackgroundMusic() {
    const musicBtn = document.getElementById('musicToggle');
    if (!musicBtn) return;
    let oscillator = null,
        gainNode = null;
    musicBtn.addEventListener('click', () => {
        if (!musicPlaying) {
            try {
                oscillator = audioContext.createOscillator();
                gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5].forEach((note, i) => {
                    oscillator.frequency.setValueAtTime(note, audioContext.currentTime + i * 0.5);
                });
                oscillator.start();
                musicPlaying = true;
                musicBtn.querySelector('.music-icon').textContent = '🔊';
            } catch (e) {}
        } else {
            if (oscillator) { oscillator.stop();
                oscillator = null; }
            musicPlaying = false;
            musicBtn.querySelector('.music-icon').textContent = '🔇';
        }
    });
}

// ==================== ADDITIONAL FEATURES ====================
setInterval(() => {
    if (currentSection >= 1) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `position: fixed; left: ${Math.random() * 100}%; bottom: -20px; font-size: ${Math.random() * 30 + 15}px; opacity: ${Math.random() * 0.5 + 0.3}; animation: floatUp ${Math.random() * 4 + 3}s linear forwards; pointer-events: none; z-index: 998;`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }
}, 1000);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { if (currentSection < sections.length - 1) navigateToSection(currentSection + 1); } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { if (currentSection > 0) navigateToSection(currentSection - 1); }
});

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const trail = document.createElement('div');
        trail.style.cssText = `position: fixed; left: ${e.clientX}px; top: ${e.clientY}px; width: 3px; height: 3px; background: #ffd700; border-radius: 50%; pointer-events: none; z-index: 9999; animation: trailFade 0.5s ease-out forwards;`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    }
});

window.addEventListener('resize', () => {
    ['bgCanvas', 'confettiCanvas', 'fireworksCanvas'].forEach(id => {
        const c = document.getElementById(id);
        if (c) { c.width = window.innerWidth;
            c.height = window.innerHeight; }
    });
});

// ==================== START ====================
navigateToSection(0);