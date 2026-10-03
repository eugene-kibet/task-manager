// ==========================================
// ZONE 1: GRAB ELEMENTS THAT EXIST IN HTML
// (Runs once immediately when the page loads)
// ==========================================

const taskinput = document.getElementById("task");
const addbutton = document.getElementById("add-button");
const tasklist = document.getElementById("task-list");
const emptymessage = document.getElementById("empty-message");


// ==========================================
// ZONE 2: HELPER FUNCTIONS & RESTORE LOGIC
// ==========================================

// Helper 1: Scans the screen and writes task objects into localStorage
function saveTasks() {
  const taskElements = tasklist.querySelectorAll("p");
  const tasksArray = [];

  taskElements.forEach(function (task) {
    if (task.id !== "empty-message") {
      // Store each task as an object with text and completion status
      tasksArray.push({
        text: task.textContent,
        completed: task.classList.contains("completed")
      });
    }
  });

  localStorage.setItem("myTasks", JSON.stringify(tasksArray));
}

// Helper 2: Builds a complete task row and attaches it to the screen
function createTaskElement(taskText, isCompleted = false) {
  const taskitem = document.createElement("div");

  // --- GROUP A: THE TASK TEXT (<p>) ---
  const newTask = document.createElement("p");
  newTask.textContent = taskText;

  // Restore strikethrough styling if the saved state was completed
  if (isCompleted) {
    newTask.classList.add("completed");
  }

  // Toggle completion on click and update localStorage immediately
  newTask.addEventListener("click", function () {
    newTask.classList.toggle("completed");
    saveTasks();
  });

  taskitem.appendChild(newTask);

  // --- GROUP B: THE EDIT BUTTON (<button>) ---
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", function () {
    const updatedText = prompt("Edit the task:", newTask.textContent);
    if (updatedText !== null && updatedText.trim() !== "") {
      newTask.textContent = updatedText;
      saveTasks();
    }
  });

  taskitem.appendChild(editButton);

  // --- GROUP C: THE DELETE BUTTON (<button>) ---
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    taskitem.remove();
    if (tasklist.children.length === 0) {
      tasklist.appendChild(emptymessage);
    }
    saveTasks();
  });

  taskitem.appendChild(deleteButton);
  tasklist.appendChild(taskitem);

  // --- GROUP D: CLEANUP EMPTY MESSAGE ---
  if (tasklist.contains(emptymessage)) {
    emptymessage.remove();
  }
}

// --- INITIAL LOAD: FETCH SAVED TASKS ON REFRESH ---
const savedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];

// Loop through stored objects and pass text + completed status
savedTasks.forEach(function (task) {
  createTaskElement(task.text, task.completed);
});


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