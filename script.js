document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    var taskList = document.getElementById("taskList");
    var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (taskText) {
        var newTask = createTaskElement(taskText);
        taskList.appendChild(newTask);
    });

    var savedDate = localStorage.getItem("date") || "";
    var savedMood = localStorage.getItem("mood") || "";
    var savedGoals = localStorage.getItem("goals") || "";

    document.getElementById("dateInput").value = savedDate;
    document.getElementById("moodInput").value = savedMood;
    document.getElementById("goalsInput").value = savedGoals;
}

function addTask() {
    var input = document.getElementById("taskInput");
    var taskText = input.value.trim();

    if (taskText !== "") {
        var taskList = document.getElementById("taskList");
        var newTask = createTaskElement(taskText);
        taskList.appendChild(newTask);

        
        localStorage.removeItem("tasks");
        saveTasksToLocalStorage();
        input.value = "";
        
    }
}

function deleteTask() {
    var listItem = this.parentNode;
    var taskList = listItem.parentNode;
    taskList.removeChild(listItem);

    saveTasksToLocalStorage();
}

function toggleTask() {
    var listItem = this;
    listItem.classList.toggle("completed");

    saveTasksToLocalStorage();
}

function createTaskElement(taskText) {
    var newTask = document.createElement("li");
    newTask.appendChild(document.createTextNode(taskText));
    newTask.onclick = toggleTask;

    var deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = "&#10006;"; 
    deleteIcon.className = "delete-cross";
    deleteIcon.onclick = deleteTask;

    newTask.appendChild(deleteIcon);

    return newTask;
}

function saveTasksToLocalStorage() {
    var taskList = document.getElementById("taskList");
    var tasks = [];

    for (var i = 0; i < taskList.children.length; i++) {
        var taskText = taskList.children[i].innerText;
        tasks.push(taskText);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("dateInput").addEventListener("change", saveDailyInfoToLocalStorage);
document.getElementById("moodInput").addEventListener("change", saveDailyInfoToLocalStorage);
document.getElementById("goalsInput").addEventListener("input", saveDailyInfoToLocalStorage);

function saveDailyInfoToLocalStorage() {
    var dateInput = document.getElementById("dateInput").value;
    var moodInput = document.getElementById("moodInput").value;
    var goalsInput = document.getElementById("goalsInput").value;

    localStorage.setItem("date", dateInput);
    localStorage.setItem("mood", moodInput);
    localStorage.setItem("goals", goalsInput);
}
