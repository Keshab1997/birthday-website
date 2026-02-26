window.openGift = async () => {
    const box = document.getElementById('gift-box');
    box.classList.add('open');
    
    const { data } = await window._supabase.from('settings').select('value').eq('key', 'gift_message').maybeSingle();
    
    setTimeout(() => {
        confetti({
            particleCount: 300,
            spread: 120,
            origin: { y: 0.6 }
        });
        
        document.getElementById('gift-reveal').style.display = 'block';
        document.getElementById('final-msg').innerText = data?.value || 'Your special gift is waiting for you! ❤️';
    }, 1000);
};
