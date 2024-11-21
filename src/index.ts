import './scss/styles.scss';
import EventEmitter from './components/base/events';
import ProductsModel from './components/models/ProductsModel';
import ProductsController from './components/controllers/ProductsController';
import OrderModel from './components/models/OrderModel';
import OrderController from './components/controllers/OrderController';
import Api from './components/base/api';
import { API_URL } from './utils/constants';

const api = new Api(API_URL);

const eventEmitter = new EventEmitter();
const cartButton = document.querySelector(
	'.header__basket'
) as HTMLButtonElement;

const orderModel = new OrderModel(eventEmitter);
const productsModel = new ProductsModel(eventEmitter);

const productsController = new ProductsController(
	eventEmitter,
	productsModel,
	api,
	orderModel,
	cartButton
);
const orderController = new OrderController(
	eventEmitter,
	orderModel,
	api,
	cartButton
);
