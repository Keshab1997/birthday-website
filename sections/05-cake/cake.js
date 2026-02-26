document.getElementById('blow-btn').addEventListener('click', function() {
    const flame = document.getElementById('flame');
    const wishMsg = document.getElementById('wish-msg');

    if (flame.style.display !== 'none') {
        flame.style.display = 'none';
        wishMsg.style.display = 'block';
        this.innerText = "Happy Birthday! ❤️";

        // Confetti animation
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4081', '#ffeb3b', '#ffffff']
        });
    }
});
