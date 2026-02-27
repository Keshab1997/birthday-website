import { _supabase } from '../assets/js/supabase-config.js';

const IMGBB_API_KEY = '411b601ac0d37717aaab7fa6ebc6aca5';

// --- Common Delete Function ---
window.deleteItem = async (table, id) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    
    const { error } = await _supabase.from(table).delete().eq('id', id);
    if (error) {
        alert('Error deleting: ' + error.message);
    } else {
        alert('Deleted successfully!');
        // Refresh specific list based on table
        if (table === 'memory_game') loadMemoryAdmin();
        if (table === 'timeline') loadTimelineAdmin();
        if (table === 'gallery') loadGalleryAdmin();
        if (table === 'messages') loadMessagesAdmin();
        if (table === 'quiz_questions') loadQuizAdmin();
        if (table === 'bucket_list') loadBucketAdmin();
        if (table === 'balloon_messages') loadBalloonAdmin();
        if (table === 'wheel_options') loadWheelAdmin();
    }
};

// --- Tab Switching ---
window.showTab = (tabName) => {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById('tab-' + tabName).style.display = 'block';
};

// --- Session Check ---
window.addEventListener('load', async () => {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
    }
});

// --- Login ---
const loginBtn = document.getElementById('login-btn');
if(loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else location.reload();
    });
}

window.logout = async () => {
    await _supabase.auth.signOut();
    location.reload();
};

// --- ImgBB Upload ---
async function uploadImage(file) {
    if (!file) return null;
    console.log('Starting ImgBB upload for:', file.name);
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST', 
            body: formData
        });
        const json = await res.json();
        console.log('ImgBB response:', json);
        
        if (json.success) {
            console.log('Upload successful, URL:', json.data.url);
            return json.data.url;
        } else {
            console.error('ImgBB upload failed:', json);
            return null;
        }
    } catch (error) {
        console.error('ImgBB upload error:', error);
        return null;
    }
}

// --- Save Hero ---
window.saveHero = async () => {
    const title = document.getElementById('hero-title').value;
    const sub = document.getElementById('hero-sub').value;
    const file = document.getElementById('hero-img').files[0];
    
    let data = { title, subtitle: sub };
    const url = await uploadImage(file);
    if (url) data.image_url = url;

    const { error } = await _supabase.from('hero_section').upsert([{ id: 1, ...data }]);
    if (!error) {
        alert('Hero Updated!');
        refreshAllLists();
    } else alert('Error: ' + error.message);
};

// --- Save Timeline ---
window.saveTimeline = async () => {
    const date = document.getElementById('time-date').value;
    const title = document.getElementById('time-title').value;
    const desc = document.getElementById('time-desc').value;
    const file = document.getElementById('time-img').files[0];

    const url = await uploadImage(file);
    const { error } = await _supabase.from('timeline').insert([{
        event_date: date, 
        title, 
        description: desc, 
        image_url: url
    }]);
    if (!error) { 
        alert('Event Added!'); 
        document.getElementById('time-date').value = '';
        document.getElementById('time-title').value = '';
        document.getElementById('time-desc').value = '';
        document.getElementById('time-img').value = '';
        refreshAllLists();
    }
};

// --- Save Gallery ---
window.saveGallery = async () => {
    const file = document.getElementById('gallery-img').files[0];
    if (!file) return alert('Select a file first!');

    const url = await uploadImage(file);
    const { error } = await _supabase.from('gallery').insert([{ image_url: url }]);
    if (!error) {
        alert('Photo Added!');
        document.getElementById('gallery-img').value = '';
        refreshAllLists();
    }
};

// --- Save Message ---
window.saveMessage = async () => {
    const msg = document.getElementById('love-msg').value;
    if (!msg) return alert('Write a message first!');
    
    const { error } = await _supabase.from('messages').insert([{ message: msg }]);
    if (!error) {
        alert('Message Added!');
        document.getElementById('love-msg').value = '';
        refreshAllLists();
    }
};

// --- Save Settings ---
window.saveSettings = async () => {
    const code = document.getElementById('secret-code').value;
    if (code) {
        const { error } = await _supabase.from('settings').upsert([{ key: 'secret_code', value: code }]);
        if (!error) {
            alert('Secret code updated to: ' + code);
        } else {
            alert('Error: ' + error.message);
        }
    }
};

