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

    box.addEventListener('click', () => {
        box.classList.toggle('checked');
        title.classList.toggle("crossed");
        taskButton.classList.toggle("done");
    });

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

    constructor(title,description,dueData,priority){
        this.title = title;
        this.description = description;
        this.dueData = dueData;
        this.priority = priority;
        this.isCompleted = false;
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
        return this.projects.filter(item => item.name === name );
    }

    removeProject(name){
        this.projects = this.projects.filter(item => item.name !== name )
    }

    getAllProject(){
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

const taskOne = new task("Go Gym","gym","12/1/22","High");
const taskTwo = new task("Go Sleep","sleep","12/1/22","Medium");

const projectOne = new project("new Project");
projectOne.addTask(taskOne);
projectOne.addTask(taskTwo);

const manager = new projectManager();
manager.addProject(projectOne);


projectBuilder.buildAllProjects(manager);
taskBuilder.buildAllTasks(projectOne);









