async function loadBucketList() {
    const { data } = await window._supabase.from('bucket_list').select('*').order('created_at', { ascending: true });
    const list = document.getElementById('bucket-items');
    
    if (!data || data.length === 0) {
        list.innerHTML = '<p style="color:white;">No bucket list items yet!</p>';
        return;
    }
    
    list.innerHTML = data.map(item => `
        <div class="bucket-item">
            <input type="checkbox" ${item.is_completed ? 'checked' : ''} disabled>
            <span>${item.task_name}</span>
        </div>
    `).join('');
}

loadBucketList();
