import { project } from "./project";
import { task } from "./task";

class projectManager {
  constructor() {
    this.projects = [];
    this.loadFromLocalStorage();
  }

  addProject(newProject) {
    this.projects.push(newProject);
    this.saveToLocalStorage();
  }

  removeProject(name) {
    this.projects = this.projects.filter(proj => proj.name !== name);
    this.saveToLocalStorage();
  }

  getProject(name) {
    return this.projects.find(proj => proj.name === name);
  }

  getAllProjects() {
    return this.projects;
  }

  saveToLocalStorage() {
    const data = this.projects.map(proj => ({
      name: proj.name,
      tasks: proj.getAllTask().map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        date: task.date,
        priority: task.priority,
        project: task.project,
        isCompleted: task.isCompleted
      }))
    }));
    localStorage.setItem('projects', JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('projects'));
    if (data) {
      this.projects = data.map(projectData => {
        const newProject = new project(projectData.name);
        projectData.tasks.forEach(taskData => {
          const newTask = new task(
            taskData.title,
            taskData.description,
            taskData.date,
            taskData.priority,
            taskData.project
          );
          newTask.id = taskData.id;
          newTask.isCompleted = taskData.isCompleted;
          newProject.addTask(newTask);
        });
        return newProject;
      });
    }
  }
}

export { projectManager };
