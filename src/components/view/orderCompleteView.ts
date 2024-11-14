import { IEventEmitter } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { IView } from "./view";

export class OrderCompleteView implements IView {
	constructor(protected _events: IEventEmitter) {}
	render(data: {totalPrice: number}) {
		const container = cloneTemplate('#success') as HTMLElement;

        container.querySelector('.order-success__description').textContent = `Списано ${data.totalPrice} синапсов`;
        
        container.querySelector('.order-success__close').addEventListener('click', () => this._events.emit("success:close"));
		return container;
	}
    
}

