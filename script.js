// Get DOM elements
const scoreA = document.getElementById("scoreA");
const scoreB = document.getElementById("scoreB");
const foulsA = document.getElementById("foulsA");
const foulsB = document.getElementById("foulsB");
const quarterDisplay = document.getElementById("quarter");
const timerDisplay = document.getElementById("timer");

// State variables
let teamAScore = 0;
let teamBScore = 0;
let teamAFouls = 0;
let teamBFouls = 0;
let quarter = 1;
let time = 600; // 10 minutes
let timerInterval = null;

// Score functions
function changeScore(team, value) {
  if (team === "A") {
    teamAScore = Math.max(0, teamAScore + value);
    scoreA.textContent = teamAScore;
  } else {
    teamBScore = Math.max(0, teamBScore + value);
    scoreB.textContent = teamBScore;
  }
}

// Foul functions
function changeFoul(team, value) {
  if (team === "A") {
    teamAFouls += value;
    foulsA.textContent = teamAFouls;
  } else {
    teamBFouls += value;
    foulsB.textContent = teamBFouls;
  }
}

// Timer functions
function updateTimerDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  if (timerInterval) return; // prevent multiple intervals
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      if (quarter < 4) {
        quarter++;
        quarterDisplay.textContent = quarter;
        time = 600; // reset time for next quarter
        updateTimerDisplay();
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetGame() {
  teamAScore = teamBScore = 0;
  teamAFouls = teamBFouls = 0;
  quarter = 1;
  time = 600;
  pauseTimer();
  updateAllDisplays();
}

function updateAllDisplays() {
  scoreA.textContent = teamAScore;
  scoreB.textContent = teamBScore;
  foulsA.textContent = teamAFouls;
  foulsB.textContent = teamBFouls;
  quarterDisplay.textContent = quarter;
  updateTimerDisplay();
}

// Initialize display on load
updateAllDisplays();
