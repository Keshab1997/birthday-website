async function fetchHeroData() {
    console.log('🎯 Hero: Starting fetch...');
    
    if (!window._supabase) {
        console.warn('⚠️ Hero: Supabase not loaded, retrying...');
        setTimeout(fetchHeroData, 500);
        return;
    }
    
    console.log('✅ Hero: Supabase loaded');

    try {
        const { data, error } = await window._supabase
            .from('hero_section')
            .select('*')
            .limit(1)
            .maybeSingle();

        console.log('📦 Hero: Data received:', data);
        console.log('❌ Hero: Error:', error);

        const titleEl = document.getElementById('hero-title');
        const subEl = document.getElementById('hero-subtitle');
        const bgEl = document.getElementById('hero-bg');

        if (data) {
            if(titleEl) titleEl.innerText = data.title;
            if(subEl) subEl.innerText = data.subtitle;
            
            const { data: images } = await window._supabase
                .from('gallery')
                .select('image_url')
                .limit(5);
            
            if (images && images.length > 0) {
                startSlideshow(images.map(img => img.image_url));
            } else if (data.image_url) {
                bgEl.style.backgroundImage = `url('${data.image_url}')`;
            }
            
            console.log('✅ Hero: Data loaded successfully');
        } else {
            if(titleEl) titleEl.innerText = 'Happy Birthday! 🎂';
            if(subEl) subEl.innerText = 'আজকের দিনটি শুধু তোমার জন্য';
            console.log('⚠️ Hero: No data in table, using default');
        }
    } catch (err) {
        console.error('❌ Hero: Fetch error:', err);
        document.getElementById('hero-title').innerText = 'Happy Birthday! 🎂';
    }
}

function createTransitionHeart() {
    const heart = document.createElement('div');
    heart.className = 'transition-heart';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 4) + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 6000);
}

function startSlideshow(images) {
    const bgEl = document.getElementById('hero-bg');
    let currentIndex = 0;
    
    const animations = [
        'fade',
        'slideLeft',
        'slideRight',
        'zoomIn',
        'rotateIn'
    ];
    
    bgEl.style.backgroundImage = `url('${images[0]}')`;
    
    setInterval(() => {
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        
        // Create hearts during transition
        for(let i = 0; i < 5; i++) {
            setTimeout(() => createTransitionHeart(), i * 200);
        }
        
        bgEl.classList.add(randomAnim + '-out');
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            bgEl.style.backgroundImage = `url('${images[currentIndex]}')`;
            bgEl.classList.remove(randomAnim + '-out');
            bgEl.classList.add(randomAnim + '-in');
            
            setTimeout(() => {
                bgEl.classList.remove(randomAnim + '-in');
            }, 1000);
        }, 1000);
    }, 5000);
}

fetchHeroData();
