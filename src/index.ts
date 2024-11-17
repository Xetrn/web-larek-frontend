import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketModel, OrderModel, CatalogModel } from './components/model';
import { CatalogPresenter } from './components/presenter/CatalogPresenter/catalogPresenter';
import { ShopAPI } from './components/service/shop-api';
import { API_URL, Events } from './utils/constants';
import { ModalView } from './components/view/modalView';
import { CatalogItemFullView, CatalogView } from './components/view/catalog';
import { BasketPresenter } from './components/presenter';
import { BasketView } from './components/view/basket';

const modal = new ModalView();
const shopApi = new ShopAPI(API_URL);
const events = new EventEmitter();

const catalogView = new CatalogView();
const catalogItemFullView = new CatalogItemFullView();
const catalogModel = new CatalogModel(shopApi);

const basketView = new BasketView();
const basketModel = new BasketModel({ events });

const orderModel = new OrderModel(shopApi);

const catalogPresenter = new CatalogPresenter({
  catalogView,
  catalogItemFullView,
  catalogModel,
  basketModel,
  events,
});

const basketPresenter = new BasketPresenter({
  basketModel,
  basketView,
  events,
});

catalogModel.load().then(() => {
  catalogPresenter.init();
  basketPresenter.init();
});

events.on(Events.MODAL_OPEN, (data: HTMLElement) => {
  modal.close();
  modal.render(data);
});

events.on(Events.MODAL_CLOSE, () => {
  modal.close();
});
