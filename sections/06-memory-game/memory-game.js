const emojis = ['❤️', '💕', '🌹', '💝', '🎂', '🎁'];
const cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function createBoard() {
    console.log('Creating memory game board...');
    const grid = document.getElementById('memory-grid');
    
    // Try to load images from Supabase
    let gameCards;
    
    try {
        console.log('Fetching images from Supabase...');
        const { data: images, error } = await window._supabase.from('memory_game').select('image_url').limit(6);
        
        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }
        
        console.log('Fetched images:', images);
        
        if (images && images.length >= 6) {
            // Use uploaded images
            gameCards = [...images, ...images];
            console.log('✅ Using uploaded images:', images.length);
        } else {
            // Fallback to emojis
            console.warn('⚠️ Using emojis, only found:', images?.length || 0, 'images (need 6)');
            gameCards = cards.map(emoji => ({ emoji }));
        }
    } catch (error) {
        console.error('❌ Error loading images:', error);
        console.log('Falling back to emojis');
        gameCards = cards.map(emoji => ({ emoji }));
    }
    
    const shuffled = shuffle(gameCards);
    console.log('Game cards prepared:', shuffled.length);
    const shuffled = shuffle(gameCards);
    
    shuffled.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.id = item.image_url || item.emoji;
        card.dataset.index = index;
        
        const content = item.image_url 
            ? `<img src="${item.image_url}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;" onerror="this.parentElement.innerHTML='❌'">` 
            : item.emoji;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${content}</div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
    
    console.log('Memory game board created with', shuffled.length, 'cards');
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

function goToNextLevel() {
    if (window.goToNextLevel) {
        window.goToNextLevel();
    }
}

createBoard();
