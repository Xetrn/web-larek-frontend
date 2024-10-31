import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketModel, OrderModel } from './model';
import { CatalogModel } from './model/catalog-model';
import { CatalogPresenter } from './presenter/catalog-presenter';
import { ShopAPI } from './service/shop-api';
import { API_URL } from './utils/constants';

const shopApi = new ShopAPI(API_URL);
const events = new EventEmitter();

const basketModel = new BasketModel(events);
const orderModel = new OrderModel(shopApi, events);
const catalogModel = new CatalogModel(shopApi, events);

const catalogPresenter = new CatalogPresenter({ catalogModel });

catalogModel.load().then(() => {
	catalogPresenter.init();
});
