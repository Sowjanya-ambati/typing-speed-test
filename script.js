const quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Typing fast requires practice and patience",
  "JavaScript makes websites interactive and fun",
  "Speed and accuracy are important in typing tests"
];

let timer = 0;
let interval = null;
let currentQuote = "";
let isTestRunning = false;

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

// Start test
startBtn.addEventListener("click", () => {
  if (isTestRunning) return;
  
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
  
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  
  timer = 0;
  timeEl.textContent = timer;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;
  
  isTestRunning = true;
  interval = setInterval(() => {
    timer++;
    timeEl.textContent = timer;
  }, 1000);
});

// Reset test
resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  isTestRunning = false;
  inputEl.disabled = true;
  quoteEl.textContent = "Click 'Start Test' to begin!";
  inputEl.value = "";
  timeEl.textContent = 0;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;
});

// Typing check
inputEl.addEventListener("input", () => {
  const typedText = inputEl.value;
  
  // Accuracy
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentQuote[i]) correctChars++;
  }
  let accuracy = Math.floor((correctChars / typedText.length) * 100);
  accuracyEl.textContent = isNaN(accuracy) ? 0 : accuracy;
  
  // WPM
  const wordsTyped = typedText.trim().split(" ").length;
  let wpm = Math.floor((wordsTyped / timer) * 60);
  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
  
  // Finish test
  if (typedText === currentQuote) {
    clearInterval(interval);
    isTestRunning = false;
    inputEl.disabled = true;
  }
});




