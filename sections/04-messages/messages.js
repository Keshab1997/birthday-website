async function loadMessages() {
    const { data, error } = await window._supabase.from('messages').select('*');
    const container = document.getElementById('messages-container');
    
    if (error) {
        console.error('Error fetching messages:', error);
        return;
    }

    if (data && data.length > 0) {
        container.innerHTML = '';
        data.forEach((item, index) => {
            container.innerHTML += `
                <div class="message-card" style="animation-delay: ${index * 0.2}s;">
                    <p>"${item.message}"</p>
                    <small>- Your Husband</small>
                </div>
            `;
        });
    } else {
        container.innerHTML = '<p style="color: white;">No messages found!</p>';
    }
}
loadMessages();
