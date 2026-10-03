let tasks = [
  { text: "Complete COS101 assignment", done: false },
  { text: "Study MTH101", done: false },
  { text: "Review PHY101 notes", done: false },
  { text: "Complete GST121 coursework", done: false },
  { text: "Practice JavaScript", done: false },
  { text: "Work on portfolio website", done: false },
  { text: "Prepare for upcoming examination", done: false }
];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskError = document.getElementById("taskError");
const taskCount = document.getElementById("taskCount");
const progressFill = document.getElementById("progressFill");

function renderTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    if (tasks[i].done) {
      li.classList.add("completed");
    }

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-btn";
    toggleBtn.textContent = tasks[i].done ? "\u2611" : "\u2610";
    toggleBtn.setAttribute("aria-label", "Mark task as completed");
    toggleBtn.addEventListener("click", function () {
      toggleTask(i);
    });

     const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = tasks[i].text;

       const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "[Delete]";
    deleteBtn.addEventListener("click", function () {
      deleteTask(i);
    });

    li.appendChild(toggleBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  updateCount();
}

function addTask(text) {
  tasks.push({ text: text, done: false });
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateCount() {
  let completed = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      completed++;
    }
  }

  if (tasks.length === 0) {
    taskCount.textContent = "No tasks yet. Add your first task above.";
    progressFill.style.width = "0%";
  } else {
    const percent = Math.round((completed / tasks.length) * 100);
    taskCount.textContent = completed + " of " + tasks.length + " tasks completed (" + percent + "%)";
    progressFill.style.width = percent + "%";
  }
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (text === "") {
    taskError.textContent = "Please enter a task before adding.";
    return;
  }

  taskError.textContent = "";
  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

renderTasks();
