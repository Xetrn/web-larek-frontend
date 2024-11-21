import { ensureElement } from '../../utils/utils';

import { IEvents } from '../base/events';
import { EventsNames } from '../../utils/constants';

import { View } from './View';
import { TModalView } from '../../types';

export class ModalView extends View<TModalView> {
	protected _content: HTMLElement;
	protected _closeBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._content = ensureElement<HTMLElement>('.modal__content', container);
		this._closeBtn = ensureElement<HTMLButtonElement>('.modal__close', container);

		this._closeBtn.addEventListener('click', () => {
			this.close();
		});

		this._container.addEventListener('click', (evt) => {
			const clickedElement = evt.target;
			const containerElement = evt.currentTarget;

			// Проверяем, что клик был сделан именно на контейнере модального окна, а не на его содержимом
			if (clickedElement === containerElement) {
				this.close();
			}
		});
	}

	set content(node: HTMLElement) {
		this._content.replaceChildren(node);
	}

	open() {
		this.toggleClass(this._container, 'modal_active', true);
		this.events.emit(EventsNames.MODAL_OPENED);
	}

	close() {
		this.toggleClass(this._container, 'modal_active', false);
		this.events.emit(EventsNames.MODAL_CLOSED);
	}
}
