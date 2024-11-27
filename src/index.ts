import './scss/styles.scss';

import { EventEmitter } from './components/base/events';

import { BasketModel } from './components/models/BasketModel';
import { CatalogModel } from './components/models/CatalogModel';
import { OrderFormModel } from './components/models/OrderFormModel';

import { BasketItemView } from './components/view/BasketItemView';
import { BasketView } from './components/view/BasketView';
import { CatalogItemView } from './components/view/CatalogItemView';
import { ModalView } from './components/view/ModalView';
import { OrderFormView } from './components/view/OrderFormView';
import { PageView } from './components/view/PageView';
import { ProductModalView } from './components/view/ProductModalView';

import { Api } from './components/base/api';
import { ApiClient } from './components/ApiClients';

import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';

import { BasketItem, Product, ProductList } from './types/types';
import { ModalModel } from './components/models/ModaModel';

const templates: Record<string, HTMLTemplateElement> = {
    catalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
    itemPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
    itemCompact: ensureElement<HTMLTemplateElement>('#card-basket'),
    basket: ensureElement<HTMLTemplateElement>('#basket'),
    order: ensureElement<HTMLTemplateElement>('#order'), 
    contacts: ensureElement<HTMLTemplateElement>('#contacts'),
    success: ensureElement<HTMLTemplateElement>('#success')
}

const emitter = new EventEmitter();
const api = new ApiClient(CDN_URL, API_URL);

const page = new PageView(document.body, emitter);
const modalView = new ModalView(ensureElement<HTMLElement>('#modal-container'), emitter);
const basket = new BasketView(templates.basket, emitter);
const catalog = new PageView(document.querySelector('.gallery'), emitter);

const modal = new ModalModel(document.querySelector('#modal-container'), emitter)
const basketModel = new BasketModel(emitter);
const orderFormModel = new OrderFormModel(emitter);
const catalogModel = new CatalogModel(emitter);


api.getProductList().then(response => {
    catalogModel.items = response;
})
.catch(res => console.log(res))

emitter.on('basket:open', () => {
	modal.content = basket.render();

    modal.open();
})

// добавление карточки в корзину
emitter.on('basket:add', (evt: {product: BasketItem}) => {
	basketModel.add(evt.product);
	
	modal.close();
})

// удаление карточки из корзины
emitter.on('basket:delete', (evt: {product: Product}) => {
	basketModel.remove(evt.product.id);

	basket.render();
})

emitter.on('items:change', (evt: {}) => {
	
})