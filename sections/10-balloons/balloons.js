let messages = [];
let poppedCount = 0;
let balloonInterval;

// Balloon pop sound - apni sound file dile ei line replace korben
const popSound = new Audio('assets/sounds/balloon-pop.mp3');

async function initBalloons() {
    const { data } = await window._supabase.from('balloon_messages').select('message');
    messages = data?.map(d => d.message) || ['I Love You! ❤️', 'You are Beautiful! ✨'];
    
    balloonInterval = setInterval(createBalloon, 2000);
    
    createBalloon();
    setTimeout(createBalloon, 500);
    setTimeout(createBalloon, 1000);
}

function createBalloon() {
    const container = document.getElementById('balloon-container');
    if (!container) return;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const colors = ['#ff4081', '#ffeb3b', '#3f51b5', '#4caf50', '#ff9800', '#e91e63', '#9c27b0'];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 85 + 5 + '%';
    balloon.style.animationDuration = (Math.random() * 3 + 5) + 's';
    balloon.innerHTML = '🎈';

    balloon.onclick = () => popBalloon(balloon);
    container.appendChild(balloon);

    setTimeout(() => balloon.remove(), 10000);
}

function popBalloon(el) {
    // Play pop sound
    popSound.currentTime = 0;
    popSound.play().catch(() => {});
    
    el.style.transform = 'scale(0)';
    el.style.transition = 'transform 0.3s';
    
    setTimeout(() => el.remove(), 300);
    
    poppedCount++;
    document.getElementById('pop-count').textContent = poppedCount;

    const msgDisplay = document.getElementById('pop-message-display');
    msgDisplay.innerText = messages[Math.floor(Math.random() * messages.length)];
    msgDisplay.classList.add('show');

    confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: parseFloat(el.style.left) / 100, y: 0.8 }
    });

    setTimeout(() => {
        msgDisplay.classList.remove('show');
    }, 1500);

    if (poppedCount >= 5) {
        clearInterval(balloonInterval);
        document.getElementById('next-from-balloons').style.display = 'inline-block';
        
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
    }
}

initBalloons();
