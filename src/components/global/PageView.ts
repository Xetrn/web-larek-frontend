import { TViewConstructionArgs, AbstractView } from '../base/AbstractView';

type TPageRenderArgs = {
	isLocked: boolean;
};

class PageView extends AbstractView<HTMLElement, TPageRenderArgs> {
	protected _wrapperElement: HTMLElement;

	constructor(args: TViewConstructionArgs) {
		super(args);

		this._wrapperElement = this._element.querySelector('.page__wrapper');
	}

	set isLocked(value: boolean) {
		this._wrapperElement.classList.toggle('page__wrapper_locked', value);
	}
}

export { PageView, TPageRenderArgs };
