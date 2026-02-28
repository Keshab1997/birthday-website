document.getElementById('blow-btn').addEventListener('click', function() {
    const flame = document.getElementById('flame');
    const candle = document.getElementById('candle-group');
    const knife = document.getElementById('knife');
    const cakeLeft = document.getElementById('cake-left');
    const cakeRight = document.getElementById('cake-right');
    const wishMsg = document.getElementById('wish-msg');
    const title = document.getElementById('cake-title');
    const btn = this;

    // ১. মোমবাতি নেভানো
    flame.style.display = 'none';
    title.innerText = "Cutting the Cake... 🔪";

    // ২. ছুরি আসা (০.৫ সেকেন্ড পর)
    setTimeout(() => {
        knife.classList.add('active');
        
        // ৩. কেক কাটা (০.৬ সেকেন্ড পর)
        setTimeout(() => {
            cakeLeft.classList.add('cut');
            cakeRight.classList.add('cut');
            candle.style.opacity = '0';
            
            // ৪. সেলিব্রেশন (০.৫ সেকেন্ড পর)
            setTimeout(() => {
                knife.style.display = 'none';
                wishMsg.style.display = 'block';
                btn.style.display = 'none';
                title.style.display = 'none';

                // কনফেটি
                confetti({
                    particleCount: 500,
                    spread: 160,
                    origin: { y: 0.6 },
                    colors: ['#d81b60', '#fce4ec', '#ffd700', '#ffffff']
                });

                setTimeout(() => {
                    confetti({
                        particleCount: 200,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 }
                    });
                    confetti({
                        particleCount: 200,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 }
                    });
                }, 500);
            }, 500);
        }, 600);
    }, 500);
});
