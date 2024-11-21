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

import { Product, ProductList } from './types/types';

const templates: Record<string, HTMLTemplateElement> = {
    cardCatalog: document.querySelector('#card-catalog'),
    cardPreview: document.querySelector('#card-preview'),
    cardCompact: document.querySelector('#card-basket'),
    basket: document.querySelector('#basket'),
    order: document.querySelector('#order'),
    contacts: document.querySelector('#contacts'),
    success: document.querySelector('#success'),
}

const emitter = new EventEmitter();
const api = new ApiClient(CDN_URL, API_URL);

const productModalTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const page = new PageView(document.body, emitter);
const modal = new ModalView(ensureElement<HTMLElement>('#modal-container'), emitter);

const contacts = ensureElement<HTMLTemplateElement>('#contacts')

//const catalog = new CatalogView(emitter);
const basket = new BasketView(ensureElement<HTMLTemplateElement>('#basket'), emitter);
//const orderForm = cloneTemplate<HTMLTemplateElement>('#order');
//const orderForm = new OrderFormView(cloneTemplate<HTMLFormElement>(contacts), emitter);
const orderForm = new OrderFormModel(emitter);

const catalogView = new PageView(document.querySelector('.gallery'), emitter);
const catalogModel = new CatalogModel(emitter);

api.getProductList().then(response => {
    //catalogModel.items = (response as Product[]).items;
})
.catch(res => console.log(res))

emitter.on('basket:open', () => {
    modal.content = basket.render(collectCatalog());

    modal.open();
})

// добавление карточки в корзину
emitter.on('item:select', (evt: {product: string}) => {
    //orderForm.addItem(catalogModel.getProduct(evt.product));

    modal.close();
})

// удаление карточки из корзины
emitter.on('item:delete', (evt: {product: string}) => {
    orderForm.deleteItem(evt.product);

    basket.render(collectCatalog());
})



function collectCatalog() {
    return {
        catalog: orderForm._items.map(data => {
            const card = new CatalogItemView(cloneTemplate(templates.cardCompact));
            return card.render(data);
        }),
        total: orderForm.total
    }
}

// удаление и добавление карточки
export function handleAddCard() {
    this.events.emit('item:select', {product: this.cardId});
}

export function handleDeleteCard() {
    this.events.emit('item:delete', {product: this.cardId});
}