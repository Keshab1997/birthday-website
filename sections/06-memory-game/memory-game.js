const emojis = ['❤️', '💕', '🌹', '💝', '🎂', '🎁'];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

// Sound effects
const flipSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDhkj4KFV+16+qnVRQLRp/g8r5sIQUrgc7y2Yk2CBhkuezooVARDEyl4fG5ZRwFNo3V7859KQUofsz');
const matchSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDhkj4KFV+16+qnVRQLRp/g8r5sIQUrgc7y2Yk2CBhkuezooVARDEyl4fG5ZRwFNo3V7859KQUofsz');
const winSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDhkj4KFV+16+qnVRQLRp/g8r5sIQUrgc7y2Yk2CBhkuezooVARDEyl4fG5ZRwFNo3V7859KQUofsz');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function createBoard() {
    const grid = document.getElementById('memory-grid');
    
    if (!grid) {
        console.error('❌ memory-grid element not found!');
        return;
    }
    
    grid.innerHTML = '<p style="color:white;">Loading Cards...</p>';
    
    if (!window._supabase) {
        setTimeout(createBoard, 500);
        return;
    }
    
    let gameCards;
    
    try {
        const { data: images, error } = await window._supabase.from('memory_game').select('image_url').limit(6);
        
        if (error) throw error;
        
        const uniqueImages = images ? [...new Set(images.map(img => img.image_url))].map(url => ({ image_url: url })) : [];
        
        if (uniqueImages.length >= 6) {
            gameCards = [...uniqueImages.slice(0, 6), ...uniqueImages.slice(0, 6)];
        } else {
            gameCards = [...emojis, ...emojis].map(emoji => ({ emoji }));
        }
    } catch (error) {
        gameCards = [...emojis, ...emojis].map(emoji => ({ emoji }));
    }
    
    const shuffled = shuffle(gameCards);
    grid.innerHTML = '';
    
    shuffled.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.id = item.image_url || item.emoji;
        card.dataset.index = index;
        
        const content = item.image_url 
            ? `<img src="${item.image_url}" loading="lazy" alt="Memory Card">` 
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
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (this.classList.contains('flipped')) return;
    if (this.classList.contains('matched')) return;
    
    flipSound.play().catch(() => {});
    
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
        matchSound.play().catch(() => {});
        
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        setTimeout(() => {
            card1.style.animation = 'zoomOut 0.5s ease-out';
            card2.style.animation = 'zoomOut 0.5s ease-out';
            
            setTimeout(() => {
                card1.style.visibility = 'hidden';
                card2.style.visibility = 'hidden';
            }, 500);
        }, 300);
        
        matchedPairs++;
        document.getElementById('matches').textContent = `${matchedPairs}/6`;
        flippedCards = [];
        
        if (matchedPairs === 6) {
            setTimeout(() => {
                winSound.play().catch(() => {});
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 }
                });
                document.getElementById('next-level-btn').style.display = 'block';
            }, 800);
        }
    } else {
        setTimeout(() => {
            card1.classList.add('shake');
            card2.classList.add('shake');
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'shake');
                card2.classList.remove('flipped', 'shake');
                flippedCards = [];
            }, 500);
        }, 600);
    }
}

createBoard();
