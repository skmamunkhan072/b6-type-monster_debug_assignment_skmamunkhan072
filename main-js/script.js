const display = document.getElementById("display");
const question = document.getElementById("question");
const startBtn = document.getElementById("starts");
const countdownOverlay = document.getElementById("countdown");
const resultModal = document.getElementById("result");
const modalBackground = document.getElementById("modal-background");
const typingSpred = document.getElementById("typing-speed");

// variables
let userText = "";
let errorCount = 0;
let startTime;
let questionText = "";
let userKey = "";

// Load and display question
fetch("../json/texts.json")
  .then((res) => res.json())
  .then((data) => {
    questionText = data[Math.floor(Math.random() * data.length)];
    question.innerHTML = questionText;
  });

let vul = 0;

// checks the user typed character and displays accordingly
const typeController = (e) => {
  const newLetter = e.key;
  userKey += newLetter;

  // Handle backspace press
  userKey;
  if (newLetter == "Backspace") {
    if (userText) {
      userText = userText.slice(0, userText.length - 1);
      return display.removeChild(display.lastChild);
    } else {
      return;
    }
  }

  // these are the valid character we are allowing to type
  const validLetters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!@#$%^&*()_+-={}[]'\".,?";

  // if it is not a valid character like Control/Alt then skip displaying anything
  if (!validLetters.includes(newLetter)) {
    return;
  }
  userText += newLetter;

  const newLetterCorrect = validate(newLetter);
  if (newLetterCorrect) {
    display.innerHTML += `<span class="green">${
      newLetter === " " ? "▪" : newLetter
    }</span>`;
  } else {
    display.innerHTML += `<span class="red">${
      newLetter === " " ? "▪" : newLetter
    }</span>`;
  }

  // check if given question text is equal to user typed text
  if (questionText === userText) {
    gameOver();
  }
};

// let falsCount = 0;
const validate = (key) => {
  if (key === questionText[userText.length - 1]) {
    return true;
  }
  errorCount++;
  return false;
};

// FINISHED TYPING
const gameOver = () => {
  document.removeEventListener("keydown", typeController);
  // the current time is the finish time
  // so total time taken is current time - start time
  const finishTime = new Date().getTime();
  const timeTaken = parseInt((finishTime - startTime) / 1000);
  display.classList.add("inactive");
  // show result modal
  resultModal.innerHTML = "";
  resultModal.classList.toggle("hidden");
  modalBackground.classList.toggle("hidden");
  // clear user text
  display.innerHTML = "";
  // make it inactive
  display.classList.add("inactive");
  // show result
  resultModal.innerHTML += `
    <div class="result-contant">
        <h1>Finished!</h1>
        <p>You took: <span class="bold">${
          timeTaken ? timeTaken : 0
        }</span> seconds</p>
        <p>You made <span class="bold red">${errorCount}</span> mistakes</p>
        <p>You typing spred ${
          typingSpred.innerText ? typingSpred.innerText : "noData"
        } %</p>
        <button onclick="closeModal()">Close</button>
    </div>
  `;

  addHistory(questionText, timeTaken, errorCount, typingSpred.innerText);
  // restart everything
  startTime = null;
  errorCount = 0;
  userText = "";
  typingSpred.innerText = "";
};

const closeModal = () => {
  modalBackground.classList.toggle("hidden");
  resultModal.classList.toggle("hidden");
};

const start = () => {
  // If already started, do not start again
  if (startTime) return;

  let count = 3;
  countdownOverlay.style.display = "flex";

  const startCountdown = setInterval(() => {
    countdownOverlay.innerHTML = `<h1>${count}</h1>`;

    // finished timer
    if (count == 0) {
      // -------------- START TYPING -----------------
      document.addEventListener("keydown", typeController);

      countdownOverlay.style.display = "none";
      display.classList.remove("inactive");
      clearInterval(startCountdown);
      startTime = new Date().getTime();
    }
    count--;
  }, 1000);
};

// START Countdownlo
startBtn.addEventListener("click", start);
// If history exists, show it
displayHistory();

// Show typing time spent
setInterval((e) => {
  const currentTime = new Date().getTime();
  const timeSpent = parseInt((currentTime - startTime) / 1000);
  typingSpredTime(timeSpent);
  document.getElementById("show-time").innerHTML = `${
    startTime ? timeSpent : 0
  } seconds`;
}, 1000);

const typingSpredTime = (time) => {
  if (userKey) {
    const totalTime = time;
    const userKeyLength = userKey.length;

    const totalSpred = (userKeyLength / totalTime) * 60;
    const fainerSpread = parseInt(totalSpred).toString();
    if (fainerSpread.length > 2) {
      const typingFainelSprit = fainerSpread.substring(0, 2);
      if (typingFainelSprit === "Na") {
        return;
      } else {
        typingSpred.innerText = `Your typing speed : ${
          typingFainelSprit ? typingFainelSprit : 0
        }`;
      }
    } else {
      typingSpred.innerText = `Your typing speed : ${
        fainerSpread ? fainerSpread : 0
      }`;
    }
  } else {
    return;
  }
  userKey = "";
};
