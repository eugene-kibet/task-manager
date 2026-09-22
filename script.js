// ==========================================
// ZONE 1: GRAB ELEMENTS THAT EXIST IN HTML
// (Runs once immediately when the page loads)
// ==========================================

const taskinput = document.getElementById("task");

const addbutton = document.getElementById("add-button");

const tasklist = document.getElementById("task-list");

const emptymessage = document.getElementById("empty-message");



// ==========================================
// ZONE 2: WHEN THE USER CLICKS "ADD"
// (Everything inside here runs on every click)
// ==========================================

function saveTasks() {
  const taskElements = tasklist.querySelectorAll("p");
  const tasksArray = [];

  taskElements.forEach(function (task) {
    if (task.id !== "empty-message") {
      tasksArray.push(task.textContent);
    }
  });

  localStorage.setItem("myTasks", JSON.stringify(tasksArray));
}


addbutton.addEventListener("click", function () {

  if (taskinput.value !== "") {

    const taskitem = document.createElement("div");


    // --- GROUP A: THE TASK TEXT (<p>) ---

    const newTask = document.createElement("p");

    newTask.textContent = taskinput.value;

    newTask.addEventListener("click", function () {

      newTask.classList.toggle("completed");

    });

    taskitem.appendChild(newTask);



    // --- GROUP B: THE EDIT BUTTON (<button>) ---

    const editButton = document.createElement("button");

    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {

      const updatedText = prompt("Edit the task:", newTask.textContent);

      if (updatedText !== null && updatedText.trim() !== "") {

        newTask.textContent = updatedText;

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

    });

    taskitem.appendChild(deleteButton);

    tasklist.appendChild(taskitem);



    // --- GROUP D: CLEANUP ---

    if (tasklist.contains(emptymessage)) {

      emptymessage.remove();

    }

    taskinput.value = "";


  }

});