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

    del.src = './assets/x.svg';

    titleDiv.classList.add("title")
    topDiv.classList.add("top");
    projectDiv.classList.add("infos");
    descDiv.classList.add("infos");
    prioDiv.classList.add("infos");
    dateDiv.classList.add("infos");

    titleDiv.textContent = task.title 
    projectDiv.textContent = `Project: ${task.project}`
    descDiv.textContent = `Description: ${task.description}`
    prioDiv.textContent = `Priority: ${task.priority}`
    dateDiv.textContent = `Due Date: ${task.date}`

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

function showTaskEdit(task){
    const editDialog = document.querySelector("#task-dialog");
    //editDialog.textContent = '';

    editDialog.showModal();
}


function createProjectButton(name){
    const projectBtn = document.createElement("button");
    const leftDiv = document.createElement("div");
    const listImg = document.createElement("img");
    const xImg = document.createElement("img");
    const p = document.createElement("p");

    projectBtn.classList.add("project");
    leftDiv.classList.add("left");

    listImg.src = './assets/list.svg';
    projectBtn.id = name;
    xImg.src = './assets/x.svg';
    xImg.classList.add("x-img");
    p.textContent = name;

    xImg.addEventListener('click', () => projectBtn.remove());

    leftDiv.appendChild(listImg);
    leftDiv.appendChild(p);

    projectBtn.appendChild(leftDiv);
    projectBtn.appendChild(xImg);

    return projectBtn;
}

function addProject(name){
    const projectsDiv = document.querySelector(".projects");
    const addProjectButton = document.getElementById("add-project");
    const newProject = createProjectButton(name);

    projectsDiv.insertBefore(newProject, addProjectButton);
}


function createTaskButton(task){
    const taskButton = document.createElement("button");
    const leftDiv = document.createElement("div");
    const rightDiv = document.createElement("div");
    const box = document.createElement("div");
    const title = document.createElement("div");
    const date = document.createElement("div");
    const info = document.createElement("img");
    const edit = document.createElement("img");
    const del = document.createElement("img");

    info.src = './assets/info.svg';
    edit.src = './assets/edit.svg';
    del.src = './assets/trash.svg';

    taskButton.classList.add("task");
    leftDiv.classList.add("task-left");
    rightDiv.classList.add("task-right");
    box.classList.add("task-box");

    title.textContent = task.title;
    date.textContent = task.date;

    if (task.priority === 'High') {
        taskButton.classList.add("priority-high");
    } else if (task.priority === 'Medium') {
        taskButton.classList.add("priority-medium");
    } else {
        taskButton.classList.add("priority-low");
    }

    info.addEventListener('click', () => showTaskInfo(task));

    // edit.addEventListener('click', () => showTaskEdit(task));

    box.addEventListener('click', () => {
        box.classList.toggle('checked');
        title.classList.toggle("crossed");
        taskButton.classList.toggle("done");
    });

    del.addEventListener('click', () => taskButton.remove());

    leftDiv.appendChild(box);
    leftDiv.appendChild(title);

    rightDiv.appendChild(date);
    rightDiv.appendChild(info);
    rightDiv.appendChild(edit);
    rightDiv.appendChild(del);
    
    taskButton.appendChild(leftDiv);
    taskButton.appendChild(rightDiv);
    return taskButton;
}

function addTask(task){
    const taskDiv = document.querySelector(".tasks");
    const newTask = createTaskButton(task);
    taskDiv.appendChild(newTask)
}

class task {

    constructor(title,description,date,priority,project){
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

class project {

    constructor(name){
        this.name = name
        this.tasks = []
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(task){
        this.tasks = this.tasks.filter( item => item != task );
    }

    getAllTask(){
        return this.tasks;
    }

}

class projectManager {

    constructor(){
        this.projects = []
    }

    addProject(project){
        this.projects.push(project);
    }

    getProject(name){
        return this.projects.find(item => item.name === name);
    }

    removeProject(name){
        this.projects = this.projects.filter(item => item.name !== name )
    }

    getAllProjects(){
        return this.projects;
    }
}

class taskBuilder {
    static buildTask(task){
        addTask(task);
    }

    static buildAllTasks(project){
        project.getAllTask().forEach(task => addTask(task));
    }
}


class projectBuilder {
    static buildProject(project){
        addProject(project.name)
    }

    static buildAllProjects(projectManager){
        projectManager.getAllProject().forEach(project => addProject(project.name));
    }
}


// UI LOGIC

const addNewProject = document.getElementById("add-project");
const addNewTask = document.getElementById("add-button");
const projectDialog = document.getElementById("project-dialog");
const projectForm = document.getElementById("project-form");
const taskDialog = document.getElementById("task-dialog");
const projectSelect = document.getElementById("task-projects");
const taskForm = document.getElementById("add-form");
const manager = new projectManager();

addNewProject.addEventListener("click", () => projectDialog.showModal());
document.getElementById("close-task-dialog").addEventListener("click", () => taskDialog.close());

function populateProjectDropdown() {
    const projects = manager.getAllProjects();
    projectSelect.innerHTML = '<option value="">Select Project</option>';
    projects.forEach(project => {
        const option = document.createElement("option");
        option.value = project.name;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
}

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    projectDialog.close();
    const projectName = document.getElementById("project-name").value;
    const newProject = new project(projectName);
    manager.addProject(newProject);
    projectBuilder.buildProject(newProject);
    document.getElementById("project-name").value = '';
});

addNewTask.addEventListener("click", () => {
    populateProjectDropdown();
    taskDialog.showModal();
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    taskDialog.close();

    const name = document.getElementById("task-name").value;
    const desc = document.getElementById("task-desc").value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const date = document.getElementById("task-date").value;
    const project = document.getElementById("task-projects").value;

    const newTask = new task(name,desc,date,priority,project);    
    const addToProject = manager.getProject(project);
    addToProject.addTask(newTask);
    taskBuilder.buildTask(newTask);
    
    //clear
    document.getElementById("task-name").value = '';
    document.getElementById("task-desc").value = '';
    document.querySelector('input[name="priority"]:checked').checked = false;
    document.getElementById("task-date").value = '';
    document.getElementById("task-projects").value = '';
});










