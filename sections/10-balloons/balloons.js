let messages = [];
let poppedCount = 0;
let balloonInterval;

async function initBalloons() {
    const { data } = await window._supabase.from('balloon_messages').select('message');
    messages = data?.map(d => d.message) || ['I Love You! ❤️', 'You are Beautiful! ✨'];
    
    // প্রতি 2 সেকেন্ডে একটি বেলুন তৈরি
    balloonInterval = setInterval(createBalloon, 2000);
    
    // শুরুতেই 3টি বেলুন তৈরি করো
    createBalloon();
    setTimeout(createBalloon, 500);
    setTimeout(createBalloon, 1000);
}

function createBalloon() {
    const container = document.getElementById('balloon-container');
    if (!container) return;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    // র্যান্ডম কালার
    const colors = ['#ff4081', '#ffeb3b', '#3f51b5', '#4caf50', '#ff9800', '#e91e63', '#9c27b0'];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 85 + 5 + '%';
    balloon.style.animationDuration = (Math.random() * 3 + 5) + 's';
    balloon.innerHTML = '🎈';

    balloon.onclick = () => popBalloon(balloon);
    container.appendChild(balloon);

    // 10 সেকেন্ড পর রিমুভ
    setTimeout(() => balloon.remove(), 10000);
}

function popBalloon(el) {
    el.style.transform = 'scale(0)';
    el.style.transition = 'transform 0.3s';
    
    setTimeout(() => el.remove(), 300);
    
    poppedCount++;
    document.getElementById('pop-count').textContent = poppedCount;

    // র্যান্ডম মেসেজ দেখানো
    const msgDisplay = document.getElementById('pop-message-display');
    msgDisplay.innerText = messages[Math.floor(Math.random() * messages.length)];
    msgDisplay.classList.add('show');

    // Confetti effect
    confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: parseFloat(el.style.left) / 100, y: 0.8 }
    });

    setTimeout(() => {
        msgDisplay.classList.remove('show');
    }, 1500);

    // 5টি বেলুন ফাটালে
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
