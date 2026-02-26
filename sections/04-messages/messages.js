import { _supabase } from '../../assets/js/supabase-config.js';

async function loadMessages() {
    const { data, error } = await _supabase.from('messages').select('*');
    const container = document.getElementById('messages-container');
    
    if (error) {
        console.error('Error fetching messages:', error);
        return;
    }

    if (data && data.length > 0) {
        container.innerHTML = '';
        data.forEach(item => {
            container.innerHTML += `
                <div class="message-card">
                    <p>"${item.message}"</p>
                    <small>- ${item.author || 'Your Husband'}</small>
                </div>
            `;
        });
    } else {
        container.innerHTML = '<p style="color: var(--dark-text);">No messages added yet. Go to Admin Panel!</p>';
    }
}
loadMessages();
