export class BaseComponent {
  constructor(instanceId) {
    this.instanceId = instanceId || '';
    this.elementRef = document.querySelector(`[${this.constructor.name}]${this.instanceId}`);
    this.output = this.elementRef.dataset.output;

    this.elementRef.addEventListener('DOMNodeRemoved', this.destory);
  }

  render(template) {
    this.elementRef.innerHTML = template;
  }

}