import { IEvents } from '../base/events';
import { CatalogView } from './catalog';
import { Modal } from './modal';
import { AppData } from '../../types/data/app';

export class App {
	public readonly catalogView: CatalogView;
	public modal: Modal<unknown>;

	constructor(protected events: IEvents) {
		this.catalogView = new CatalogView(this.events);
	}

	render(data: AppData): void {
		const elements = [this.catalogView.renderWithCache(data.catalogData)];

		if (this.modal && data.modalData !== undefined) {
			elements.push(this.modal.renderWithCache(data.modalData));
		}

		document.body.replaceChildren(...elements);
	}
}
