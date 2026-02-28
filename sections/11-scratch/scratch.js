async function initScratch() {
    const { data } = await window._supabase.from('settings').select('value').eq('key', 'scratch_image').maybeSingle();
    const img = document.getElementById('scratch-bg-img');
    
    const imageUrl = data?.value || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800';
    console.log('Scratch Image URL:', imageUrl);
    
    img.src = imageUrl;
    
    img.onload = () => {
        console.log('✅ Scratch image loaded successfully');
        setupCanvas();
    };
    
    img.onerror = () => {
        console.error('❌ Image failed to load. Check the URL.');
        alert('Scratch image load হতে পারছে না! দয়া করে সঠিক Direct Link দিন।');
    };
}

function setupCanvas() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    
    // Dynamic sizing for mobile
    const size = Math.min(window.innerWidth - 40, 400);
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';

    // Silver scratch layer
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = Math.floor(size / 13) + 'px Arial';
    ctx.fillStyle = '#666';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch Here!', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;
    let scratchedPixels = 0;
    const totalPixels = canvas.width * canvas.height;

    function scratch(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
        
        scratchedPixels += 900;
        
        if (scratchedPixels > totalPixels * 0.5) {
            canvas.style.opacity = '0';
            document.getElementById('next-from-scratch').style.display = 'inline-block';
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
        }
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true; });
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); });
}

initScratch();
