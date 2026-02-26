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
            <button onclick="checkAnswer('a', '${q.correct_option}')">${q.option_a}</button>
            <button onclick="checkAnswer('b', '${q.correct_option}')">${q.option_b}</button>
            <button onclick="checkAnswer('c', '${q.correct_option}')">${q.option_c}</button>
        </div>
    `;
}

window.checkAnswer = (selected, correct) => {
    if (selected === correct) {
        currentQ++;
        if (currentQ < questions.length) {
            showQuestion();
        } else {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
            document.getElementById('quiz-container').innerHTML = `
                <div class="quiz-card fade-in">
                    <h3>🎉 Perfect Score!</h3>
                    <p>You know us so well! ❤️</p>
                    <button onclick="unlockMemoryGame()">Continue to Memory Game</button>
                </div>
            `;
        }
    } else {
        alert('Oops! Wrong answer. Try again, Love! 💕');
    }
};

initQuiz();