// --- Save Music Settings ---
window.saveMusicSettings = async () => {
    const updates = [];
    for (let i = 0; i <= 10; i++) {
        const input = document.getElementById(`music-${i}`);
        if (input && input.value) {
            updates.push({ key: `music_level_${i}`, value: input.value });
        }
    }
    
    if (updates.length > 0) {
        const { error } = await _supabase.from('settings').upsert(updates);
        if (!error) {
            alert('Music settings saved successfully! 🎵');
        } else {
            alert('Error: ' + error.message);
        }
    } else {
        alert('Please enter at least one music URL');
    }
};

// --- Save Memory Game Image ---
window.saveMemoryImg = async () => {
    const file = document.getElementById('memory-img').files[0];
    if (!file) return alert('Select an image first!');

    console.log('Uploading image to ImgBB...');
    const url = await uploadImage(file);
    console.log('Image uploaded, URL:', url);
    
    const { error } = await _supabase.from('memory_game').insert([{ image_url: url }]);
    if (!error) {
        console.log('Image saved to Supabase successfully');
        alert('Image added to game!');
        document.getElementById('memory-img').value = '';
        refreshAllLists();
    } else {
        console.error('Error saving to Supabase:', error);
        alert('Error: ' + error.message);
    }
};

// --- Save Quiz Question ---
window.saveQuiz = async () => {
    const data = {
        question: document.getElementById('q-text').value,
        option_a: document.getElementById('q-a').value,
        option_b: document.getElementById('q-b').value,
        option_c: document.getElementById('q-c').value,
        correct_option: document.getElementById('q-correct').value
    };
    
    if (!data.question || !data.option_a || !data.option_b || !data.option_c) {
        return alert('Please fill all fields!');
    }
    
    const { error } = await _supabase.from('quiz_questions').insert([data]);
    if (!error) {
        alert('Question Added!');
        document.getElementById('q-text').value = '';
        document.getElementById('q-a').value = '';
        document.getElementById('q-b').value = '';
        document.getElementById('q-c').value = '';
        refreshAllLists();
    } else {
        alert('Error: ' + error.message);
    }
};

// --- Save Bucket List Item ---
window.saveBucket = async () => {
    const task = document.getElementById('bucket-task').value;
    if (!task) return alert('Enter a task first!');
    
    const { error } = await _supabase.from('bucket_list').insert([{ task_name: task }]);
    if (!error) {
        alert('Added to Bucket List!');
        document.getElementById('bucket-task').value = '';
        refreshAllLists();
    } else {
        alert('Error: ' + error.message);
    }
};

// --- Save Gift Message ---
window.saveGiftMsg = async () => {
    const msg = document.getElementById('gift-msg').value;
    if (!msg) return alert('Enter a message first!');
    
    const { error } = await _supabase.from('settings').upsert([{ key: 'gift_message', value: msg }]);
    if (!error) {
        alert('Gift message updated!');
    } else {
        alert('Error: ' + error.message);
    }
};

// --- Save Balloon Message ---
window.saveBalloonMsg = async () => {
    const msg = document.getElementById('b-msg').value;
    if (!msg) return alert('Enter a message first!');
    
    const { error } = await _supabase.from('balloon_messages').insert([{ message: msg }]);
    if (!error) {
        alert('Balloon message added!');
        document.getElementById('b-msg').value = '';
        refreshAllLists();
    } else {
        alert('Error: ' + error.message);
    }
};

// --- Save Scratch Card Image ---
window.saveScratchImg = async () => {
    const url = document.getElementById('scratch-img-url').value;
    if (!url) return alert('Enter image URL first!');
    
    const { error } = await _supabase.from('settings').upsert([{ key: 'scratch_image', value: url }]);
    if (!error) {
        alert('Scratch card image updated!');
    } else {
        alert('Error: ' + error.message);
    }
};

