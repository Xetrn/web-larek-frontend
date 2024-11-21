import { View } from './View';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { TModalView } from '../../types';
import { VIEW_EVENTS } from '../../utils/constants';


export class ModalView extends View<TModalView> {
	private _content: HTMLElement;
	private _isOpen: boolean;

	private _closeButton: HTMLButtonElement;

	constructor(container : HTMLElement, events: IEvents) {
		super(container, events);

		this._isOpen = false;
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._closeButton.addEventListener('click', () => {
			if (this._isOpen) {
				this.toggleOpen();
			}
		});

		this.container.addEventListener('click', (event) => {
			if (event.target === event.currentTarget && this._isOpen) {
				this.toggleOpen();
			}
		});
	}

	set content(content: HTMLElement) {
		this._content.replaceChildren(content);
	}

	toggleOpen() {
		console.log(this._isOpen)
		if (!this._isOpen) {
			this.container.classList.toggle('modal_active', true);
			this.events.emit(VIEW_EVENTS.MODAL_OPEN);
		}
		else {
			this.container.classList.toggle('modal_active', false);
			this.events.emit(VIEW_EVENTS.MODAL_CLOSE);
		}

		this._isOpen = !this._isOpen;
	}
}
