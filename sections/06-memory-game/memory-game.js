const emojis = ['❤️', '💕', '🌹', '💝', '🎂', '🎁'];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function createBoard() {
    console.log('🎮 Creating memory game board...');
    const grid = document.getElementById('memory-grid');
    
    if (!grid) {
        console.error('❌ memory-grid element not found!');
        return;
    }
    
    grid.innerHTML = '<p style="color:white;">Loading Cards...</p>';
    
    let gameCards;
    
    try {
        console.log('📡 Fetching images from Supabase...');
        const { data: images, error } = await window._supabase.from('memory_game').select('image_url').limit(6);
        
        if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
        }
        
        console.log('📦 Fetched data:', images);
        
        if (images && images.length >= 6) {
            gameCards = [...images, ...images];
            console.log('✅ Using', images.length, 'uploaded images');
        } else {
            console.warn('⚠️ Only found', images?.length || 0, 'images, need 6. Using emojis.');
            gameCards = [...emojis, ...emojis].map(emoji => ({ emoji }));
        }
    } catch (error) {
        console.error('❌ Error loading images:', error);
        console.log('🔄 Falling back to emojis');
        gameCards = [...emojis, ...emojis].map(emoji => ({ emoji }));
    }
    
    const shuffled = shuffle(gameCards);
    console.log('🎲 Shuffled', shuffled.length, 'cards');
    
    grid.innerHTML = '';
    
    shuffled.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.id = item.image_url || item.emoji;
        card.dataset.index = index;
        
        const content = item.image_url 
            ? `<img src="${item.image_url}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;" onerror="this.parentElement.innerHTML='❌'">` 
            : `<span style="font-size:2.5rem;">${item.emoji}</span>`;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${content}</div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
    
    console.log('✅ Memory game board created with', shuffled.length, 'cards');
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.id === card2.dataset.id) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('matches').textContent = `${matchedPairs}/6`;
        flippedCards = [];
        
        if (matchedPairs === 6) {
            setTimeout(() => {
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 }
                });
                document.getElementById('next-level-btn').style.display = 'block';
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

createBoard();
