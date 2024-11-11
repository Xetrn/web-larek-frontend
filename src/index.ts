import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketModel, OrderModel, CatalogModel } from './model';
import { CatalogPresenter } from './presenter/catalogPresenter';
import { ShopAPI } from './service/shop-api';
import { API_URL } from './utils/constants';
import { ModalView } from './components/view/modalView';

const modal = new ModalView();

const shopApi = new ShopAPI(API_URL);
const events = new EventEmitter();

const basketModel = new BasketModel();
const orderModel = new OrderModel(shopApi);
const catalogModel = new CatalogModel(shopApi);

const catalogPresenter = new CatalogPresenter({ catalogModel, events });

catalogModel.load().then(() => {
  catalogPresenter.init();
});

events.on('modal:open', (data: HTMLElement) => {
  modal.render(data);
});

events.on('modal:close', () => {
  modal.close();
});