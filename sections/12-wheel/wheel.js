let options = [];
let currentRotation = 0;
let isSpinning = false;

async function initWheel() {
    const { data } = await window._supabase.from('wheel_options').select('option_text');
    options = data?.map(d => d.option_text) || ['Dinner Date', 'Movie Night', 'Shopping', 'Long Drive'];
    
    drawWheel();
}

function drawWheel() {
    const canvas = document.getElementById('wheel-canvas');
    const ctx = canvas.getContext('2d');
    
    // Dynamic sizing for mobile
    const size = Math.min(window.innerWidth - 40, 400);
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;
    
    const colors = ['#ff4081', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#ff9800'];
    const sliceAngle = (2 * Math.PI) / options.length;
    
    options.forEach((option, i) => {
        const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.stroke();
        
        // Text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = `bold ${Math.floor(size / 25)}px Arial`;
        ctx.fillText(option, radius / 2, 5);
        ctx.restore();
    });
}

window.spinWheel = function() {
    if (isSpinning) return;
    isSpinning = true;
    
    const btn = document.getElementById('spin-btn');
    btn.disabled = true;
    
    const canvas = document.getElementById('wheel-canvas');
    const spins = 5 + Math.random() * 5;
    const extraDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + extraDegrees;
    
    currentRotation += totalRotation;
    canvas.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(() => {
        const normalizedRotation = currentRotation % 360;
        const sliceAngle = 360 / options.length;
        const winningIndex = Math.floor((360 - normalizedRotation) / sliceAngle) % options.length;
        
        document.getElementById('wheel-result').innerText = `🎉 You won: ${options[winningIndex]}!`;
        document.getElementById('next-from-wheel').style.display = 'inline-block';
        
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
        
        isSpinning = false;
    }, 5000);
};

initWheel();
