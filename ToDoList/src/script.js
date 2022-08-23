let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
function onload() {
    taskList.forEach(value => addTaskToList(value.name, value.checked))
}
function addTask() {
    let input = document.getElementById('input-task')
    const value = input.value;
    if (value) {
        addTaskToList(value)
        taskList.push({name: value, checked: false})
        input.value = ""
        updateStorage()
    }
}

function updateStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList))
}

function deleteTask(obj) {
    const div = obj.parentElement;
    const ul = document.getElementById("task-list");
    ul.removeChild(div.parentElement)
    let name = ""
    let checked = false
    for (let element of div.children) {
        if (element.tagName === "SPAN") {
            name = element.textContent
        }
        if (element.tagName === "LABEL") {
            checked = element.firstChild.checked
        }
    }
    taskList = taskList.filter(value => value.name !== name)
    updateStorage(taskList)
}

function completeTask(obj) {
    for (let element of obj.parentElement.parentElement.children) {
        if (element.tagName === "SPAN") {
            element.classList.toggle("task-complete")
        }
    }
}

function addTaskToList(task, checked = false) {
    console.log(task)
    const li = document.createElement("li");
    const div = document.createElement("div")
    div.classList.add("list-item")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = checked
    checkbox.addEventListener('click', function () {
        completeTask(this)
    })
    label.appendChild(checkbox)
    div.appendChild(label)
    const span = document.createElement("span")
    span.classList.add("task")
    span.innerText = task
    div.appendChild(span)
    const btn = document.createElement("button")
    btn.classList.add("delete-btn")
    const icon = document.createElement("i")
    icon.classList.add("fas", "fa-times", "delete")
    btn.appendChild(icon)
    btn.addEventListener('click', function () {
        deleteTask(this)
    });
    div.appendChild(btn)
    li.appendChild(div);
    const ul = document.getElementById("task-list");
    console.log(ul)
    ul.appendChild(li);
}
