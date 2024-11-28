import type { IProducts, IView } from '../../../types';
import { ensureElement } from '../../../utils/utils';
import type { IEvents } from '../../base/events';

export class BasketButton implements IView {
	private _counter: HTMLSpanElement;

	constructor(
		private readonly _button: HTMLButtonElement,
		private readonly _events: IEvents
	) {
		this._counter = ensureElement<HTMLSpanElement>(
			'.header__basket-counter',
			this._button
		);

		this._button.onclick = () => {
			this._events.emit('basket:show');
		};

		this._events.on('basket:change', (products: IProducts) => {
			this._counter.textContent = products.length.toString();
		});
	}

	render(): HTMLElement {
		return this._button;
	}
}
