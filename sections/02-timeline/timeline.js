import { _supabase } from '../../assets/js/supabase-config.js';

async function loadTimeline() {
    const { data, error } = await _supabase
        .from('timeline')
        .select('*')
        .order('event_date', { ascending: true });

    const container = document.getElementById('timeline-container');
    container.innerHTML = '';

    if (data) {
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
    }
}

loadTimeline();
