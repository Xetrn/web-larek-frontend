import { IView } from './view';

export class CatalogView implements IView {
	protected container: HTMLElement;

	constructor() {
		this.container = document.querySelector('.gallery') as HTMLElement;
	}

	render({ products }: { products: HTMLButtonElement[] }) {
		this.container.replaceChildren(...products);

		return this.container;
	}
}
