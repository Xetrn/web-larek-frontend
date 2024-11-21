import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CartModel } from './models/CartModel';
import { OrderModel } from './models/OrderModel';
import { ProductsModel } from './models/ProductsModel';
import { Product, ProductList } from './types';
import { CatalogView } from './components/view/Catalog';
import { ProductView } from './components/view/Product';
import { API_URL } from './utils/constants';
import { ModalView } from './components/view/modals/Modal';
import { ProductModalView } from './components/view/modals/ProductModal';
import { CartModalView } from './components/view/modals/CartModal';
import { OpenCartButtonView } from './components/view/OpenCartButton';
import { CartPayModal } from './components/view/modals/CartPayModal';
import { CartContactsModalView } from './components/view/modals/CartContactsModal';
import { SuccessOrderModalView } from './components/view/modals/SuccessOrderModal';
import { ShopAPI } from './components/base/shop-api';

const api = new ShopAPI(API_URL);
const events = new EventEmitter();
const cartModel = new CartModel(events);
const orderModel = new OrderModel(events);
const productsModel = new ProductsModel(events);

const catalogView = new CatalogView(events);
const modalView = new ModalView(events);
const openCartButtonView = new OpenCartButtonView(events);

const renderModal = (content: any, actions?: any) => {
	modalView.render({ opened: true, content, actions });
};

const handleProductChange = (products: Product[]) => {
	catalogView.render({
		items: products.map((product) => new ProductView(events).render(product)),
	});
};

const handleProductClick = (product: Product) => {
	renderModal(
		new ProductModalView(events).render({
			product,
			inBasket: cartModel.getIsInCart(product),
		})
	);
};

const handleProductAdd = ({ product }: { product: Product }) => {
	cartModel.addItem(product);
	openCartButtonView.render({ count: cartModel.getItems().length });
	renderModal(
		new ProductModalView(events).render({
			product,
			inBasket: cartModel.getIsInCart(product),
		})
	);
};

const handleCartOpen = () => {
	const productsInCart = productsModel.getProductList().items.filter((item) => cartModel.getIsInCart(item));
	const cartModalView = new CartModalView(events);
	renderModal(
		cartModalView.render({ products: productsInCart }),
		cartModalView.renderActions({
			products: productsInCart,
			sum: cartModel.getTotalPrice(),
		})
	);
};

const handleProductDelete = (product: Product) => {
	cartModel.removeItem(product.id);
	handleCartOpen(); // Reuse existing cart open handling
};

const handleCartBuy = () => {
	const cartPayModalView = new CartPayModal(events);
	const order = orderModel.getOrder();
	renderModal(
		cartPayModalView.render({
			payment: order?.payment,
			address: order?.address || '',
		}),
		cartPayModalView.renderActions({
			disabled: !order?.payment || !order?.address,
		})
	);
};

const handleCartContactsField = (field: string, value: string) => {
	orderModel.createOrder({ ...orderModel.getOrder(), [field]: value });

	if (value.length <= 1) {
		const cartContactsModalView = new CartContactsModalView(events);
		const order = orderModel.getOrder();
		renderModal(
			cartContactsModalView.render({ phone: order?.phone || '', email: order?.email || '' }),
			cartContactsModalView.renderActions({
				disabled: !order?.phone || !order?.email,
			})
		);
	}
};

const handleCartPayField = (field: string, value: string) => {
	orderModel.createOrder({ ...orderModel.getOrder(), [field]: value });

	if (value.length <= 1) {
		const cartPayModalView = new CartPayModal(events);
		const order = orderModel.getOrder();
		renderModal(
			cartPayModalView.render({ payment: order?.payment || '', address: order?.address || '' }),
			cartPayModalView.renderActions({
				disabled: !order?.payment || !order?.address,
			})
		);
	}
};

const handleMakeOrder = () => {
	const order = orderModel.getOrder();
	api.createOrder({
		email: order.email,
		phone: order.phone,
		payment: order.payment,
		address: order.address,
		total: cartModel.getTotalPrice(),
		items: cartModel.getItems().map((item) => item.id),
	})
		.then(({ total }: { total: number }) => {
			cartModel.clearCart();
			orderModel.clearOrder();
			openCartButtonView.render({ count: 0 });
			renderModal(new SuccessOrderModalView(events).render({ total }));
		})
		.catch(console.error);
};

const handleSuccessClose = () => {
	modalView.render({ opened: false });
};

api.getProducts().then((data: ProductList) => {
	productsModel.setProducts(data.items);
});

events.on('modal.close', () => modalView.render({ opened: false }));
events.on('products.change', handleProductChange);
events.on('product.click', handleProductClick);
events.on('product.add', handleProductAdd);
events.on('cart.open', handleCartOpen);
events.on('product.delete', handleProductDelete);
events.on('cart.buy', handleCartBuy);
events.on('cart.payment', ({ payment }: { payment: string }) => {
	orderModel.createOrder({ ...orderModel.getOrder(), payment });
	handleCartBuy();
});
events.on('cart.address', ({ address }: { address: string }) => handleCartPayField('address', address));
events.on('cart.phone', ({ phone }: { phone: string }) => handleCartContactsField('phone', phone));
events.on('cart.email', ({ email }: { email: string }) => handleCartContactsField('email', email));
events.on('cart.next', () => {
	const cartContactsModalView = new CartContactsModalView(events);
	const order = orderModel.getOrder();
	renderModal(
		cartContactsModalView.render({ phone: order?.phone || '', email: order?.email || '' }),
		cartContactsModalView.renderActions({
			disabled: !order?.phone || !order?.email,
		})
	);
});
events.on('cart.make_order', handleMakeOrder);
events.on('success.close', handleSuccessClose);
