import type { IProduct } from '../../../../types';
import type { IEvents } from '../../../base/events';
import { ModalPresenter } from '../../modal.presenter';
import type { IModalProps } from '../../modal.view';
import type { CardPreviewModel } from './card-preview,model';
import type { CardPreviewView } from './card-preview.view';

export class CardPreviewPresenter extends ModalPresenter {
	constructor(
		private readonly _view: CardPreviewView,
		private readonly _model: CardPreviewModel,
		private readonly _events: IEvents
	) {
		super(_view, _model, _events, 'card-preview');
	}

	override init(): void {
		super.init();

		this._events.on('card-preview:show', (data: IModalProps<IProduct>) => {
			this._model.show(data);
		});
	}
}
