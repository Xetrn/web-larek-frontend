import { ensureElement } from '../../utils/utils';

import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';

import { View } from './View';
import { TViewModal } from '../../types';

export class ViewModal extends View<TViewModal> {
	protected _content: HTMLElement;
	protected _buttonClose: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._content = ensureElement<HTMLElement>('.modal__content', container);
		this._buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container); //* closeBtn

		this._buttonClose.addEventListener('click', () => {
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
		this.events.emit(Events.MODAL_OPEN);
	}

	close() {
		this.toggleClass(this._container, 'modal_active', false);
		this.events.emit(Events.MODAL_CLOSE);
	}
}
