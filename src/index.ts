import './scss/styles.scss';

import { EventEmitter } from './components/base/events';

import { BasketView } from './components/view/BasketView';
import { CatalogView } from './components/view/CatalogView';
import { ModalView } from './components/view/ModalView';
import { ProductModalView } from './components/view/ProductModalView';

import { ApiClient } from './components/ApiClients';
import { PageView } from './components/view/PageView';

import { Product } from './types/types';

import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement } from './utils/utils';


const emitter = new EventEmitter();
const api = new ApiClient(API_URL);

const page = new PageView(document.body, emitter);
const modal = new ModalView(ensureElement<HTMLElement>('#modal-container'), emitter);

const catalog = new CatalogView(emitter);
const basket = new BasketView(ensureElement<HTMLTemplateElement>('#basket'), emitter);
const orderForm = ensureElement<HTMLTemplateElement>('#order');


/* emitter.on('items:changed', () => {
  page.catalog = appData.catalog.map((item) => {
    const card = new Card(cloneTemplate(cardCatalogTpl), {
      onClick: () => emitter.emit('card:select', item) 
    });)) */

//emitter.off();
