import { IEvents } from "../base/events";

export interface ISuccess {
  success: HTMLElement;
  description: HTMLElement;
  button: HTMLButtonElement;
  render(total: number): HTMLElement;
}

export class Success implements ISuccess {
  success: HTMLElement;
  description: HTMLElement;
  button: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.success = template.content.querySelector('.order-success')!.cloneNode(true) as HTMLElement;
    this.description = this.success.querySelector('.order-success__description') as HTMLElement;
    this.button = this.success.querySelector('.order-success__close') as HTMLButtonElement;

    this.button.addEventListener('click', () => events.emit('success:close'));
  }

  render(total: number): HTMLElement {
    this.description.textContent = `Списано ${total} синапсов`;
    return this.success;
  }
}
