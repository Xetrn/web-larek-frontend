import { IView } from './view';

export class CatalogView implements IView {

	constructor(protected container: HTMLElement) {
	}

	render({ products }: { products: HTMLElement[] }) {
		this.container.replaceChildren(...products);

		return this.container;
	}
}