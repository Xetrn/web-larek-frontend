import { IEvents } from './events';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { IModal } from '../../types/IModal';

export class Modal extends Component<IModal> {
	private _closeBtn: HTMLButtonElement;
	private _content: HTMLElement;

	constructor(container: HTMLElement, private eventEmitter: IEvents) {
		super(container);
		this._closeBtn = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);
		this._initializeEventListeners();
	}

	private _initializeEventListeners(): void {
		this._closeBtn.addEventListener('click', () => this.close());
		this.container.addEventListener('click', () => this.close());
		this._content.addEventListener('click', (e) => e.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open(): void {
		this.container.classList.add('modal_active');
		this.eventEmitter.emit('modal:open');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.eventEmitter.emit('modal:close');
	}

	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}