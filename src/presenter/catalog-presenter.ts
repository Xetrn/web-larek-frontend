import { CatalogView } from '../components/view/catalog-view';
import { ProductView } from '../components/view/product-view';
import { CatalogModel } from '../model';

export class CatalogPresenter {
	protected catalogModel: CatalogModel;
	private catalogView = new CatalogView();

	constructor({ catalogModel }: { catalogModel: CatalogModel }) {
		this.catalogModel = catalogModel;
	}

	render() {
		const products = this.catalogModel.products;

		this.catalogView.render({
			items: products.map((product) => new ProductView().render(product)),
		});
	}
}
