import { BaseComponent } from "./core/base_component.js";
import { eventBus } from "./event_bus.service.js";

export class AddComment extends BaseComponent {
  constructor(instanceId) {
    super(instanceId);
    this.registerEvent(this.elementRef);
  }

  registerEvent(input) {
    input.addEventListener('keydown', (ev) => {
      if (ev.keyCode === 13) {
        const comment = input.value;
        this.addComment(comment, null);
        input.value = '';
      }

      this.checkInputLimit(ev);

      eventBus.inputUpdated$.emit(input.value.length);
    });
    input.addEventListener('blur', (ev) => {
      eventBus.inputUpdated$.emit(input.value.length);
    });
  }

  checkInputLimit(ev) {
    if (ev.target.value.length > 200) {
      ev.target.value = ev.target.value.substr(0, 200)
      ev.preventDefault();
    }
  }

  addComment(commentContent) {
    eventBus.commentAdded$.emit({content: commentContent});
  }
}