const histories = document.getElementById("histories");
function addHistory(questionText, timeTaken, errorCount) {
  const newRow = document.createElement("div");
  newRow.classList.add("col");
  newRow.innerHTML = `
  <div class="card">
  <div class="card-body">
    <h3 class="card-title">${questionText}</h3>
    <p class="m-0 card-text">You took: <span class="bold">${timeTaken}</span> seconds</p>
    <p class="m-0 card-text">You made <span class="bold red">${errorCount}</span> mistakes</p>
  </div>
</div>
  `;

  histories.appendChild(newRow);

  let previousTests = JSON.parse(localStorage.getItem("testHistory")) || [];
  previousTests.push({ questionText, timeTaken, errorCount });

  localStorage.setItem("testHistory", JSON.stringify(previousTests));

  displayHistory();
}

function displayHistory() {
  histories.innerHTML = "";
  const previousTests = JSON.parse(localStorage.getItem("testHistory")) || [];

  previousTests.forEach((test) => {
    const newRow = document.createElement("div");
    newRow.classList.add("col");
    newRow.innerHTML = `

    <div class="card">
    <div class="card-body">
      <h3 class="card-title">${test.questionText}</h3>
      <p class="m-0 card-text">You took: <span class="bold">${test.timeTaken}</span> seconds</p>
      <p class="m-0 card-text">You made <span class="bold red">${test.errorCount}</span> mistakes</p>
    </div>
  </div>

  `;

    histories.appendChild(newRow);
  });
}
