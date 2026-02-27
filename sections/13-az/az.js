async function loadAZ() {
    if (!window._supabase) {
        setTimeout(loadAZ, 500);
        return;
    }

    const container = document.getElementById('az-container');
    
    if (!container) return;
    
    container.innerHTML = '<p style="color:#666;">Loading...</p>';

    const { data, error } = await window._supabase
        .from('az_love')
        .select('*')
        .order('letter', { ascending: true });
    
    if (error) {
        console.error('A-Z error:', error);
    }
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="color:#666;">No A-Z entries yet. Add some in admin panel!</p>';
        return;
    }
    
    container.innerHTML = data.map((item, index) => `
        <div class="az-card" style="animation-delay: ${index * 0.1}s;">
            <div class="az-letter">${item.letter}</div>
            <div class="az-word">${item.word}</div>
            <div class="az-sentence">${item.sentence}</div>
        </div>
    `).join('');
}

loadAZ();
