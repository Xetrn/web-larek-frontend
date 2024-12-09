import { Actions } from '../../utils/constants';
import EventEmitter from '../base/events';
import ProductsModel from '../models/ProductsModel';
import IView from '../views/IView';
import { Product, ProductsList, CartItem } from '../../types';
import Api from '../base/api';
import ModalView from '../views/ModalView';
import OrderModel from '../models/OrderModel';
import { CDN_URL } from '../../utils/constants';

class ProductsController {
	constructor(
		private readonly events: EventEmitter,
		private readonly model: ProductsModel,
		private readonly api: Api,
		private readonly orderModel: OrderModel,
		private readonly catalogView: IView,
		private readonly productModalView: ModalView,
		private cartButtonCounter: HTMLSpanElement
	) {
		this.cartButtonCounter.textContent = String(this.orderModel.count);

		this.events.on(Actions.CATALOG_CHANGE, this.renderCatalog.bind(this));
		this.events.on(Actions.MODAL_CARD_OPEN, this.renderCardModal.bind(this));
		this.events.on(Actions.CART_ADD, this.addToCart.bind(this));

		this.fetchAndSetProducts();
	}

	async fetchAndSetProducts() {
		try {
			const apiProducts = (await this.api.get('/product/')) as ProductsList;

			const updatedProducts = apiProducts.items.map((product) => ({
				...product,
				image: `${CDN_URL}${product.image}`,
			}));

			this.model.set({ ...apiProducts, items: updatedProducts });
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	}

	renderCatalog(products: Product[]) {
		this.catalogView.render(products);
	}

	renderCardModal(product: Product) {
		const isInCart = this.orderModel.getIds().includes(product.id);
		this.productModalView.render({ item: product, isInCart });
	}

	addToCart(item: CartItem) {
		this.orderModel.addItem(item);
		this.cartButtonCounter.textContent = String(this.orderModel.count);
	}
}

export default ProductsController;
