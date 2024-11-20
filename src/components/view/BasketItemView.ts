import { EventEmitter } from "../base/events";
import { IView } from "./View";

export class BasketItemView implements IView {
    protected title: HTMLSpanElement;
    protected removeButton: HTMLButtonElement;

    protected id: string | null = null;

    constructor(protected container: HTMLElement, protected events: EventEmitter) {
        this.title = container.querySelector('.card__title') as HTMLSpanElement;
        this.removeButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;

        this.removeButton.addEventListener('click', () => {
            this.events.emit('ui:remove-basket', {id: this.id})
        });

    }
    render(data?: {id: string, title: string}): HTMLElement {
        if (data) {
            this.id = data.id;
            this.title.textContent = data.title;
        }

        return this.container;
    }
}