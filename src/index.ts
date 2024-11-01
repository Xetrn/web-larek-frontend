import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { ensureElement } from './utils/utils';

import { IOrderForm, IProduct } from './types';

import { EventEmitter } from './components/base/events';

import { ApiModel } from './components/model/api';
import { DataModel } from './components/model/data';
import { BasketModel } from './components/model/basket';
import { FormModel } from './components/model/form';
import { Card } from './components/view/card';
import { CardPreview } from './components/view/cardPreview';
import { Modal } from './components/view/modal';
import { Basket } from './components/view/basket';
import { BasketItem } from './components/view/basketItem';
import { Order } from './components/view/formOrder';
import { Contacts } from './components/view/formContacts';
import { Success } from './components/view/success';

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new DataModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const basketModel = new BasketModel();
const formModel = new FormModel(events);
const order = new Order(orderTemplate, events);
const contacts = new Contacts(contactsTemplate, events);

events.on('productCards:receive', () => {
  dataModel.productCards.forEach(item => {
    const card = new Card(cardCatalogTemplate, events, { onClick: () => events.emit('card:select', item) });
    ensureElement<HTMLElement>('.gallery').append(card.render(item));
  });
});

events.on('card:select', (item: IProduct) => { dataModel.setPreview(item); });

events.on('modalCard:open', (item: IProduct) => {
  const cardPreview = new CardPreview(cardPreviewTemplate, events);
  modal.content = cardPreview.render(item);
  modal.render();
});

events.on('card:addBasket', () => {
  basketModel.setSelectedCard(dataModel.selectedCard);
  basket.renderHeaderBasketCounter(basketModel.getCounter());
  modal.close();
});

events.on('basket:open', () => {
  basket.renderSumAllProducts(basketModel.getSumAllProducts());
  basket.items = basketModel.basketProducts.map((item, index) => {
    const basketItem = new BasketItem(cardBasketTemplate, events, { onClick: () => events.emit('basket:basketItemRemove', item) });
    return basketItem.render(item, index + 1);
  });
  modal.content = basket.render();
  modal.render();
});

events.on('basket:basketItemRemove', (item: IProduct) => {
  basketModel.deleteCardFromBasket(item);
  basket.renderHeaderBasketCounter(basketModel.getCounter());
  basket.renderSumAllProducts(basketModel.getSumAllProducts());
  basket.items = basketModel.basketProducts.map((item, index) => {
    const basketItem = new BasketItem(cardBasketTemplate, events, { onClick: () => events.emit('basket:basketItemRemove', item) });
    return basketItem.render(item, index + 1);
  });
});

events.on('order:open', () => {
  modal.content = order.render();
  modal.render();
  formModel.items = basketModel.basketProducts.map(item => item.id);
});

events.on('order:paymentSelection', (button: HTMLButtonElement) => { formModel.payment = button.name; });

events.on('order:changeAddress', (data: { field: string; value: string; }) => {
  formModel.setOrderAddress(data.field, data.value);
});

events.on('formErrors:address', (errors: Partial<IOrderForm>) => {
  const { address, payment } = errors;
  order.valid = !address && !payment;
  order.formErrors.textContent = Object.values({ address, payment }).filter(i => !!i).join('; ');
});

events.on('contacts:open', () => {
  formModel.total = basketModel.getSumAllProducts();
  modal.content = contacts.render();
  modal.render();
});

events.on('contacts:changeInput', (data: { field: string; value: string; }) => {
  formModel.setOrderData(data.field, data.value);
});

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
  const { email, phone } = errors;
  contacts.valid = !email && !phone;
  contacts.formErrors.textContent = Object.values({ phone, email }).filter(i => !!i).join('; ');
});

events.on('success:open', () => {
  apiModel.postOrderLot(formModel.getOrderLot())
    .then((data) => {
      const success = new Success(successTemplate, events);
      modal.content = success.render(basketModel.getSumAllProducts());
      basketModel.clearBasketProducts();
      basket.renderHeaderBasketCounter(basketModel.getCounter());
      modal.render();
    })
    .catch(error => console.log(error));
});

events.on('success:close', () => modal.close());

events.on('modal:open', () => { modal.locked = true; });

events.on('modal:close', () => { modal.locked = false; });

apiModel.getListProductCard()
  .then((data: IProduct[]) => {
    dataModel.productCards = data;
  })
  .catch(error => console.log(error));
