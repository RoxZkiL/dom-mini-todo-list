const input = document.createElement("input");
input.type = "text";
input.id = "miInput";
input.placeholder = "Escribe aquí...";

document.body.appendChild(input);

const button = document.createElement("button");
button.type = "submit";
button.id = "miButton";
button.innerText = "Crear Tarea";
button.disabled = true;

document.body.appendChild(button);

const ulElement = document.createElement("ul");
ulElement.id = "taskList";
document.body.appendChild(ulElement);

function createSingleTaskDeleteButton(task) {
  const deleteButton = document.createElement("button");
  deleteButton.type = "submit";
  deleteButton.className = "deleteButton";
  deleteButton.innerText = "Eliminar";
  task.appendChild(deleteButton);

  deleteButton.addEventListener("click", function () {
    task.remove();
    updateLocalStorage();
  });
}

function createDeleteAllButton() {
  const button2 = document.createElement("button");
  button2.type = "button";
  button2.id = "miButton2";
  button2.innerText = "Borrar Tareas";
  document.body.appendChild(button2);

  button2.addEventListener("click", function () {
    localStorage.removeItem("tasks");
    ulElement.innerHTML = "";
    console.log("Tareas borradas de localStorage.");
    button2.remove();
    button.disabled = true;
  });
}

function createTask(inputValue) {
  const task = document.createElement("li");
  task.innerText = inputValue;

  createSingleTaskDeleteButton(task);
  ulElement.appendChild(task);

  updateLocalStorage();

  if (ulElement.querySelectorAll("li").length) {
    createClearButton();
  }
}

function getStoredTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  console.log(storedTasks);

  ulElement.innerHTML = "";

  storedTasks.forEach((taskValue) => {
    const task = document.createElement("li");
    task.innerText = taskValue;

    createSingleTaskDeleteButton(task);
    ulElement.appendChild(task);
  });

  if (storedTasks.length) {
    createClearButton();
  }
}

function updateLocalStorage() {
  const taskItems = ulElement.querySelectorAll("li");
  const taskValues = [];

  taskItems.forEach((task) => {
    const taskText = task.firstChild.textContent;
    taskValues.push(taskText);
  });

  localStorage.setItem("tasks", JSON.stringify(taskValues));

  if (!taskItems.length) {
    const clearButton = document.getElementById("miButton2");
    if (clearButton) {
      clearButton.remove();
    }
    button.disabled = true;
  }
}

function createClearButton() {
  if (document.getElementById("miButton2")) {
    return;
  }

  createDeleteAllButton();
}

input.addEventListener("input", function () {
  button.disabled = !input.value.length;
});

button.addEventListener("click", function () {
  const inputValue = input.value;
  if (inputValue.length) {
    createTask(inputValue);
    input.value = "";
    button.disabled = true;
  }
});

getStoredTasks();
