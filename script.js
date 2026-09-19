/*console.log("Javascript is working!");*/

const taskinput = document.getElementById("task");

console.log(taskinput);

console.log(taskinput.value);

const addbutton = document.getElementById("add-button");

console.log(addbutton);

const tasklist = document.getElementById("task-list");

console.log(tasklist);

const emptymessage = document.getElementById("empty-message");

addbutton.addEventListener("click", function(){
    console.log(taskinput.value);

    console.log("Input value:", taskinput.value);
    console.log("Is it not empty?", taskinput.value !== "");



    if(taskinput.value !== ""){

      const newTask = document.createElement("p");
      
      newTask.textContent = taskinput.value;

      newTask.addEventListener("click", function(){
        newTask.classList.toggle("completed");
      });


      tasklist.appendChild(newTask);
      
      
      /*console.log(tasklist.contains(emptymessage));*/

      if(tasklist.contains(emptymessage)){
        emptymessage.remove();
      }

      taskinput.value = "";

    }
});

