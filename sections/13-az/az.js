async function loadAZ() {
    const { data } = await window._supabase.from('az_love').select('*').order('letter', { ascending: true });
    const container = document.getElementById('az-container');
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="color:#666;">No A-Z entries yet. Add some in admin panel!</p>';
        return;
    }
    
    container.innerHTML = data.map((item, index) => `
        <div class="az-card" style="animation-delay: ${index * 0.1}s;">
            <div class="az-letter">${item.letter}</div>
            <div class="az-quality">${item.quality}</div>
        </div>
    `).join('');
}

loadAZ();
