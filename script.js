const quotes = [
  "Practice makes perfect",
  "Typing is a useful skill",
  "JavaScript is fun",
  "Stay focused and keep coding"
];
let quoteEl = document.getElementById("quote");
let inputEl = document.getElementById("input");
let timeEl = document.getElementById("time");
let wpmEl = document.getElementById("wpm");
let accuracyEl = document.getElementById("accuracy");
let errorsEl = document.getElementById("errors");
let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let timeLeft = 60;
let timer = null;
let errors = 0;
let totalTyped = 0;
let correctTyped = 0;
let currentQuote = "";
function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerHTML = currentQuote;
}
function startGame() {
  resetGame();
  loadQuote();
  inputEl.disabled = false;
  inputEl.value = "";
  inputEl.focus();

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) finishGame();
  }, 1000);
}
function resetGame() {
  clearInterval(timer);
  timeLeft = 60;
  errors = 0;
  totalTyped = 0;
  correctTyped = 0;
  timeEl.textContent = 60;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;
  errorsEl.textContent = 0;
}
inputEl.addEventListener("input", () => {
  let typedText = inputEl.value;
  totalTyped++;

  if (typedText === currentQuote.substring(0, typedText.length)) {
    correctTyped++;
  } else {
    errors++;
    errorsEl.textContent = errors;
  }

  // WPM = (correct characters / 5) / minutes
  let minutes = (60 - timeLeft) / 60;
  if (minutes > 0) {
    let wpm = ((correctTyped / 5) / minutes).toFixed(2);
    wpmEl.textContent = wpm;
  }

  let accuracy = ((correctTyped / totalTyped) * 100).toFixed(2);
  accuracyEl.textContent = accuracy;
});
function finishGame() {
  clearInterval(timer);
  inputEl.disabled = true;
  quoteEl.textContent = "Time Over! Your WPM: " + wpmEl.textContent;
}
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
  resetGame();
  loadQuote();
});


