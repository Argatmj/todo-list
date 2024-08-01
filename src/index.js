import "./style.css";
import list from "./assets/list.svg";
import x from "./assets/x.svg";
import infoImg from "./assets/info.svg";
import editImg from "./assets/edit.svg";
import delImg from "./assets/trash.svg";
import { format } from 'date-fns';
import { task, showTaskEdit, showTaskInfo } from "./modules/task";
import { project } from "./modules/project";
import { projectManager } from "./modules/projectManager";

const home = document.getElementById("home");
const today = document.getElementById("today");
const week = document.getElementById("week");
const title = document.getElementById("content-title");
const addNewProject = document.getElementById("add-project");
const addNewTask = document.getElementById("add-button");
const projectDialog = document.getElementById("project-dialog");
const projectForm = document.getElementById("project-form");
const taskDialog = document.getElementById("task-dialog");
const projectSelect = document.getElementById("task-projects");
const taskForm = document.getElementById("add-form");
const manager = new projectManager();

document.addEventListener("DOMContentLoaded", () => {
  manager.loadFromLocalStorage();
  projectBuilder.buildAllProjectsFromManager(manager);
  homePage();
});

function homePage() {
  title.textContent = "Todo's";
  deselectAllButtons();
  home.classList.add("selected");
  clearTaskContainer();
  populateProjectDropdown();
  const allProjects = manager.getAllProjects();
  allProjects.forEach((project) => {
    taskBuilder.buildAllTasksFromProject(project);
  });
}

addNewProject.addEventListener("click", () => projectDialog.showModal());
document
  .getElementById("close-task-dialog")
  .addEventListener("click", () => taskDialog.close());

function populateProjectDropdown() {
  const projects = manager.getAllProjects();
  projectSelect.innerHTML = '<option value="">Select Project</option>';
  projects.forEach((project) => {
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
  document.getElementById("project-name").value = "";
  manager.saveToLocalStorage();
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
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  const date = document.getElementById("task-date").value;
  const project = document.getElementById("task-projects").value;
  const taskId = document.getElementById("add-form").dataset.taskId;

  if (taskId) {
    const taskToUpdate = manager
      .getAllProjects()
      .flatMap((project) => project.getAllTask())
      .find((task) => task.id === parseInt(taskId));
    taskToUpdate.title = name;
    taskToUpdate.description = desc;
    taskToUpdate.priority = priority;
    taskToUpdate.date = date;
    taskToUpdate.project = project;

    const taskButton = document.getElementById(`task-${taskId}`);
    const title = document.querySelector(".dialog-title");
    const add = document.querySelector("#add");

    title.textContent = "Add New Task";
    add.textContent = "Add";
    taskButton.querySelector(".task-left div:nth-child(2)").textContent = name;
    taskButton.querySelector(".task-right div:nth-child(1)").textContent = date;

    taskButton.className = "task";
    if (priority === "High") {
      taskButton.classList.add("priority-high");
    } else if (priority === "Medium") {
      taskButton.classList.add("priority-medium");
    } else {
      taskButton.classList.add("priority-low");
    }
  } else {
    const newTask = new task(name, desc, date, priority, project);
    const addToProject = manager.getProject(project);
    addToProject.addTask(newTask);
    taskBuilder.buildTask(newTask);
    manager.saveToLocalStorage();
  }

  document.getElementById("task-name").value = "";
  document.getElementById("task-desc").value = "";
  document.querySelector('input[name="priority"]:checked').checked = false;
  document.getElementById("task-date").value = "";
  document.getElementById("task-projects").value = "";
});

function getTasksWithinDays(days) {
  const currentDay = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDay.getDate() + days);

  currentDay.setHours(0, 0, 0, 0);
  futureDate.setHours(23, 59, 59, 999);

  const allTasks = [];
  const allProjects = manager.getAllProjects();
  allProjects.forEach((project) => {
    allTasks.push(...project.getAllTask());
  });

  return allTasks.filter((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate >= currentDay && taskDate <= futureDate;
  });
}

function deselectAllButtons() {
  home.classList.remove("selected");
  today.classList.remove("selected");
  week.classList.remove("selected");
}

function clearTaskContainer() {
  const taskDiv = document.querySelector(".tasks");
  taskDiv.innerHTML = "";
}

home.addEventListener("click", () => {
  homePage();
});

