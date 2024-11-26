import { IEvents } from './events';
import { ensureElement } from '../../utils/utils';
import { Component } from './component';
import { IModal } from '../../types/modal';

export class Modal extends Component<IModal> {
	protected _closeBtn: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected eventEmitter: IEvents) {
		super(container);
		this._closeBtn = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeBtn.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (e) => e.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.eventEmitter.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.eventEmitter.emit('modal:close');
	}

	render(data: IModal): HTMLElement {
		console.log(data);
		super.render(data);
		this.open();
		return this.container;
	}
}
