import { IEvents } from '../base/events';
import { CatalogView } from './catalog';
import { Modal } from './modal';
import { AppData } from '../../types/data/app';

export class App {
	public readonly catalogView: CatalogView;
	public modal: Modal<unknown>;

	private catalogElement: HTMLElement;
	private modalElement: HTMLElement;

	constructor(protected events: IEvents) {
		this.catalogView = new CatalogView(this.events);
	}

	render(data: AppData): void {
		const catalog = this.catalogView.renderWithCache(data.catalogData);

		if (this.catalogElement !== catalog) {
			this.catalogElement?.remove();
			document.body.append(catalog);
			this.catalogElement = catalog;
		}

		if (this.modal && data.modalData !== undefined) {
			const modal = this.modal.renderWithCache(data.modalData);

			if (this.modalElement !== modal) {
				this.modalElement?.remove();
				document.body.append(modal);
				this.modalElement = modal;
			}
		} else {
			this.modalElement?.remove();
		}
	}
}
