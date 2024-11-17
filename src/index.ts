import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { API_URL, Events } from './utils/constants';
import { ShopAPI } from './components/service/shop-api';
import { BasketModel, OrderModel, CatalogModel } from './components/model';
import {
  ModalView,
  CatalogItemFullView,
  CatalogView,
  BasketView,
  AddressFormView,
  ContactFormView,
  OrderSuccessView,
} from './components/view';
import {
  BasketPresenter,
  OrderPresenter,
  CatalogPresenter,
} from './components/presenter';

// Base
const modal = new ModalView();
const shopApi = new ShopAPI(API_URL);
const events = new EventEmitter();

// Views
const catalogView = new CatalogView();
const catalogItemFullView = new CatalogItemFullView();
const basketView = new BasketView();
const orderSuccessView = new OrderSuccessView();
const addressFormView = new AddressFormView();
const contactFormView = new ContactFormView();

// Models
const catalogModel = new CatalogModel({ api: shopApi });
const orderModel = new OrderModel({ api: shopApi, events: events });
const basketModel = new BasketModel({ events });

// Presenters
const catalogPresenter = new CatalogPresenter({
  catalogItemFullView,
  catalogView,
  catalogModel,
  basketModel,
  events,
});

const basketPresenter = new BasketPresenter({
  basketView,
  basketModel,
  events,
});

const orderPresenter = new OrderPresenter({
  orderSuccessView,
  contactFormView,
  addressFormView,
  orderModel,
  events,
});

catalogModel.load().then(() => {
  catalogPresenter.init();
  basketPresenter.init();
  orderPresenter.init();
});

// Global Events
events.on(Events.MODAL_OPEN, (data: HTMLElement) => {
  modal.close();
  modal.render(data);
});

events.on(Events.MODAL_CLOSE, () => {
  modal.close();
});

events.on(Events.ORDER_FINISHED, () => {
  orderModel.reset();
  basketModel.reset();
});
