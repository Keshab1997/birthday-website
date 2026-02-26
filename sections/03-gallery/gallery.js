import { _supabase } from '../../assets/js/supabase-config.js';

async function loadGallery() {
    const { data, error } = await _supabase.from('gallery').select('*').order('created_at', { ascending: false });
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    if (data) {
        data.forEach(item => {
            grid.innerHTML += `
                <div class="gallery-item">
                    <img src="${item.image_url}" alt="${item.caption || 'Memory'}">
                </div>
            `;
        });
    }
}
loadGallery();
