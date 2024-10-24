const questions = [
    "Are you an atheletic person",
    "Do you enjoy sports",
    "Do you enjoy team sports",
    "Do you enjoy independent sports",
    "Are you into musical instruments",
    "Are you into cultural activies like Kapa Haka",
    "Are you intrested in being an important figure in politics",
    "Are you into activies like drama",
    "Are you into academic subjects like math",
    "Are you into doing makeup or costumes"
];

const options = [
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"],
    ["Yes", "No", "Maybe", "Not really"]
];

let currentQuestion = 0;
const userAnswers = Array(questions.length).fill(null);

function navigateToQuestion(questionIndex) {
    if (userAnswers[questionIndex - 1] === null || questionIndex - 1 < currentQuestion) {
        return;
    }
    currentQuestion = questionIndex - 1;
    updateQuestion();
}

function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    document.querySelector(`#nav-btn-${currentQuestion + 1}`).classList.add('answered');
    updateQuestion();
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateQuestion();
    } else {
        showResults();
    }
}

function updateQuestion() {
    document.getElementById("question").innerHTML = `<p>${questions[currentQuestion]}</p>`;
    document.getElementById("options").innerHTML = options[currentQuestion].map((option, index) => 
        `<button onclick="selectOption(${index + 1})" class="${userAnswers[currentQuestion] === index + 1 ? 'selected' : ''}">${option}</button>`
    ).join("");
    document.getElementById("question-counter").innerText = `Question ${currentQuestion + 1} out of 10`;
    document.querySelector(".footer p").innerText = `Question ${currentQuestion + 1} out of 10`;
    updateNavigation();
}

function updateNavigation() {
    const buttons = document.querySelectorAll('.question-navigation button');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === currentQuestion);
        button.classList.toggle('answered', userAnswers[index] !== null);
        button.disabled = userAnswers[index] !== null && index !== currentQuestion;
    });
}

function showResults() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = questions.map((question, index) => 
        `<p>${question}: ${options[index][userAnswers[index] - 1]}</p>`
    ).join("");
}

function retakeQuiz() {
    currentQuestion = 0;
    userAnswers.fill(null);
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    updateQuestion();
}

// Timer functionality
let timeLeft = 600;
const timerElement = document.getElementById("timer");

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeLeft > 0) {
        timeLeft--;
        setTimeout(updateTimer, 1000);
    } else {
        alert("Time's up!");
        showResults();
    }
}

updateQuestion();
updateTimer();