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
            if(bgEl && data.image_url) bgEl.style.backgroundImage = `url('${data.image_url}')`;
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

fetchHeroData();
