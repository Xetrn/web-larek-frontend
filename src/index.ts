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

const api = new ApiModel(API_URL, CDN_URL);
const events = new EventEmitter();
const productsData = new Model(events);

const pageViewContainer = ensureElement<HTMLElement>('.page');
const modalViewContainer = ensureElement<HTMLElement>('#modal-container');


const templateCatalogProductView = ensureElement<HTMLTemplateElement>('#card-catalog');
const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');


const pageView = new PageView(pageViewContainer, events);
const modalView = new ModalView(modalViewContainer, events);
const productPreviewView = new ProductPreviewView(cloneTemplate(productPreviewTemplate), events);

api.getProducts().then((prods) => {
		productsData.catalog = prods;
})
	.catch(console.error);

events.on(MODEL_EVENTS.PRODUCTS_UPDATED, (products: IProduct[]) => {

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
		isPriceValid: previewProduct.price == null,
	});

	modalView.render({
		content: productContent,
	});

	modalView.toggleOpen();
});
