// modal variables
const openModalBtn = document.querySelectorAll("[data-modal-open]");
const closeModalBtn = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const submitTaskBtn = document.getElementById("submit-task");
const cancelTaksBtn = document.getElementById("cancel-task");
// input variables
const titleElement = document.getElementById("task-title");
const dateElement = document.getElementById("task-date");
const descElement = document.getElementById("task-description");
// todo list content variable
const taskList = document.querySelector(".task-list-content");

const todoList = JSON.parse(localStorage.getItem("todoStorage")) || [];
let currentTask = {};

// get the value in the forms
const submitTask = () => {
  const dataArrIndex = todoList.findIndex((item) => item.id === currentTask.id);
  const todoDetails = {
    id: `${titleElement.value
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    title: titleElement.value,
    date: dateElement.value,
    description: descElement.value,
  };

  if (dataArrIndex === -1) {
    todoList.unshift(todoDetails);
  } else {
    todoList[dataArrIndex] = todoDetails;
  }

  // save to local storage
  localStorage.setItem("todoStorage", JSON.stringify(todoList));
  displayTask();
};

const displayTask = () => {
  taskList.innerHTML = "";
  // display in the todo list content
  todoList.forEach(({ id, title, date, description }) => {
    taskList.innerHTML += `
    <div class = "todo-list-cont-js">
      <div class = "todo-list-js-pdiv"  id = "${id}">      
        <p class="todo-list-p-js">Title: <span class = "todo-list-js">${title}</span></p>
        <p class="todo-list-p-js">Date: <span class = "todo-list-js">${date}</span></p>
        <p class="todo-list-p-js">Description: <span class = "todo-list-js">${description}</span></p>
      </div>
      <div class = "todo-list-js-btndiv" id = "${id}">
        <button onclick = "updateTodoList(this)" class = "todo-list-btn-js update">Update</button>
        <button class = "todo-list-btn-js delete">Delete</button>
      </div>
    </div>
    `;
  });
};
displayTask();

// update button functions

const updateTodoList = (button) => {
  const dataArrIndex = todoList.findIndex(
    (item) => item.id === button.parentElement.id
  );

  currentTask = todoList[dataArrIndex];

  titleElement.value = currentTask.title;
  dateElement.value = currentTask.date;
  descElement.value = currentTask.description;

  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
};

// functions for modal
openModalBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalOpen);
    openModal(modal);
  });
});

closeModalBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => closeModal(modal));
});

submitTaskBtn.addEventListener("click", (e) => {
  if (titleElement.value == "" || dateElement.value == "") {
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal");
    modal.classList.add("active");
    overlay.classList.add("active");
  } else {
    e.preventDefault();
    submitTask();
    titleElement.value = "";
    dateElement.value = "";
    descElement.value = "";
  }
});

cancelTaksBtn.addEventListener("click", (e) => {
  titleElement.value = "";
  dateElement.value = "";
  descElement.value = "";
});

function openModal(modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
