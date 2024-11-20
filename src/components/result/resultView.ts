import { iComponent } from '../../types/base/iComponent';
import { EventEmitter } from '../base/events';
import { Component } from '../base/component';
import { iApiProducts, iResultOrder } from '../../types/data/data';
import { Modal } from '../base/Modal';

const resultViewSelectors = {
	total: '.order-success__description',
	button: '.order-success__close',
};

export class ResultView extends Modal<iResultOrder> {
	#closeButton: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		events: EventEmitter,
		template: HTMLElement
	) {
		super(container, events, template);

		this._container = container.querySelector('.modal__content');
	}

	set total(total: number) {
		this.container.innerHTML = '';
		this._container.appendChild(this._template);
		this.#closeButton = this._container.querySelector(
			resultViewSelectors.button
		) as HTMLButtonElement;

		this.#closeButton.addEventListener('click', () => this.handleFormClose());

		this.setText(
			this.container.querySelector(resultViewSelectors.total),
			'Списано ' + total + ' Синапсов'
		);
		console.log(1);
		this.openModal();
	}

	handleFormClose = () => {
		this.closeModal();
	};
}