// --- Save Wheel Option ---
window.saveWheelOption = async () => {
    const option = document.getElementById('wheel-option').value;
    if (!option) return alert('Enter an option first!');
    
    const { error } = await _supabase.from('wheel_options').insert([{ option_text: option }]);
    if (!error) {
        alert('Wheel option added!');
        document.getElementById('wheel-option').value = '';
        refreshAllLists();
    } else {
        alert('Error: ' + error.message);
    }
};

// --- Save A-Z Entry ---
window.saveAZ = async () => {
    const letter = document.getElementById('az-letter').value;
    const quality = document.getElementById('az-quality').value;
    if (!quality) return alert('Enter a quality first!');
    
    const { error } = await _supabase.from('az_love').upsert([{ letter, quality }]);
    if (!error) {
        alert('A-Z entry saved!');
        document.getElementById('az-quality').value = '';
        refreshAllLists();
    } else {
        alert('Error: ' + error.message);
    }
};

// --- Load Memory Game Images ---
async function loadMemoryAdmin() {
    console.log('Loading memory game images...');
    const { data, error } = await _supabase.from('memory_game').select('*');
    console.log('Memory game data:', data?.length || 0, 'images');
    if (error) console.error('Error loading memory images:', error);
    
    const list = document.getElementById('memory-list');
    if (data && list) {
        list.innerHTML = data.map(img => `
            <div class="admin-item">
                <img src="${img.image_url}" style="width:60px; height:60px; object-fit:cover; border-radius:5px;">
                <button class="del-btn" onclick="deleteItem('memory_game', ${img.id})">Delete</button>
            </div>
        `).join('');
    }
}

// --- Load Music Settings ---
async function loadMusicAdmin() {
    const { data } = await _supabase.from('settings').select('*').like('key', 'music_level_%');
    if (data) {
        data.forEach(item => {
            const levelNum = item.key.split('_')[2];
            const input = document.getElementById(`music-${levelNum}`);
            if (input) input.value = item.value || '';
        });
    }
}

// --- Load Settings ---
async function loadSettingsAdmin() {
    const { data } = await _supabase.from('settings').select('value').eq('key', 'secret_code').maybeSingle();
    if (data) {
        document.getElementById('secret-code').value = data.value || '1205';
    }
}

// --- Load Quiz Questions ---
async function loadQuizAdmin() {
    const { data } = await _supabase.from('quiz_questions').select('*');
    const list = document.getElementById('quiz-list');
    if (data && list) {
        list.innerHTML = data.map(item => `
            <div class="admin-item">
                <span style="flex:1; font-size:13px;">${item.question.substring(0, 30)}...</span>
                <button class="del-btn" onclick="deleteItem('quiz_questions', ${item.id})">Delete</button>
            </div>
        `).join('');
    }
}

// --- Load Bucket List ---
async function loadBucketAdmin() {
    const { data } = await _supabase.from('bucket_list').select('*');
    const list = document.getElementById('bucket-list');
    if (data && list) {
        list.innerHTML = data.map(item => `
            <div class="admin-item">
                <span style="flex:1;">${item.task_name}</span>
                <button class="del-btn" onclick="deleteItem('bucket_list', ${item.id})">Delete</button>
            </div>
        `).join('');
    }
}

// --- Load Gift Message ---
async function loadGiftAdmin() {
    const { data } = await _supabase.from('settings').select('value').eq('key', 'gift_message').maybeSingle();
    if (data) {
        document.getElementById('gift-msg').value = data.value || '';
    }
}

// --- Load Balloon Messages ---
async function loadBalloonAdmin() {
    const { data } = await _supabase.from('balloon_messages').select('*');
    const list = document.getElementById('balloon-msg-list');
    if (data && list) {
        list.innerHTML = data.map(item => `
            <div class="admin-item">
                <span style="flex:1;">${item.message}</span>
                <button class="del-btn" onclick="deleteItem('balloon_messages', ${item.id})">Delete</button>
            </div>
        `).join('');
    }
}

// --- Load Scratch Card Settings ---
async function loadScratchAdmin() {
    const { data } = await _supabase.from('settings').select('value').eq('key', 'scratch_image').maybeSingle();
    if (data) {
        document.getElementById('scratch-img-url').value = data.value || '';
    }
}

