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

    if (data && data.length > 0) {
        container.innerHTML = '';
        data.forEach((item, index) => {
            const sideClass = index % 2 === 0 ? 'left' : 'right';
            
            const timelineHtml = `
                <div class="timeline-item ${sideClass}">
                    <div class="timeline-content">
                        <div class="timeline-date">${new Date(item.event_date).toDateString()}</div>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        ${item.image_url ? `<img src="${item.image_url}" alt="moment">` : ''}
                    </div>
                </div>
            `;
            container.innerHTML += timelineHtml;
        });

        setTimeout(() => {
            const items = document.querySelectorAll('.timeline-item');
            items.forEach(item => item.classList.add('show'));
        }, 100);
        
    } else {
        container.innerHTML = '<p style="color:#666; text-align:center;">No timeline events yet.</p>';
    }
}

loadTimeline();
