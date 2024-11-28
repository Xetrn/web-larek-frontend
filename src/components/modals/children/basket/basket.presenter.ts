import type { IProducts } from '../../../../types';
import type { IEvents } from '../../../base/events';
import { ModalPresenter } from '../../modal.presenter';
import type { BasketModel } from './basket.model';
import type { BasketView } from './basket.view';

export class BasketPresenter extends ModalPresenter {
	constructor(
		private readonly _view: BasketView,
		private readonly _model: BasketModel,
		events: IEvents
	) {
		super(_view, _model, events, 'basket');
	}

	override init(): void {
		super.init();
		this.events.on('basket:show', () => this.model.show());
		this.events.on('basket:add', ({ id }: { id: string }) =>
			this._model.addItem(id)
		);
		this.events.on('basket:remove', ({ id }: { id: string }) =>
			this._model.removeItem(id)
		);
		this.events.on('basket:change', (products: IProducts) =>
			this._view.updateItems(products)
		);
		this.events.on('basket:order', () => this._model.nextStep());
		this.events.on('basket:clear', () => this._model.clear());
	}
}
