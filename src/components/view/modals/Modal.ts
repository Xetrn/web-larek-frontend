import { View } from '../View';
import { EventEmitter } from '../../base/events';

export class ModalView extends View {
	private _container: HTMLElement;
	private _actions: HTMLElement;
	private _closeButton: HTMLButtonElement;
	private _modalContainer: HTMLElement;

	constructor(events: EventEmitter) {
		super(events);

		this._container = document.querySelector('#modal-container')!;
		this._actions = this._container.querySelector('.modal__actions')!;
		this._closeButton = this._container.querySelector('.modal__close') as HTMLButtonElement;
		this._modalContainer = this._container.querySelector('.modal__container') as HTMLElement;

		this.init();
	}

	private init() {
		this._closeButton.onclick = this.closeModal.bind(this);
		this._container.onclick = this.closeModal.bind(this);
		this._modalContainer.onclick = (event) => event.stopPropagation();
	}

	private closeModal() {
		this._events.emit('modal.close');
	}

	public render({ content, opened, actions }: { opened: boolean; content?: HTMLElement; actions?: HTMLElement[] }) {
		this.updateContent(content);
		this.toggleModalState(opened);
		this.updateActions(actions);

		return this._container;
	}

	private updateContent(content?: HTMLElement) {
		const contentContainer = this._container.querySelector('.modal__content') as HTMLElement;
		if (content) {
			contentContainer.replaceChildren(content);
		} else {
			contentContainer.innerHTML = '';
		}
	}

	private toggleModalState(opened: boolean) {
		this._container.className = `modal ${opened ? 'modal_active' : ''}`;
	}

	private updateActions(actions?: HTMLElement[]) {
		if (this._actions) {
			if (actions) {
				this._actions.replaceChildren(...actions);
				this._actions.classList.remove('hidden');
			} else {
				this._actions.classList.add('hidden');
			}
		} else {
			console.error('Actions container is missing!');
		}
	}
}
