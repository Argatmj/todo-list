import x from "../assets/x.svg"
import { format } from 'date-fns';

class task {
    static id = 1;

    constructor(title,description,date,priority,project){
        this.id = task.id++;
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.isCompleted = false;
        this.project = project
    }

    toggleComplete() {
        this.isCompleted = !this.isCompleted;
    }
}

function showTaskInfo(task){
    const infoDialog = document.querySelector("#info-dialog");
    infoDialog.textContent = '';

    const topDiv = document.createElement("div");
    const titleDiv = document.createElement("div");
    const projectDiv = document.createElement("div");
    const descDiv = document.createElement("div");
    const prioDiv = document.createElement("div");
    const dateDiv = document.createElement("div");
    const del = document.createElement("img");

    del.src = x;

    titleDiv.classList.add("title")
    topDiv.classList.add("top");
    projectDiv.classList.add("infos");
    descDiv.classList.add("infos");
    prioDiv.classList.add("infos");
    dateDiv.classList.add("infos");

    titleDiv.textContent = task.title 
    projectDiv.textContent = `Project: ${task.project}`
    descDiv.textContent = `Description: ${task.description}`
    prioDiv.textContent = `Priority: ${task.priority}`;
    
    const taskDateString = task.date; 
    const taskDate = new Date(taskDateString);
    const formattedDate = format(taskDate,'do MMMM yyyy');
    dateDiv.textContent = `Due Date: ${formattedDate}`;

    topDiv.appendChild(titleDiv);
    topDiv.appendChild(del);

    infoDialog.appendChild(topDiv);
    infoDialog.appendChild(projectDiv);
    infoDialog.appendChild(descDiv);
    infoDialog.appendChild(prioDiv);
    infoDialog.appendChild(dateDiv);

    del.addEventListener('click', () => {
        infoDialog.close();
    });

    infoDialog.showModal();
}

function showTaskEdit(task) {
    const editDialog = document.querySelector("#task-dialog");
    const title = document.querySelector(".dialog-title");
    const add = document.querySelector("#add");

    title.textContent = "Edit Task";
    add.textContent = "Modify";
    document.getElementById("task-name").value = task.title;
    document.getElementById("task-desc").value = task.description;
    document.querySelector(`input[name="priority"][value="${task.priority}"]`).checked = true;
    document.getElementById("task-date").value = task.date;
    document.getElementById("task-projects").value = task.project;

    document.getElementById("add-form").dataset.taskId = task.id;

    editDialog.showModal();
}

export { task, showTaskInfo, showTaskEdit };