today.addEventListener("click", () => {
  title.textContent = "Today Todo's";
  deselectAllButtons();
  today.classList.add("selected");
  clearTaskContainer();
  const todayTasks = getTasksWithinDays(0);
  taskBuilder.buildAllTasks(todayTasks);
});

week.addEventListener("click", () => {
  title.textContent = "This Week Todo's";
  deselectAllButtons();
  week.classList.add("selected");
  clearTaskContainer();
  const weekTasks = getTasksWithinDays(7);
  taskBuilder.buildAllTasks(weekTasks);
});

function createProjectButton(name) {
  const projectBtn = document.createElement("button");
  const leftDiv = document.createElement("div");
  const listImg = document.createElement("img");
  const xImg = document.createElement("img");
  const p = document.createElement("p");

  projectBtn.classList.add("project");
  leftDiv.classList.add("left");

  listImg.src = list;
  projectBtn.id = name;
  xImg.src = x;
  xImg.classList.add("x-img");
  p.textContent = name;

  xImg.addEventListener("click", () => {
    manager.removeProject(name);
    projectBtn.remove();
    manager.saveToLocalStorage();
  });

  projectBtn.addEventListener("click", () => {
    title.textContent = `${name} Todo's`;
    clearTaskContainer();
    deselectAllButtons();
    const pName = manager.getProject(name);
    if(pName){
    taskBuilder.buildAllTasksFromProject(pName);
    }else{
      homePage();
    }
  });

  leftDiv.appendChild(listImg);
  leftDiv.appendChild(p);

  projectBtn.appendChild(leftDiv);
  projectBtn.appendChild(xImg);

  return projectBtn;
}

function addProjectButton(name) {
  const projectsDiv = document.querySelector(".projects");
  const newProject = createProjectButton(name);

  projectsDiv.appendChild(newProject);
}

function createTaskButton(task) {
  const taskButton = document.createElement("button");
  const leftDiv = document.createElement("div");
  const rightDiv = document.createElement("div");
  const box = document.createElement("div");
  const title = document.createElement("div");
  const date = document.createElement("div");
  const info = document.createElement("img");
  const edit = document.createElement("img");
  const del = document.createElement("img");

  taskButton.id = `task-${task.id}`;

  info.src = infoImg;
  edit.src = editImg;
  del.src = delImg;

  taskButton.classList.add("task");
  leftDiv.classList.add("task-left");
  rightDiv.classList.add("task-right");
  box.classList.add("task-box");

  title.textContent = task.title;
  const taskDateString = task.date; 
  const taskDate = new Date(taskDateString);
  const formattedDate = format(taskDate, 'do MMMM yyyy');
  date.textContent = formattedDate;

  if (task.priority === "High") {
    taskButton.classList.add("priority-high");
  } else if (task.priority === "Medium") {
    taskButton.classList.add("priority-medium");
  } else {
    taskButton.classList.add("priority-low");
  }

  if (task.isCompleted) {
    box.classList.toggle("checked");
    title.classList.toggle("crossed");
    taskButton.classList.toggle("done");
  }

  info.addEventListener("click", () => showTaskInfo(task));

  edit.addEventListener("click", () => showTaskEdit(task));

  box.addEventListener("click", () => {
    box.classList.toggle("checked");
    title.classList.toggle("crossed");
    taskButton.classList.toggle("done");
    task.toggleComplete();
    manager.saveToLocalStorage();
  });

  del.addEventListener("click", () => {
    const project = manager.getProject(task.project);
    project.removeTask(task);
    taskButton.remove();
    manager.saveToLocalStorage();
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

function addTaskButton(task) {
  const taskDiv = document.querySelector(".tasks");
  const newTask = createTaskButton(task);
  taskDiv.appendChild(newTask);
}

class taskBuilder {
  static buildTask(task) {
    addTaskButton(task);
  }

  static buildAllTasksFromProject(project) {
    project.getAllTask().forEach((task) => addTaskButton(task));
  }

  static buildAllTasks(tasks) {
    tasks.forEach((task) => addTaskButton(task));
  }
}

class projectBuilder {
  static buildProject(project) {
    addProjectButton(project.name);
  }

  static buildAllProjectsFromManager(manager) {
    manager
      .getAllProjects()
      .forEach((project) => addProjectButton(project.name));
  }
}
