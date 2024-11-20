import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { BasketView } from './components/view/BasketView';
import { CatalogView } from './components/view/CatalogView';
import { ModalView } from './components/view/ModalView';
import { ProductModalView } from './components/view/ProductModalView';

const emitter = new EventEmitter();

const page = new Page(document.body, emitter);
const modal = new ModalView(emitter);

const catalog = new CatalogView(emitter);
const basket = new BasketView(document.querySelector('#basket'));


/* emitter.on();

emitter.off(); */
