async function loadBucketList() {
    const { data } = await window._supabase.from('bucket_list').select('*').order('created_at', { ascending: true });
    const list = document.getElementById('bucket-items');
    
    if (!data || data.length === 0) {
        list.innerHTML = '<p style="color:white;">No bucket list items yet!</p>';
        return;
    }
    
    list.innerHTML = data.map((item, index) => `
        <div class="bucket-item" style="transition-delay: ${index * 0.1}s;">
            <input type="checkbox" ${item.is_completed ? 'checked' : ''} disabled>
            <span>${item.task_name}</span>
        </div>
    `).join('');

    setTimeout(() => {
        const items = document.querySelectorAll('.bucket-item');
        items.forEach(item => item.classList.add('reveal'));
    }, 100);
}

loadBucketList();
