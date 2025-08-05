const login = document.getElementById("login_form");
const email = document.getElementById("email_input");
const password = document.getElementById("password_input");
const form = document.getElementById('task_form');
const input = document.getElementById('task_input');
const container = document.getElementById('task_container');
const heading = document.getElementById('title');

const dummy_mail = "admin@email.com";
const dummy_pass = "123";

document.addEventListener('DOMContentLoaded', loadTask);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText === '') return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const isDuplicate = tasks.some(task => task.toLowerCase() === taskText.toLowerCase());

    if (isDuplicate) {
        showCustomAlert("Task already exists!");
        return;
    }

    addTask(taskText);
    saveTask(taskText);
    input.value = '';
});

login.addEventListener('submit',function(e){
    e.preventDefault();
    const mail = email.value.trim();
    const pass = password.value.trim();

    if(mail === dummy_mail && pass === dummy_pass){
        document.getElementById("login_section").style.display = "none";
        heading.innerText = "To Do"
        document.getElementById("todo_section").style.display = "block";
        showCustomAlert("Login Success !!!!!!!!!");
    }
    else{
        showCustomAlert("Invalid Password !")
    }
});

function addTask(taskText) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const label = document.createElement('label');
    label.textContent = taskText;

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            label.classList.add('completed');
            confetti({ particleCount: 1000, spread: 400, origin: { y: 0.55 } });
        } else {
            label.classList.remove('completed');
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
        li.classList.add("fade-out");
        setTimeout(() => li.remove(), 300);
        deleteTask(taskText);
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    container.appendChild(li);
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showCustomAlert(message) {
    const alertBox = document.getElementById("custom_alert");
    alertBox.querySelector("p").textContent = message;
    alertBox.classList.remove("hidden");

    document.getElementById("dismiss_alert").onclick = () => {
        alertBox.classList.add("hidden");
    };
}
