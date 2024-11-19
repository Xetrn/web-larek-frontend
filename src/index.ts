import './scss/styles.scss';
import { ApiModel } from './components/model/api-model';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PageView } from './components/view/page-view';
import { EventEmitter } from './components/base/events';
import { IProduct, TProductView } from './types';
import { CatalogProductView } from './components/view/products/catalog-product-view';
import { Model } from './components/model/model';

const api = new ApiModel(API_URL, CDN_URL);
const events = new EventEmitter();
const cardsData = new Model(events);

const pageViewContainer = ensureElement<HTMLElement>('.page');

const templateCatalogProductView = ensureElement<HTMLTemplateElement>('#card-catalog'); //* cardCatalogTemplate

const pageView = new PageView(pageViewContainer, events);

const products = api.getProducts()
	.then((prods) => {
		cardsData.catalog = prods;
	console.log(prods);
}).catch(console.error);

events.on('CARDS', (cards: IProduct[]) => {
	const cardsList = cards.map((card) => {
		const transformedCard: TProductView = {
			...card,
			price: card.price?.toString(),
		};

		//* cardCatalogueView
		const viewCard = new CatalogProductView(cloneTemplate(templateCatalogProductView), events);
		return viewCard.render(transformedCard);
	});

	pageView.render({ catalog: cardsList });
});
