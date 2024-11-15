import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { AppController } from './components/controllers/AppController';
import { BasketController } from './components/controllers/BasketController';
import { ProductController } from './components/controllers/ProductController';
import { Basket } from './components/models/Basket';
import { Contact } from './components/models/Contact';
import { Order } from './components/models/Order';
import { BasketView } from './components/views/BasketView';
import { ContactView } from './components/views/ContactView';
import { OrderView } from './components/views/OrderView';
import { ProductView } from './components/views/ProductView';
import { SuccessView } from './components/views/SuccessView';
import './scss/styles.scss';
import { API_URL } from './utils/constants';

const api = new Api(API_URL);
const events = new EventEmitter();
//basket
const basket = new Basket();
const basketView = new BasketView(events);
const basketController = new BasketController(basket, basketView, events);
//product
const productView = new ProductView(events);
const productController = new ProductController(
	productView,
	api,
	events,
	basket
);
productController.loadProducts();

//order
const order = new Order(events);
const orderView = new OrderView(events);
//contact
const contactView = new ContactView(events);
const contact = new Contact(events);
//appController
const appController = new AppController(basket, order, contact, events, api);
//successView
const successView = new SuccessView(events);
