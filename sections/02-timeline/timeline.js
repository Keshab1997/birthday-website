async function loadTimeline() {
    if (!window._supabase) {
        setTimeout(loadTimeline, 500);
        return;
    }

    const { data, error } = await window._supabase
        .from('timeline')
        .select('*')
        .order('event_date', { ascending: true });

    const container = document.getElementById('timeline-container');
    
    if (!container) return;
    
    container.innerHTML = '<p style="color:#666;">Loading timeline...</p>';

    if (data && data.length > 0) {
        container.innerHTML = '';
        data.forEach(item => {
            container.innerHTML += `
                <div class="timeline-item">
                    <div class="timeline-date">${new Date(item.event_date).toDateString()}</div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    ${item.image_url ? `<img src="${item.image_url}" alt="moment">` : ''}
                </div>
            `;
        });
    } else {
        container.innerHTML = '<p style="color:#666;">No timeline events yet. Add some from admin panel!</p>';
    }
}

loadTimeline();
