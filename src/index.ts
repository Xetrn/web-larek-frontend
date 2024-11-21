import './scss/styles.scss';
import { ApiModel } from './components/model/api-model';
import { API_URL, CDN_URL, MODEL_EVENTS, VIEW_EVENTS } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PageView } from './components/view/page-view';
import { EventEmitter } from './components/base/events';
import { IProduct, TProductView } from './types';
import { CatalogProductView } from './components/view/products/catalog-product-view';
import { Model } from './components/model/model';
import { ModalView } from './components/view/modal-view';
import { ProductPreviewView } from './components/view/products/product-preview-view';
import { BasketView } from './components/view/basket-view';
import { BasketProductView } from './components/view/products/basket-product-view';

const api = new ApiModel(API_URL, CDN_URL);
const events = new EventEmitter();
const productsData = new Model(events);

const pageViewContainer = ensureElement<HTMLElement>('.page');
const modalViewContainer = ensureElement<HTMLElement>('#modal-container');


const templateCatalogProductView = ensureElement<HTMLTemplateElement>('#card-catalog');
const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketViewContainer = ensureElement<HTMLTemplateElement>('#basket');
const basketProductTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const pageView = new PageView(pageViewContainer, events);
const basketView = new BasketView(cloneTemplate(basketViewContainer), events);
const modalView = new ModalView(modalViewContainer, events);
const productPreviewView = new ProductPreviewView(cloneTemplate(productPreviewTemplate), events);

api.getProducts().then((prods) => {
		productsData.catalog = prods;
})
	.catch(console.error);

events.on(MODEL_EVENTS.FETCHED_CATALOG, (products: IProduct[]) => {

	const productsList = products.map((products) => {

		const transformedCard: TProductView = {
			...products,
			price: products.price?.toString(),
		};

		const catalogProductView = new CatalogProductView(cloneTemplate(templateCatalogProductView), events);

		return catalogProductView.render(transformedCard);
	});

	pageView.render({ catalog: productsList });
});

events.on(VIEW_EVENTS.MODAL_OPEN, () => {
	pageView.lock(true);
});
events.on(VIEW_EVENTS.MODAL_CLOSE, () => {
	pageView.lock(false);
});


events.on(VIEW_EVENTS.PRODUCT_PREVIEW_OPENED, (data: TProductView) => {
	const previewProduct = data.id ? productsData.getProductById(data.id) : null;
	if (!previewProduct) {
		return;
	}

	const productContent = productPreviewView.render({
		...previewProduct,
		price: previewProduct.price?.toString(),
		isButtonActive: productsData.isProductInBasket(previewProduct.id) || previewProduct.price == null ,
	});

	modalView.render({
		content: productContent,
	});

	modalView.toggleOpen();
});

events.on(VIEW_EVENTS.ADD_TO_BASKET, (data: TProductView) => {
	const product = productsData.getProductById(data.id);

	productsData.addProduct(product);
	modalView.toggleOpen();
});

events.on(VIEW_EVENTS.REMOVE_FROM_BASKET, (data: TProductView) => {
	productsData.removeProduct(data.id);
	pageView.render({counter: productsData.getBasketProducts().length});

	updateBasket();
});

events.on(MODEL_EVENTS.ADD_TO_BASKET, () => {
	pageView.render({counter: productsData.getBasketProducts().length});
});

events.on(VIEW_EVENTS.BASKET_OPEN, () => {
	updateBasket();

	modalView.toggleOpen();
});

function updateBasket() {
	const basketProducts = productsData.getBasketProducts().map((product, index) => {
		const basketProductView = new BasketProductView(cloneTemplate(basketProductTemplate), events);
		return basketProductView.render({
			...product,
			price: product.price?.toString(),
			index: index + 1,
		});
	});

	const basketContent = basketView.render({
		basketProducts: basketProducts,
		cost: productsData.getBasketPrice(),
		isEmpty: productsData.getBasketProducts().length == 0,
	});

	modalView.render({
		content: basketContent,
	});
}
