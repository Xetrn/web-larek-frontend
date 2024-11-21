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

import { ApiClient } from './components/ApiClients';

import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';

import { Product } from './types/types';

const emitter = new EventEmitter();
const api = new ApiClient(CDN_URL, API_URL);

const productModalTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const page = new PageView(document.body, emitter);
const modal = new ModalView(ensureElement<HTMLElement>('#modal-container'), emitter);

const contacts = ensureElement<HTMLTemplateElement>('#contacts')

//const catalog = new CatalogView(emitter);
const basket = new BasketView(ensureElement<HTMLTemplateElement>('#basket'), emitter);
//const orderForm = cloneTemplate<HTMLTemplateElement>('#order');
const orderForm = new OrderFormView(cloneTemplate<HTMLFormElement>(contacts), emitter);

const catalogView = new PageView(document.querySelector('.gallery'), emitter);
const catalogModel = new CatalogModel(emitter);

emitter.on('modal:open', () => {
    modal.open();
});

emitter.off('modal:close', () => {
    modal.close();
});

