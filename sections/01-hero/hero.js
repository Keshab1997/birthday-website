import { _supabase } from '../../assets/js/supabase-config.js';

async function fetchHeroData() {
    const { data, error } = await _supabase
        .from('hero_section')
        .select('*')
        .limit(1)
        .maybeSingle();

    if (data) {
        const titleEl = document.getElementById('hero-title');
        const subEl = document.getElementById('hero-subtitle');
        const bgEl = document.getElementById('hero-bg');

        if(titleEl) titleEl.innerText = data.title;
        if(subEl) subEl.innerText = data.subtitle;
        if(bgEl && data.image_url) bgEl.style.backgroundImage = `url('${data.image_url}')`;
    } else {
        console.log('No data found in Supabase');
    }

    if (error) console.error('Hero fetch error:', error);
}

fetchHeroData();
