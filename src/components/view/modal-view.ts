import { View } from './View';
import { EventEmitter } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { TModalView } from '../../types';


export class ModalView extends View<TModalView> {
	private _content: HTMLElement;
	isOpen: boolean;

	constructor(container : HTMLElement, events: EventEmitter) {
		super(container, events);

		this.isOpen = false;
		this._content = ensureElement<HTMLElement>('.modal__content', container);
	}

	set content(content: HTMLElement) {
		this._content.replaceChildren(content);
	}

	toggleOpen() {
		if (this.isOpen) {
			//
		}
	}
}
