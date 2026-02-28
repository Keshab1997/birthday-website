let messages = [];
let poppedCount = 0;
let balloonInterval;

const popSound = new Audio('assets/sounds/balloon-pop.mp3');

async function initBalloons() {
    const { data } = await window._supabase.from('balloon_messages').select('message');
    messages = data?.map(d => d.message) || ['I Love You! ❤️', 'You are Beautiful! ✨'];
    
    balloonInterval = setInterval(createBalloon, 1000); // 1 second - very fast
    
    // Start with many balloons immediately
    createBalloon();
    setTimeout(createBalloon, 200);
    setTimeout(createBalloon, 400);
    setTimeout(createBalloon, 600);
    setTimeout(createBalloon, 800);
}

function createBalloon() {
    const container = document.getElementById('balloon-container');
    if (!container) return;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const knot = document.createElement('div');
    knot.className = 'balloon-knot';
    
    const colors = [
        '#ff4d4d', '#ff9f43', '#feca57', '#48dbfb', 
        '#ff9ff3', '#54a0ff', '#5f27cd', '#ff6b6b'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = color;
    knot.style.borderBottomColor = color;
    
    balloon.appendChild(knot);
    balloon.style.left = Math.random() * 85 + 5 + '%';
    balloon.style.animationDuration = (Math.random() * 5 + 10) + 's'; // 10-15 seconds (slow)

    balloon.onclick = () => popBalloon(balloon);
    container.appendChild(balloon);

    setTimeout(() => { if(balloon) balloon.remove(); }, 20000); // 20 seconds lifetime - longer
}

function popBalloon(el) {
    if (el.classList.contains('popping')) return;
    
    popSound.currentTime = 0;
    popSound.play().catch(() => {});
    
    el.classList.add('popping');
    
    poppedCount++;
    document.getElementById('pop-count').textContent = poppedCount;

    const msgDisplay = document.getElementById('pop-message-display');
    msgDisplay.innerText = messages[Math.floor(Math.random() * messages.length)];
    msgDisplay.classList.add('show');

    confetti({
        particleCount: 60,
        spread: 70,
        origin: { x: el.getBoundingClientRect().left / window.innerWidth, y: el.getBoundingClientRect().top / window.innerHeight }
    });

    setTimeout(() => {
        msgDisplay.classList.remove('show');
        el.remove();
    }, 1500);

    if (poppedCount >= 5) {
        clearInterval(balloonInterval);
        document.getElementById('next-from-balloons').style.display = 'inline-block';
    }
}

initBalloons();
