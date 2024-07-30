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

export default task