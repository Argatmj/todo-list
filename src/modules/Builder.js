export class taskBuilder {
    static buildTask(task){
        addTaskButton(task);
    }

    static buildAllTasksFromProject(project){
        project.getAllTask().forEach(task => this.buildTask(task));
    }

    static buildAllTasks(tasks){
        tasks.forEach(task => this.buildTask(task));
    }

}

export class projectBuilder {
    static buildProject(project){
        addProjectButton(project.name)
    }

    static buildAllProjectsFromManager(manager){
        manager.getAllProject().forEach(project => this.buildProject(project.name));
    }
}