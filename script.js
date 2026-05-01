let flashcards = [
  { question: "What is the capital of Japan?", answer: "Tokyo" },
  { question: "What is 8 x 7?", answer: "56" },
  {
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
  },
];

let currentIndex = 0;

const cardElement = document.getElementById("flashcard");
const questionElement = document.getElementById("card-question");
const answerElement = document.getElementById("card-answer");
const cardListElement = document.getElementById("card-list");

document.getElementById("card-container").addEventListener("click", flipCard);
document.getElementById("flip-btn").addEventListener("click", flipCard);
document.getElementById("prev-btn").addEventListener("click", prevCard);
document.getElementById("next-btn").addEventListener("click", nextCard);
document.getElementById("add-btn").addEventListener("click", addCard);

function updateCardDisplay() {
  cardElement.classList.remove("flipped");

  if (flashcards.length === 0) {
    questionElement.innerText = "No cards available. Add some below!";
    answerElement.innerText = "N/A";
    return;
  }

  if (currentIndex >= flashcards.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = flashcards.length - 1;

  questionElement.innerText = flashcards[currentIndex].question;
  answerElement.innerText = flashcards[currentIndex].answer;
}

function flipCard() {
  if (flashcards.length > 0) {
    cardElement.classList.toggle("flipped");
  }
}

function nextCard() {
  currentIndex++;
  updateCardDisplay();
}

function prevCard() {
  currentIndex--;
  updateCardDisplay();
}

function addCard() {
  const qInput = document.getElementById("new-question");
  const aInput = document.getElementById("new-answer");

  if (qInput.value.trim() === "" || aInput.value.trim() === "") {
    alert("Please enter both a question and an answer.");
    return;
  }

  flashcards.push({
    question: qInput.value,
    answer: aInput.value,
  });

  qInput.value = "";
  aInput.value = "";

  renderList();
  updateCardDisplay();
}

function deleteCard(index) {
  if (confirm("Are you sure you want to delete this card?")) {
    flashcards.splice(index, 1);
    if (currentIndex >= flashcards.length && currentIndex > 0) {
      currentIndex--;
    }

    renderList();
    updateCardDisplay();
  }
}

function editCard(index) {
  let newQ = prompt("Edit Question:", flashcards[index].question);
  let newA = prompt("Edit Answer:", flashcards[index].answer);

  if (
    newQ !== null &&
    newA !== null &&
    newQ.trim() !== "" &&
    newA.trim() !== ""
  ) {
    flashcards[index].question = newQ;
    flashcards[index].answer = newA;
    renderList();
    updateCardDisplay();
  }
}

function renderList() {
  cardListElement.innerHTML = "";

  flashcards.forEach((card, index) => {
    let li = document.createElement("li");

    let textDiv = document.createElement("div");
    textDiv.className = "list-text";
    textDiv.innerHTML = `<strong>Q:</strong> ${card.question} <br> <strong>A:</strong> ${card.answer}`;

    let actionsDiv = document.createElement("div");
    actionsDiv.className = "list-actions";

    let editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editCard(index);

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "danger";
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteCard(index);

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(textDiv);
    li.appendChild(actionsDiv);

    cardListElement.appendChild(li);
  });
}

renderList();
updateCardDisplay();
