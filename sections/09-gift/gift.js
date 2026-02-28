window.openGift = async () => {
    const container = document.getElementById('gift-container');
    const header = document.querySelector('.gift-header');
    
    if (container.classList.contains('open')) return;
    container.classList.add('open');
    
    const { data } = await window._supabase.from('settings').select('value').eq('key', 'gift_message').maybeSingle();
    
    setTimeout(() => {
        container.style.display = 'none';
        header.style.display = 'none';
        
        const reveal = document.getElementById('gift-reveal');
        const msgCard = document.querySelector('.gift-message');
        const msgText = document.getElementById('final-msg');
        
        reveal.style.display = 'block';
        msgCard.style.display = 'block';
        msgText.innerText = data?.value || 'আলমারির ওপরের ড্রয়ারে তোমার আসল গিফটটা আছে! ❤️';
        
        confetti({
            particleCount: 500,
            spread: 160,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#ffd700', '#ff4757', '#ff75a0']
        });
    }, 700);
};
