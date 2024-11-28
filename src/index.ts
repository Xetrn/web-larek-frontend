import { ShopApi } from './api/shop-api';
import { EventEmitter } from './components/base/events';
import { GalleryModel } from './components/gallery/gallery.model';
import { GalleryPresenter } from './components/gallery/gallery.presenter';
import { GalleryView } from './components/gallery/gallery.view';
import { BasketModel } from './components/modals/children/basket/basket.model';
import { BasketPresenter } from './components/modals/children/basket/basket.presenter';
import { BasketView } from './components/modals/children/basket/basket.view';
import { CardPreviewModel } from './components/modals/children/card-preview/card-preview,model';
import { CardPreviewPresenter } from './components/modals/children/card-preview/card-preview.presenter';
import { CardPreviewView } from './components/modals/children/card-preview/card-preview.view';
import { ContactsModel } from './components/modals/children/contacts/contacts.model';
import { ContactsPresenter } from './components/modals/children/contacts/contacts.presenter';
import { ContactsView } from './components/modals/children/contacts/contacts.view';
import { OrderModel } from './components/modals/children/order/order.model';
import { OrderPresenter } from './components/modals/children/order/order.presenter';
import { OrderView } from './components/modals/children/order/order.view';
import { SuccessModel } from './components/modals/children/success/success.model';
import { SuccessPresenter } from './components/modals/children/success/success.presenter';
import { SuccessView } from './components/modals/children/success/success.view';
import { BasketButton } from './components/ui/basket-button/basket-button';
import './scss/styles.scss';
import { ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new ShopApi();

const galleryView = new GalleryView(ensureElement('.gallery'), api, events);
const galleryModel = new GalleryModel(events);
const galleryPresenter = new GalleryPresenter(
	galleryView,
	galleryModel,
	events
);

const basketButton = new BasketButton(
	ensureElement<HTMLButtonElement>('.header__basket'),
	events
);
const basketModel = new BasketModel(events, api);
const basketView = new BasketView(
	ensureElement('#modal-container'),
	events,
	basketModel
);
const basketPresenter = new BasketPresenter(basketView, basketModel, events);

const cardPreviewView = new CardPreviewView(
	ensureElement('#modal-container'),
	events,
	api,
	basketModel
);
const cardPreviewModel = new CardPreviewModel(events);
const cardPreviewPresenter = new CardPreviewPresenter(
	cardPreviewView,
	cardPreviewModel,
	events
);

const orderView = new OrderView(ensureElement('#modal-container'), events);
const orderModel = new OrderModel(events);
const orderPresenter = new OrderPresenter(orderView, orderModel, events);

const contactsView = new ContactsView(
	ensureElement('#modal-container'),
	events
);
const contactsModel = new ContactsModel(events);
const contactsPresenter = new ContactsPresenter(
	contactsView,
	contactsModel,
	events
);

const successView = new SuccessView(ensureElement('#modal-container'), events);
const successModel = new SuccessModel(events, api);
const successPresenter = new SuccessPresenter(
	successView,
	successModel,
	events
);

galleryPresenter.init();
cardPreviewPresenter.init();
basketPresenter.init();
orderPresenter.init();
contactsPresenter.init();
successPresenter.init();

api.getProducts().then((data) => galleryModel.setProducts(data.items));
