import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { ProductController } from './components/controllers/ProductController';
import { Product } from './components/models/Product';
import { ProductView } from './components/views/ProductView';
import './scss/styles.scss';
import { API_URL } from './utils/constants';

const api = new Api(process.env.API_ORIGIN);
const events = new EventEmitter();
const productModal = new Product(document.querySelector('.modal'), events);
const productView = new ProductView(events);
const productController = new ProductController(
	productModal,
	productView,
	api,
	events
);
productController.loadProducts();
