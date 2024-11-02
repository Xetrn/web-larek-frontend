import { ShopApi } from './api/shop-api';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';

const events = new EventEmitter();
const api = new ShopApi();
