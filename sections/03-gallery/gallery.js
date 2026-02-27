async function loadGallery() {
    if (!window._supabase) {
        setTimeout(loadGallery, 500);
        return;
    }

    const { data, error } = await window._supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
    
    const grid = document.getElementById('gallery-grid');
    
    if (!grid) return;
    
    grid.innerHTML = '<p style="color:white;">Loading gallery...</p>';

    if (data && data.length > 0) {
        grid.innerHTML = '';
        data.forEach(item => {
            grid.innerHTML += `
                <div class="gallery-item">
                    <img src="${item.image_url}" alt="${item.caption || 'Memory'}" loading="lazy">
                    ${item.caption ? `<p class="caption">${item.caption}</p>` : ''}
                </div>
            `;
        });
    } else {
        grid.innerHTML = '<p style="color:white;">No photos yet. Add some from admin panel!</p>';
    }
}

loadGallery();
