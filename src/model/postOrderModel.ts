import { Component } from '../components/base/component';
import { IPostOrder } from '../types/IState';
import { ensureElement } from '../utils/utils';


export class PostOrderModel extends Component<IPostOrder> {
	private readonly _button: HTMLButtonElement;
	private readonly _description: HTMLElement;

	constructor(
		private block: string,
		container: HTMLElement,
		action: { onClick: () => void }
	) {
		super(container);
		this._button = ensureElement<HTMLButtonElement>(
			`.${block}__close`,
			container
		);
		this._description = ensureElement<HTMLElement>(
			`.${block}__description`,
			container
		);
		this._initializeEventListeners(action);
	}

	private _initializeEventListeners(action: {onClick: () => void}): void {
		if (this._button) {
			this._button.addEventListener('click', action.onClick);
		}
	}

	set description(value: number) {
		this.setText(this._description, `Списано ${value} синапсов`);
	}
}