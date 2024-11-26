import { Component } from '../base/component';
import { ISuccess } from '../../types/success';
import { ensureElement } from '../../utils/utils';

interface ISuccessAction {
	onClick: () => void;
}

export class SuccessOrder extends Component<ISuccess> {
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		action: ISuccessAction
	) {
		super(container);

		this._button = ensureElement<HTMLButtonElement>(
			`.${blockName}__close`,
			container
		);
		this._description = ensureElement<HTMLElement>(
			`.${blockName}__description`,
			container
		);

		if (action?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', action.onClick);
			}
		}
	}

	set description(value: number) {
		this.setText(this._description, `Списано ${value} синапсов`);
	}
}
