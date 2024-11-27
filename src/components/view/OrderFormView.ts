import { IEvents } from "../base/events";
import { View } from "./View";

import { ensureElement } from "../../utils/utils";

// Определяем типы для формы и состояния формы
interface IFormState {
    valid: boolean;
    errors: string[];
  }
  
interface IFormData {
    [key: string]: string | number | boolean;
}
  
export class OrderFormView<T> extends View<IFormState> {
    private submit: HTMLButtonElement;
    private errors: HTMLElement;
    private state: IFormState = { valid: true, errors: [] };
  
    constructor(container: HTMLFormElement, protected events: IEvents) {
      super(container);
  
      this.submit = ensureElement<HTMLButtonElement>('button[type=submit]', container);
      this.errors = ensureElement<HTMLElement>('.form__errors', container);
  
      this.addEventListeners();
    }
  
    private addEventListeners(): void {
      const inputElements = this.container.querySelectorAll('input');
      inputElements.forEach((element) => {
        element.addEventListener('input', this.handleInput.bind(this));
      });
      this.container.addEventListener('submit', this.handleSubmit.bind(this));
    }
  
    private handleInput(e: Event): void {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.events.emit('change', { field, value });
    }
  
    private handleSubmit(e: Event): void {
      e.preventDefault();
      this.events.emit('submit');
    }
  
    public update(state: Partial<IFormState> & Partial<IFormData>): void {
      Object.assign(this.state, state);
      this.updateUI();
    }
  
    private updateUI(): void {
      const { valid, errors } = this.state;
      this.updateSubmitState(valid);
      this.updateErrorsDisplay(errors);
    }
  
    private updateSubmitState(valid: boolean): void {
      this.submit.disabled = !valid;
    }
  
    private updateErrorsDisplay(errors: string[]): void {
      this.setTextContent(this.errors, errors.join(', '));
    }
  
    public render(): HTMLElement {
      return this.container;
    }
}