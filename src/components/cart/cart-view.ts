import { Modal } from '../../types/base/Modal';
import { iComponent } from '../../types/base/iComponent';
import { iOrderData } from '../../types/data/data';
import { EventEmitter } from '../base/events';

export class CartView extends Modal implements iComponent {
	private readonly _container: HTMLElement;
	private readonly _events: EventEmitter;
	private readonly _template: HTMLElement;
	private readonly _element: HTMLElement;
	private _trashButton: HTMLElement;
	private _orderButton: HTMLElement;

	constructor(
		container: HTMLElement,
		event: EventEmitter,
		template: HTMLElement,
		element: HTMLElement
	) {
		super();
		this._template = template;
		this._element = element;
		this._events = event;
		this._container = container;
	}

	get element(): HTMLElement {
		return this._element;
	}
	get events(): EventEmitter {
		return this._events;
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

	private handleTrashButtonClick(): HTMLElement {
		throw new Error('Method not implemented.');
	}

	private handleOrderButtonClick(data: iOrderData): void {
		throw new Error('Method not implemented.');
	}
}
