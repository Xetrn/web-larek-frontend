import { EventEmitter } from "../base/events";
import { View } from "./View";
import { ModalView } from "./ModalView";

import { ensureElement } from "../../utils/utils";

export class ProductModalView extends ModalView{ 
    protected _text: HTMLElement;
    protected _button: HTMLButtonElement;
  
  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events);

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