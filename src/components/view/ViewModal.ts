import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

import { View } from './View';
import { IViewModal } from '../../types/index';

export class ViewModal extends View<IViewModal> implements IViewModal {
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
		this.events.emit('viewModal:open');
	}

	close() {
		this.toggleClass(this._container, 'modal_active', false);
		this.events.emit('viewModal:close');
	}
}
