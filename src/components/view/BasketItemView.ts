import { IView } from "./View"

interface IEventEmitter {
    emit: (event: string, data: unknown) => void;
}

export class BasketItemView implements IView {

    // элементы внутри контейнера
    protected title: HTMLSpanElement;
    protected addButton: HTMLButtonElement;
    protected removeButton: HTMLButtonElement;

    // данные, которые хотим сохранить на будущее
    protected id: string | null = null;

    constructor(protected container: HTMLElement, protected events: IEventEmitter) {
        this.title = container.querySelector('.basket-item__title') as HTMLSpanElement;
        this.addButton = container.querySelector('.basket-item__add') as HTMLButtonElement;
        this.removeButton = container.querySelector('.basket-item__remove') as HTMLButtonElement;
        
        this.addButton.addEventListener('click', () => {
            this.events.emit('ui:basket-add', { id: this.id });
        });

        this.addButton.addEventListener('click', () => {
            this.events.emit('ui:basket-remove', { id: this.id });
        });
    }

    render(data: { id: string, title: string }) {
        if (data) {
            this.id = data.id;
            this.title.textContent = data.title;
        }
        return this.container;
    }
}