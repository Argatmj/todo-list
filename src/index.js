  import './style.css';
  import addProject from './modules/project.js'

    const addNewProject = document.getElementById("add-project");
    const projectDialog = document.querySelector("#project-dialog");
    const projectForm = document.querySelector("#project-form")

    addNewProject.addEventListener("click", () => projectDialog.showModal());

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        projectDialog.close();
        const projectName = document.getElementById("project-name").value;
        addProject(projectName);
        document.getElementById("project-name").value = '';
    });