// --- Load Wheel Options ---
async function loadWheelAdmin() {
    const { data } = await _supabase.from('wheel_options').select('*');
    const list = document.getElementById('wheel-list');
    if (data && list) {
        list.innerHTML = data.map(item => `
            <div class="admin-item">
                <span style="flex:1;">${item.option_text}</span>
                <button class="del-btn" onclick="deleteItem('wheel_options', ${item.id})">Delete</button>
            </div>
        `).join('');
    }
}

// --- Load A-Z Entries ---
async function loadAZAdmin() {
    const { data } = await _supabase.from('az_love').select('*').order('letter', { ascending: true });
    const list = document.getElementById('az-list');
    if (data && list) {
        list.innerHTML = data.map(item => `
            <div class="admin-item">
                <span style="flex:1;"><strong>${item.letter}</strong> - ${item.quality}</span>
            </div>
        `).join('');
    }
}

// --- Delete Memory Image ---
window.deleteMemoryImg = async (id) => {
    await deleteItem('memory_game', id);
};

// Load memory images when tab is opened
window.addEventListener('load', () => {
    setTimeout(() => {
        if (document.getElementById('tab-memory')) {
            loadMemoryAdmin();
        }
    }, 1000);
});

// --- Load Data Functions ---

// 1. Load Hero Data
async function loadHeroAdmin() {
    const { data } = await _supabase.from('hero_section').select('*').maybeSingle();
    const container = document.getElementById('hero-current');
    if (data && container) {
        container.innerHTML = `
            <div class="preview-card">
                <img src="${data.image_url}" style="width:150px; border-radius:8px;">
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Subtitle:</strong> ${data.subtitle}</p>
            </div>
        `;
    }
}

// 2. Load Timeline Data
async function loadTimelineAdmin() {
    const { data } = await _supabase.from('timeline').select('*').order('event_date', { ascending: false });
    const list = document.getElementById('timeline-list');
    if (data && list) {
        list.innerHTML = data.map(item => `
            <div class="admin-item">
                ${item.image_url ? `<img src="${item.image_url}" style="width:60px; height:60px; object-fit:cover; border-radius:5px;">` : ''}
                <span style="flex:1;">${item.title} (${item.event_date})</span>
                <button class="del-btn" onclick="deleteItem('timeline', ${item.id})">Delete</button>
            </div>
        `).join('');
    }
}

// 3. Load Gallery Data
async function loadGalleryAdmin() {
    const { data } = await _supabase.from('gallery').select('*').order('created_at', { ascending: false });
    const list = document.getElementById('gallery-list');
    if (data && list) {
        list.innerHTML = data.map(item => `
            <div class="admin-item">
                <img src="${item.image_url}" style="width:60px; height:60px; object-fit:cover; border-radius:5px;">
                <button class="del-btn" onclick="deleteItem('gallery', ${item.id})">Delete</button>
            </div>
        `).join('');
    }
}

// 4. Load Messages Data
async function loadMessagesAdmin() {
    console.log('Loading messages...');
    const { data } = await _supabase.from('messages').select('*').order('created_at', { ascending: false });
    console.log('Messages loaded:', data?.length || 0);
    const list = document.getElementById('messages-list');
    if (data && list) {
        list.innerHTML = data.map(item => `
            <div class="admin-item">
                <span style="flex:1;">${item.message.substring(0, 50)}...</span>
                <button class="del-btn" onclick="deleteItem('messages', ${item.id})">Delete</button>
            </div>
        `).join('');
    }
}

// Refresh All Lists
function refreshAllLists() {
    console.log('Refreshing all admin lists...');
    loadHeroAdmin();
    loadQuizAdmin();
    loadTimelineAdmin();
    loadGalleryAdmin();
    loadBalloonAdmin();
    loadScratchAdmin();
    loadWheelAdmin();
    loadAZAdmin();
    loadBucketAdmin();
    loadMessagesAdmin();
    loadMemoryAdmin();
    loadGiftAdmin();
    loadMusicAdmin();
    loadSettingsAdmin();
}

// Load all data on page load
window.addEventListener('load', () => {
    console.log('Admin panel loaded, fetching data...');
    setTimeout(refreshAllLists, 1000);
});
