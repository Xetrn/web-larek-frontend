import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';

import { EventEmitter } from './components/base/events';
import { BasketData } from './components/model/BasketData';
import { CardsData } from './components/model/CardsData';
import { OrderData } from './components/model/OrderData';
import { OrderSuccessData } from './components/model/OrderSuccessData';
import { ViewCardPreview } from './components/view/card/ViewCardPreview';
import { ViewModal } from './components/view/ViewModal';
import { ViewPage } from './components/view/ViewPage';

//
const events = new EventEmitter();
const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const orderData = new OrderData(events);
const orderSuccessData = new OrderSuccessData(events);

//
const containerViewPage = ensureElement<HTMLElement>('.page');
const containerViewModal = ensureElement<HTMLElement>('#modal-container');

//
const templateViewCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateViewCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateViewCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateViewBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateViewOrder = ensureElement<HTMLTemplateElement>('#order');
const templateViewContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateViewSuccess = ensureElement<HTMLTemplateElement>('#success');

//
const viewPage = new ViewPage(containerViewPage, events);
const viewModal = new ViewModal(containerViewModal, events);

const viewCardPreview = new ViewCardPreview(cloneTemplate(templateViewCardPreview), events);

const viewBasket = new ViewBasket(cloneTemplate(templateViewBasket), events);

const viewFormOrder = new ViewFormOrder(cloneTemplate(templateViewOrder), events);
const viewFormContacts = new ViewFormContacts(cloneTemplate(templateViewContacts), events);

// События:
events.on('cards:changed', (cards: ICardData[]) => {});
