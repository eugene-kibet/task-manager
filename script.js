// ==========================================
// ZONE 1: GRAB ELEMENTS THAT EXIST IN HTML
// ==========================================
const taskinput = document.getElementById("task");
const addbutton = document.getElementById("add-button");
const tasklist = document.getElementById("task-list");
const emptymessage = document.getElementById("empty-message");

// Dashboard Elements
const taskCountElement = document.querySelector(".Task-count");
const progressFill = document.querySelector(".Progress-fill");
const motivationTitle = document.querySelector(".Motivation");
const motivationSubtitle = document.querySelector(".Motivation2");

// ==========================================
// ZONE 2: HELPER FUNCTIONS & RESTORE LOGIC
// ==========================================
function updateDashboard() {
  const taskElements = tasklist.querySelectorAll("p:not(#empty-message)");
  const totalTasks = taskElements.length;

  let completedCount = 0;
  taskElements.forEach(function (task) {
    if (task.classList.contains("completed")) {
      completedCount++;
    }
  });

  // 1. Update Counter (e.g., 2/5 or 0/0)
  taskCountElement.textContent = `${completedCount}/${totalTasks}`;

  // 2. Update Progress Bar
  const percentage = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
  progressFill.style.width = `${percentage}%`;

  // 3. Update Motivational Text
  if (totalTasks === 0) {
    motivationTitle.textContent = "Start your day! 🎯";
    motivationSubtitle.textContent = "Add your first task above to get the momentum going.";
  } else if (completedCount === totalTasks) {
    motivationTitle.textContent = "All done! 🎉";
    motivationSubtitle.textContent = "Outstanding work! You crushed every single task.";
  } else if (percentage >= 50) {
    motivationTitle.textContent = "Over halfway there! ⚡";
    motivationSubtitle.textContent = "Great momentum, keep pushing to the finish line.";
  } else {
    motivationTitle.textContent = "Keep going 🚀";
    motivationSubtitle.textContent = "Small consistent progress beats perfection.";
  }
}

function saveTasks() {
  const taskElements = tasklist.querySelectorAll("p:not(#empty-message)");
  const tasksArray = [];

  taskElements.forEach(function (task) {
    tasksArray.push({
      text: task.textContent,
      completed: task.classList.contains("completed")
    });
  });

  localStorage.setItem("myTasks", JSON.stringify(tasksArray));
  updateDashboard();
}

function createTaskElement(taskText, isCompleted = false) {
  const taskitem = document.createElement("div");
  taskitem.classList.add("task-card");

  // --- GROUP A: THE TASK TEXT (<p>) ---
  const newTask = document.createElement("p");
  newTask.textContent = taskText;
  newTask.classList.add("task-text");

  if (isCompleted) {
    newTask.classList.add("completed");
    taskitem.classList.add("is-done");
  }

  newTask.addEventListener("click", function () {
    newTask.classList.toggle("completed");
    taskitem.classList.toggle("is-done");
    saveTasks();
  });

  taskitem.appendChild(newTask);

  // --- GROUP B: BUTTON CONTAINER ---
  const actionContainer = document.createElement("div");
  actionContainer.classList.add("task-actions");

  // Edit Button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("btn-edit");

  editButton.addEventListener("click", function () {
    const updatedText = prompt("Edit the task:", newTask.textContent);
    if (updatedText !== null && updatedText.trim() !== "") {
      newTask.textContent = updatedText.trim();
      saveTasks();
    }
  });

  actionContainer.appendChild(editButton);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn-delete");

  deleteButton.addEventListener("click", function () {
    taskitem.remove();
    if (tasklist.children.length === 0) {
      tasklist.appendChild(emptymessage);
    }
    saveTasks();
  });

  actionContainer.appendChild(deleteButton);
  taskitem.appendChild(actionContainer);
  tasklist.appendChild(taskitem);

  // --- GROUP C: CLEANUP EMPTY MESSAGE ---
  if (tasklist.contains(emptymessage)) {
    emptymessage.remove();
  }
}

// --- INITIAL LOAD: FETCH SAVED TASKS ON REFRESH ---
const savedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];

savedTasks.forEach(function (task) {
  createTaskElement(task.text, task.completed);
});

// Sync dashboard on initial load
updateDashboard();

// ==========================================
// ZONE 3: EVENT LISTENERS
// ==========================================
addbutton.addEventListener("click", function () {
  if (taskinput.value.trim() !== "") {
    createTaskElement(taskinput.value.trim(), false);
    taskinput.value = "";
    saveTasks();
  }
});

taskinput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addbutton.click();
  }
});