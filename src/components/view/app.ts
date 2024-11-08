import { IEvents } from '../base/events';
import { CatalogView } from './catalog';
import { Modal } from './modal';
import { Product } from '../../types/product';
import { AppData } from '../../types/view/app';

export class App {
	public catalogView: CatalogView;
	public modal: Modal<unknown>;

	public products: Product[];

	constructor(protected events: IEvents) {
		this.catalogView = new CatalogView(this.events);
	}

	render(data: AppData): void {
		const elements = [this.catalogView.render(data.catalogData)];

		if (this.modal) {
			elements.push(this.modal.render(data.modalData));
		}

		document.body.replaceChildren(...elements);
	}
}
