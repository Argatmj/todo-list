import { task } from "./task";

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

export { project };