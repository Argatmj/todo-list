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
        this.tasks = this.tasks.filter( item => item != task )
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
}

class taskBuilder {
    static buildTask(task){

    }

    static buildAllTasks(tasks){

    }
}

class projectBuilder {
    static buildProject(project){

    }

    static buildAllProjects(projects){

    }
}



