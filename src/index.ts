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
import { ModalModel } from './components/models/ModaModell';

const templates: Record<string, HTMLTemplateElement> = {
    cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
    cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
    cardCompact: ensureElement<HTMLTemplateElement>('#card-basket'),
    basket: ensureElement<HTMLTemplateElement>('#basket'),
    order: ensureElement<HTMLTemplateElement>('#order'), 
    contacts: ensureElement<HTMLTemplateElement>('#contacts'),
    success: ensureElement<HTMLTemplateElement>('#success')
}

const emitter = new EventEmitter();
const api = new ApiClient(CDN_URL, API_URL);

const productModalTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const page = new PageView(document.body, emitter);
const modalView = new ModalView(ensureElement<HTMLElement>('#modal-container'), emitter);
const basket = new BasketView(ensureElement<HTMLTemplateElement>('.basket'), emitter);
const contacts = ensureElement<HTMLTemplateElement>('#contacts');
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
	modal.content = basket.render()

    modal.open();
})

// добавление карточки в корзину
emitter.on('item:select', (evt: {product: string}) => {
})

// удаление карточки из корзины
emitter.on('item:delete', (evt: {product: string}) => {
})

emitter.on('payment:change', (evt: {}) => {

})