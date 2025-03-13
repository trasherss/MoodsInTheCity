const questions = [
    "Seberapa sering kamu merasa cemas atau khawatir berlebihan? 😟",
    "Seberapa sering kamu merasa kesulitan tidur atau tidur berlebihan? 😴",
    "Seberapa sering kamu merasa kesepian atau terisolasi? 🤗",
    "Seberapa sering kamu merasa sulit berkonsentrasi? 🎯",
    "Seberapa sering kamu merasa kehilangan minat dalam aktivitas yang biasanya kamu nikmati? 🎮",
    "Seberapa sering kamu merasa overwhelmed dengan tugas atau tanggung jawab? 📚",
    "Seberapa sering kamu merasa overthinking tentang masa depan? 💭",
    "Seberapa sering kamu merasa tidak percaya diri dengan penampilanmu? 🪞",
    "Seberapa sering kamu merasa tertekan dengan ekspektasi orang lain? 👥",
    "Seberapa sering kamu merasa FOMO (Fear of Missing Out) di social media? 📱",
    "Seberapa sering kamu membandingkan dirimu dengan orang lain? 🤔",
    "Seberapa sering kamu merasa tidak bisa mengekspresikan perasaanmu? 🗣️",
    "Seberapa sering kamu merasa optimis tentang masa depan? 🌟",
    "Seberapa sering kamu merasa puas dengan dirimu sendiri? ✨",
    "Seberapa sering kamu merasa bersyukur atas hal-hal kecil dalam hidupmu? 🙏"
];

let currentQuestion = 0;
let scores = [];

function startQuiz() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('active');
    showQuestion();
}

function showQuestion() {
    document.getElementById('question').textContent = questions[currentQuestion];
    updateProgress();
    
    // Reset option selection
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function selectOption(score) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    event.target.classList.add('selected');
    
    // Add score and move to next question
    setTimeout(() => {
        scores.push(score);
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResults();
        }
    }, 300);
}

function showResults() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('active');

    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    let resultText = '';
    let recommendation = '';

    if (averageScore <= 1.5) {
        resultText = "Kamu mungkin sedang dalam kondisi mental yang kurang baik 💜";
        recommendation = "Jangan ragu untuk mencari bantuan profesional atau berbicara dengan orang yang kamu percaya. Kamu tidak sendirian dalam hal ini! Beberapa nomor hotline yang bisa kamu hubungi:\n" +
            "- 119 ext. 8 atau 1500-567(Layanan Sehat Jiwa)\n" +
            "" +
            "🤗";
    } else if (averageScore <= 2.5) {
        resultText = "Kondisi mentalmu cukup stabil, tapi ada beberapa hal yang perlu diperhatikan 💫";
        recommendation = "Cobalah untuk lebih memperhatikan self-care dengan:\n" +
            "- Meluangkan waktu untuk hobi yang kamu sukai\n" +
            "- Membuat jadwal tidur yang teratur\n" +
            "- Olahraga ringan 15-30 menit sehari\n" +
            "- Berbagi perasaanmu dengan orang terdekat 🌱";
    } else if (averageScore <= 3.5) {
        resultText = "Kondisi mentalmu cukup baik! ✨";
        recommendation = "Tetap jaga keseimbangan hidupmu dengan:\n" +
            "- Meditasi atau journaling secara rutin\n" +
            "- Digital detox sesekali\n" +
            "- Quality time dengan orang tersayang\n" +
            "- Lakukan hal-hal yang membuatmu bahagia 🌈";
    } else {
        resultText = "Kondisi mentalmu sangat baik! 🌟";
        recommendation = "Bagus! Tetap pertahankan kebiasaan positifmu:\n" +
            "- Berbagi energi positif dengan sekitarmu\n" +
            "- Jadi support system untuk teman yang membutuhkan\n" +
            "- Tetap grateful dan mindful setiap hari\n" +
            "- Jaga work-life balance yang sudah baik ini! ⭐";
    }

    document.getElementById('mood-score').innerHTML = `<h3>${resultText}</h3>`;
    document.getElementById('recommendation').innerHTML = `<p>${recommendation}</p>`;
}

function restartQuiz() {
    currentQuestion = 0;
    scores = [];
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('welcome-screen').classList.add('active');
} 