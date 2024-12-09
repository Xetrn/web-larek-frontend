import './scss/styles.scss';
import EventEmitter from './components/base/events';
import ProductsModel from './components/models/ProductsModel';
import ProductsController from './components/controllers/ProductsController';
import OrderModel from './components/models/OrderModel';
import OrderController from './components/controllers/OrderController';
import Api from './components/base/api';
import { API_URL } from './utils/constants';
import CartModalView from './components/views/CartModalView';
import PaymentModalView from './components/views/PaymentModalView';
import ContactModalView from './components/views/ContactModalView';
import ResultModalView from './components/views/ResultModalView';
import CatalogView from './components/views/CatalogView';
import ProductModalView from './components/views/ProductModalView';

const api = new Api(API_URL);

const eventEmitter = new EventEmitter();
const orderModel = new OrderModel(eventEmitter);
const productsModel = new ProductsModel(eventEmitter);

const cartButton = document.querySelector(
	'.header__basket'
) as HTMLButtonElement;
const cartView = new CartModalView(eventEmitter);
const aymentView = new PaymentModalView(eventEmitter);
const contactView = new ContactModalView(eventEmitter);
const resultView = new ResultModalView(eventEmitter);
const catalogView = new CatalogView(eventEmitter);
const productModalView = new ProductModalView(eventEmitter);
const cartButtonCounter = cartButton.querySelector(
	'.header__basket-counter'
) as HTMLSpanElement;

const productsController = new ProductsController(
	eventEmitter,
	productsModel,
	api,
	orderModel,
	catalogView,
	productModalView,
	cartButtonCounter
);

const orderController = new OrderController(
	eventEmitter,
	orderModel,
	api,
	cartButton,
	cartView,
	aymentView,
	contactView,
	resultView,
	cartButtonCounter
);
