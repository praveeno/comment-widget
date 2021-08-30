import { BaseComponent } from './core/base_component.js';

import { eventBus } from './event_bus.service.js';


export class InputTextCount extends BaseComponent {

  constructor() {
    super();
    this.render('0 / 200 words');
    eventBus.inputUpdated$.subscribe((length) => {
      this.render(length + ' / 200 words');
    });
  }
}