import { IEvents } from "../base/events";
import { View } from "./View";

import { ensureElement } from "../../utils/utils";

export class ProductModalView extends View<string>{ 
    protected _text: HTMLElement;
    protected _button: HTMLButtonElement;
  
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)
    this._button = container.querySelector(`.card__button`);
    this._text = ensureElement<HTMLElement>(`.card__text`, container);

   
    container.removeEventListener('click', () => {
        this.events.emit('preview:open');});
    this._button.addEventListener('click', () => {
        this.events.emit('product:preview');});

  }

  set text(textValue: string) {
    this.setTextContent(this._text, textValue);
  }
}