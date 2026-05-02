const EventEmitter = require('events')

class taskManager extends EventEmitter {

    #completedTasks = 0;

    constructor() {
        super();
    }

    addTask(name) {
        console.log(`Task added ${name}`);
        this.emit('taskAdded', name);
    }
    
    completeTask(name) {
        this.#completedTasks++;
        this.emit('taskCompleted', name, this.#completedTasks);
    }
} 

module.exports = taskManager