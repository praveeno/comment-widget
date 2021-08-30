export class EventBus {
  static listeners = {};

  constructor() {
    // return this.singleton();
    return this.updateInstance();
  }

  handler(eventName) {
    return new Proxy([], {
      get: (target, prop, __) => {
        if (['subscribe', 'emit'].includes(prop)) {
          return this[prop].bind(this, eventName);
        } else if (prop === 'push') {
          return args => target.push(args)
        } else if ([][prop]) { // if prop is a method of array
          return function(args) {
            return [][prop].call(target, args)
          }
        }
        throw ReferenceError(`${prop} is not a function`);
      },
    })
  }

  updateInstance() {
    return new Proxy(this, {
      get: (_, prop, __) => {
        if (!EventBus.listeners[prop]) {
          EventBus.listeners[prop] =  this.handler(prop)
        }

        return EventBus.listeners[prop];
      },
    });
  }
  singleton() {
    if (this.constructor.instance === undefined) {
      this.constructor.instance = this.updateInstance();
    }
    return this.constructor.instance;
  }

  subscribe(eventName, listener) {
    const listeners = EventBus.listeners;
    listeners[eventName].push(listener);
    return {
      unsubscribe: () => this.unsubscribe(eventName, listener)
    }
  }

  unsubscribe(eventName, listener) {
    const listeners = EventBus.listeners;
    const index = listeners[eventName].indexOf(listener);
    if (index > -1) {
      listeners[eventName].splice(index, 1);
    }
  }

  emit(eventName, ...args) {
    EventBus.listeners[eventName].forEach(listener => listener(...args));
  }
}

export const eventBus = new EventBus();
window.eventBus = eventBus;