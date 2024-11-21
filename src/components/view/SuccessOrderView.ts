import { View } from "./View";
import { createElement } from "../../utils/utils";

export class OrderSuccessModalView extends View {
    render({ total }: { total: number }) {
        const order = createElement('div', {
            className: 'order-success',
            children: [
                createElement('h2', { className: 'order__title', textContent: 'Заказ оформлен' }),
                createElement('p', { className: 'order__description', textContent: `Списано ${total} синапсов` }),
                this.createCloseButton(),
            ],
        });
        return order;
    }

    private createCloseButton() {
        return createElement('button', {
            className: 'button order-success__close',
            textContent: 'За новыми покупками!',
            onclick: () => this._events.emit('order-success-view:close'),
        });
    }
}