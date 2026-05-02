class EventEmitter {
  constructor() {
    this.obj = {};
  }

  on(event, listener) {
    if (!this.obj[event]) {
      this.obj[event] = [];
    }
    this.obj[event].push(listener);
  }

  emit(event, ...args) {
    if (this.obj[event]) {
      for (let listener of this.obj[event]) {
        listener(...args);
      }
    }
  }

  off(event, listener) {
    this.obj[event] = this.obj[event].filter((lis) => lis !== listener);
  }
}

const event = new EventEmitter();

function foo() {
    console.log("clicked");
}

event.on("click", foo);

event.emit("click");
event.off('click',foo);
console.log(event.obj);