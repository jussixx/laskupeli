// DOM-elementit
const questionBox = document.getElementById("question-box");
const scoreEl = document.getElementById("score");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const timeEl = document.getElementById("time");

const keys = document.querySelectorAll(".key");
const clearBtn = document.getElementById("clear");
const enterBtn = document.getElementById("enter");

// Pelitila
let score = 0;
let correctAnswer = null;
let timeLeft = 60;
let timer = null;
let gameActive = false;

// Käynnistä ajastin
function startTimer() {
  timeLeft = 60;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameActive = false;
      questionBox.textContent = "Aika loppui!";
      answerInput.disabled = true;
    }
  }, 1000);
}

// Luo uusi lasku
function generateQuestion() {
  const a = Math.floor(Math.random() * 51);
  const b = Math.floor(Math.random() * 51);
  const isAddition = Math.random() < 0.5;

  let left, right;
  if (isAddition) {
    left = a;
    right = b;
    correctAnswer = left + right;
    questionBox.textContent = `${left} + ${right} = ?`;
  } else {
    left = Math.max(a, b);
    right = Math.min(a, b);
    correctAnswer = left - right;
    questionBox.textContent = `${left} - ${right} = ?`;
  }

  answerInput.value = "";
  answerInput.focus();
}

// Tarkista vastaus
submitBtn.addEventListener("click", () => {
  if (!gameActive) return;

  const userAnswer = parseInt(answerInput.value);
  if (userAnswer === correctAnswer) {
    score++;
    scoreEl.textContent = score;

    questionBox.classList.add("flash-correct");
    setTimeout(() => {
      questionBox.classList.remove("flash-correct");
    }, 300);

    generateQuestion();
  } else {
    questionBox.classList.add("flash-wrong");
    setTimeout(() => {
      questionBox.classList.remove("flash-wrong");
    }, 300);

    answerInput.value = "";
    answerInput.focus();
  }
});

// Aloita peli
startBtn.addEventListener("click", () => {
  score = 0;
  scoreEl.textContent = score;
  gameActive = true;
  answerInput.disabled = false;

  clearInterval(timer);
  startTimer();
  generateQuestion();
});

// Aloita alusta (päivitä sivu)
resetBtn.addEventListener("click", () => {
  location.reload();
});

// Enter toimii näppäimistöltä
answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitBtn.click();
});

// Laskinnäppäimet
keys.forEach((key) => {
  key.addEventListener("click", () => {
    if (!gameActive) return; // estetään ennen aloitusta
    const value = key.textContent;
    if (!isNaN(value)) {
      answerInput.value += value;
    }
  });
});

clearBtn.addEventListener("click", () => {
  if (!gameActive) return;
  answerInput.value = "";
});

enterBtn.addEventListener("click", () => {
  if (!gameActive) return;
  submitBtn.click();
});
