import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface ISuccessState {
    total: number;
}

export class Success extends Component<ISuccessState> {
    protected successBtn: HTMLButtonElement;
    protected _total: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.successBtn = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

        this.successBtn.addEventListener('click', () => events.emit('success:close'));
    }
    
    set total(value: number) {
        this._total.textContent = `Списано ${value} синапсов`;
    }

    render(state: ISuccessState) {
        super.render(state);
        return this.container;
    }

}