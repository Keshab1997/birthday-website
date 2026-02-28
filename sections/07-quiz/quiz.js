let currentQ = 0;
let questions = [];

async function initQuiz() {
    const { data } = await window._supabase.from('quiz_questions').select('*');
    questions = data || [];
    
    if (questions.length === 0) {
        document.getElementById('quiz-container').innerHTML = '<p style="color:white;">No questions yet. Add some in admin panel!</p>';
        return;
    }
    
    document.getElementById('q-total').textContent = questions.length;
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQ];
    document.getElementById('q-num').textContent = currentQ + 1;
    
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <div class="quiz-card fade-in">
            <h3>${q.question}</h3>
            <div class="quiz-options">
                <button onclick="handleAnswer(this, 'a', '${q.correct_option}')">${q.option_a}</button>
                <button onclick="handleAnswer(this, 'b', '${q.correct_option}')">${q.option_b}</button>
                <button onclick="handleAnswer(this, 'c', '${q.correct_option}')">${q.option_c}</button>
            </div>
        </div>
    `;
}

window.handleAnswer = (btn, selected, correct) => {
    const allButtons = document.querySelectorAll('.quiz-options button');
    allButtons.forEach(b => b.style.pointerEvents = 'none');

    if (selected === correct) {
        btn.classList.add('correct');
        setTimeout(() => {
            currentQ++;
            if (currentQ < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1000);
    } else {
        btn.classList.add('wrong');
        setTimeout(() => {
            btn.classList.remove('wrong');
            allButtons.forEach(b => b.style.pointerEvents = 'all');
        }, 1000);
    }
};

function showResult() {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    document.getElementById('quiz-container').innerHTML = `
        <div class="quiz-card fade-in">
            <div class="result-icon">🏆</div>
            <h3>You Know Me Best!</h3>
            <p style="color:#666; margin-bottom:20px;">সবগুলো উত্তর সঠিক হয়েছে। তুমি সত্যিই আমাকে অনেক ভালোবাসো! ❤️</p>
            <button class="next-level-btn" onclick="goToLevel(3)">Continue to Memory Game 🎮</button>
        </div>
    `;
}

initQuiz();
