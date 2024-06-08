// modal variables
const openModalBtn = document.querySelectorAll("[data-modal-open]");
const closeModalBtn = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const submitTaskBtn = document.getElementById("submit-task");
// input variables
const titleElement = document.getElementById("task-title");
const dateElement = document.getElementById("task-date");
const descElement = document.getElementById("task-description");
// todo list content variable
const taskList = document.querySelector(".task-list-content");

const todoList = [];

// get the value in the forms
// save to local storage
const submitTask = () => {
  const todoDetails = {
    title: titleElement.value,
    date: dateElement.value,
    description: descElement.value,
  };
  todoList.push(todoDetails);
  console.log(todoList);
  todoList.forEach(({ title, date, description }) => {
    taskList.innerHTML = `<p>${title}</p><p>${date}</p><p>${description}</p>`;
  });
};

// display in the todo list content

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

// submit button animation IP
submitTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitTask();
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
