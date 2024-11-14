import { IEventEmitter, IOrder, IProductModel } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { IView } from "./view";

export class OrderView implements IView {
    constructor(protected _events: IEventEmitter, protected products: IProductModel[], protected total: number) {}

    private generateOrderId(): string {
        return 'order-' + Math.random().toString(36).substr(2, 9);
    }

    render() {
        const container = cloneTemplate('#order') as HTMLElement;

        const adressInput: HTMLInputElement = container.querySelector('.form__input');
        const altButtons: NodeListOf<HTMLButtonElement> = container.querySelectorAll('.button_alt');
        const actionButton: HTMLButtonElement = container.querySelector('.modal__actions button');

        const updateActionButtonState = () => {
            actionButton.disabled = !(adressInput.value.trim() !== '' && Array.from(altButtons).some(button => button.classList.contains('button_alt-active')));
        };


        altButtons.forEach(button => {
            button.addEventListener('click', () => {
                altButtons.forEach(btn => {
                    if (btn !== button) {
                        btn.classList.remove('button_alt-active'); 
                    }
                });
                button.classList.toggle('button_alt-active'); 
                updateActionButtonState();
            });
        });

        adressInput.addEventListener('input', updateActionButtonState);

        container.querySelector('.modal__actions button').addEventListener('click', () => {
            const order: IOrder = {
                id: this.generateOrderId(),
                payment: container.querySelector('.button_alt-active').textContent || '',
                mail: '',
                phone: '',
                address: adressInput.value,
                total: this.total,
                products: this.products
            };
            this._events.emit("order:next-button-click", order);
        });

        return container;
    }
}