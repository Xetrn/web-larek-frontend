import {IView} from "./view";
import {EventEmitter} from "../base/events";
import {createElement} from "../../utils/utils";
import {IOrder} from "../../types";


export class OrderView implements IView {
    protected _orderValues: IOrder;
    constructor(protected _events: EventEmitter) {
        this._orderValues = {
            payment: '',
            address: ''
        };
    }

    render() {
        const container = createElement<HTMLFormElement>('form', {
            className: 'form'
        })

        const order = createElement<HTMLDivElement>('div', {
            className: 'order'
        })

        const orderField = createElement<HTMLDivElement>('div', {
            className: 'order__field'
        })

        const orderTitle = createElement<HTMLElement>('h2', {
            className: 'modal__title',
            textContent: 'Способ оплаты'
        })

        const orderButtons = createElement<HTMLDivElement>('div', {
            className: 'order__buttons'
        })

        const cardButton = createElement<HTMLButtonElement>('button', {
            className: 'button button_alt',
            type: 'button',
            textContent: 'Онлайн'
        })
        cardButton.onclick = () => {
            cardButton.classList.add('button_alt-active')
            cashButton.classList.remove('button_alt-active')
            this._orderValues.payment = 'card';
            toggleNextButton();
        }

        const cashButton = createElement<HTMLButtonElement>('button', {
            className: 'button button_alt',
            type: 'button',
            textContent: 'При получении'
        })
        cashButton.onclick = () => {
            cashButton.classList.add('button_alt-active')
            cardButton.classList.remove('button_alt-active')
            this._orderValues.payment = 'cash';
            toggleNextButton();
        }

        orderButtons.append(cardButton, cashButton)
        orderField.append(orderTitle, orderButtons)

        const secondOrderField = createElement<HTMLLabelElement>('label', {
            className: 'order__field'
        })

        const orderSpan = createElement<HTMLSpanElement>('span', {
            className: 'form__label modal__title',
            textContent: 'Адрес доставки'
        })

        const inputOrder = createElement<HTMLInputElement>('input', {
            className: 'form__input',
            type: 'text',
            placeholder: 'Введите адрес'
        })

        inputOrder.oninput = (event) => {
            const target = event.target as HTMLInputElement;
            this._orderValues.address = target.value.trim();
            toggleNextButton();
        }

        secondOrderField.append(orderSpan, inputOrder)
        order.append(orderField, secondOrderField)

        const modalActions = createElement<HTMLDivElement>('div', {
            className: 'modal__actions'
        })

        const nextBtn = createElement<HTMLButtonElement>('button', {
            className: 'button',
            textContent: 'Далее'
        })
        nextBtn.onclick = () => {
            this._events.emit("contacts:open")
            cardButton.classList.remove('button_alt-active')
            cashButton.classList.remove('button_alt-active')
            console.log(this._orderValues)
        }

        const toggleNextButton = () => {
            const isFormValid: boolean = this._orderValues.payment && this._orderValues.address.length > 0;
            nextBtn.disabled = !isFormValid;
            nextBtn.textContent = isFormValid ? 'Далее' : 'Сначала заполните все поля';
        };
        //изначально кнопка отключена
        toggleNextButton();

        modalActions.append(nextBtn)

        container.append(order, modalActions)
        return container
    }
}