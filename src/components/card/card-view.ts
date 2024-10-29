import { Modal } from '../../types/base/Modal';
import { iComponent } from '../../types/base/iComponent';
import { iProduct } from '../../types/data/data';

export class CardView<T> extends Modal implements iComponent<T> {
	private _container: HTMLElement;
	private _model: T;
	private _template: HTMLElement;
	private _element: HTMLElement;
	private _buyButton: HTMLElement;
	private _deleteButton: HTMLElement;

	constructor() {
		super();
	}

	get element(): HTMLElement {
		return this._element;
	}

	get model(): T {
		return this._model;
	}

	get template(): HTMLElement {
		return this._template;
	}

	get container(): HTMLElement {
		return this._container;
	}

	render(data: object): HTMLElement {
		throw new Error('Method not implemented.');
	}

	private handleBuyButtonClick(event: MouseEvent): void {
		throw new Error('Method not implemented.');
	}
	private handelDeleteButtonClick(event: MouseEvent): void {
		throw new Error('Method not implemented.');
	}
}
