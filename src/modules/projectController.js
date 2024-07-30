import listImage from '../assets/list.svg'
import xImage from '../assets/x.svg'

function createButton(name){
    const projectBtn = document.createElement("button");
    const leftDiv = document.createElement("div");
    const listImg = document.createElement("img");
    const xImg = document.createElement("img");
    const p = document.createElement("p");

    projectBtn.classList.add("project");
    leftDiv.classList.add("left");

    listImg.src = listImage;
    projectBtn.id = name;
    xImg.src = xImage;
    p.textContent = name;

    xImg.addEventListener('click', () => projectBtn.remove());

    leftDiv.appendChild(listImg);
    leftDiv.appendChild(p);

    projectBtn.appendChild(leftDiv);
    projectBtn.appendChild(xImg);

    return projectBtn;
}

export default function addProject(name){
    const projectsDiv = document.querySelector(".projects");
    const addProjectButton = document.getElementById("add-project");
    const newProject = createButton(name);

    projectsDiv.insertBefore(newProject, addProjectButton);
}