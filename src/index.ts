import './scss/styles.scss';

import { CDN_URL, API_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement, formatPrice, getKeyByValueTranslation } from './utils/utils';

import { EventEmitter } from './components/base/events';

import { IOrder, IProduct, TOrderStep } from './types';

import { ProductsListView } from './components/catalog/ProductsListView';
import { ProductView, TProductRenderArgs } from './components/catalog/ProductView';
import { TViewNested } from './components/base/AbstractView';
import { PageView } from './components/global/PageView';
import { HeaderView } from './components/global/HeaderView';
import { ModalView, ModalViewEvents } from './components/global/ModalView';
import { ProductPreviewView, TProductPreviewRenderArgs } from './components/catalog/ProductPreviewView';
import { BasketItemView, TBasketItemRenderArgs } from './components/basket/BasketItemView';
import { BasketView, TBasketRenderArgs } from './components/basket/BasketView';
import { OrderShipmentView, TOrderShipmentRenderArgs } from './components/order/OrderShipmentView';
import { OrderContactsView, TOrderContactsRenderArgs } from './components/order/OrderContactsView';
import { OrderSuccessView, TOrderSuccessRenderArgs } from './components/order/OrderSuccessView';

import { AppStateModelEvents, AppStateModel } from './models/global/AppStateModel';

import { ShopAPI } from './components/special/ShopAPI';

const eventEmitter = new EventEmitter();
const api = new ShopAPI(CDN_URL, API_URL);
const appStateModel = new AppStateModel({}, eventEmitter);
const pageView = new PageView({
	element: ensureElement('.page'),
	eventEmitter,
});

const headerView = new HeaderView({
	element: ensureElement('.header'),
	eventEmitter,
	eventHandlers: {
		onClick: () => {
			appStateModel.initBasket();
		},
	},
});

const modalView = new ModalView({
	element: ensureElement('#modal-container'),
	eventEmitter,
});

const productsView = new ProductsListView({
	element: ensureElement('main.gallery'),
	eventEmitter,
});

const basketView = new BasketView({
	element: cloneTemplate('#basket'),
	eventEmitter,
	eventHandlers: {
		onClick: () => {
			appStateModel.initOrder();
		},
	},
});

eventEmitter.on(ModalViewEvents.OPEN, () => {
	pageView.isLocked = true;
});

eventEmitter.on(ModalViewEvents.CLOSE, () => {
	pageView.isLocked = false;
});

eventEmitter.on<{
	data: { items: IProduct[] };
}>(
	RegExp(
		`${AppStateModelEvents.BASKET_UPDATE}|${AppStateModelEvents.BASKET_RESET}`
	),
	({ data }) => {
		const { items } = data;

		headerView.render({
			counter: items.length,
		});
	}
);

eventEmitter.on<{data: { items: IProduct[] };}>(
	RegExp(
		`${AppStateModelEvents.BASKET_UPDATE}|${AppStateModelEvents.BASKET_INIT}`
	),
	({ data }) => {
		const { items } = data;

		const basketTotalPrice = appStateModel.getBasketPrice();

		const basketItemsViews = items.map<TViewNested<TBasketItemRenderArgs>>(
			(item, index) => {
				const basketItemView = new BasketItemView({
					element: cloneTemplate('#card-basket'),
					eventEmitter,
					eventHandlers: {
						onClick: () => {
							appStateModel.removeBasketItem(item.id);
						},
					},
				});

				const basketItemViewRenderArgs: TBasketItemRenderArgs = {
					...item,
					index: index + 1,
					price: formatPrice(item.price, settings.CURRENCY_TITLES),
				};

				return {
					view: basketItemView,
					renderArgs: basketItemViewRenderArgs,
				};
			}
		);

		modalView.render<TBasketRenderArgs<TBasketItemRenderArgs>>({
			content: {
				view: basketView,
				renderArgs: {
					isDisabled: items.length == 0,
					price:
						basketTotalPrice == 0
							? ''
							: formatPrice(basketTotalPrice, settings.CURRENCY_TITLES),
					items: basketItemsViews,
				},
			},
		});
	}
);

eventEmitter.on<{ data: { item: IProduct } }>(
	AppStateModelEvents.PREVIEW_UPDATE,
	({ data }) => {
		const { item } = data;

		const isProductInBasket = appStateModel.getBasketIsContains(item.id);

		const productPreviewView = new ProductPreviewView({
			element: cloneTemplate('#card-preview'),
			eventEmitter,
			eventHandlers: {
				onClick: () => {
					if (isProductInBasket) {
						appStateModel.removeBasketItem(item.id);
					} else {
						if (item.price) {
							appStateModel.addBasketItem(item);
						}
					}
				},
			},
		});

		const productPreviewViewRenderArgs: TProductPreviewRenderArgs = {
			...item,
			color: getKeyByValueTranslation(
				item.category.toLowerCase(),
				settings.CATEGORY_COLORS_TITLES
			),
			isDisabled: !item.price,
			price: formatPrice(item.price, settings.CURRENCY_TITLES),
			buttonText: isProductInBasket ? 'Удалить из корзины' : 'Купить',
		};

		modalView.render<TProductPreviewRenderArgs>({
			content: {
				view: productPreviewView,
				renderArgs: productPreviewViewRenderArgs,
			},
		});
	}
);

eventEmitter.on<{ data: { items: IProduct[] } }>(
	AppStateModelEvents.PRODUCTS_UPDATE,
	({ data }) => {
		const { items } = data;

		const productsViews = items.map<TViewNested<TProductRenderArgs>>((item) => {
			const productView = new ProductView({
				element: cloneTemplate('#card-catalog'),
				eventEmitter,
				eventHandlers: {
					onClick: () => {
						appStateModel.setPreview(item);
					},
				},
			});

			const productsViewRenderArgs: TProductRenderArgs = {
				...item,
				color: getKeyByValueTranslation(
					item.category.toLowerCase(),
					settings.CATEGORY_COLORS_TITLES
				),
				price: formatPrice(item.price, settings.CURRENCY_TITLES),
			};

			return { view: productView, renderArgs: productsViewRenderArgs };
		});

		productsView.render<TProductRenderArgs>({
			items: productsViews,
		});
	}
);

eventEmitter.on<{ data: { step: TOrderStep } }>(
	AppStateModelEvents.ORDER_STEP,
	({ data }) => {
		const { step } = data;

		if (step === 'receiving') {
			const orderShipmentView = new OrderShipmentView({
				element: cloneTemplate('#order'),
				eventEmitter,
				eventHandlers: {
					onSubmit: () => {
						appStateModel.setStep('contacts');
					},
					onInput: ({ field, value }) => {
						appStateModel.setOrderField(field as keyof IOrder, value);

						orderShipmentView.render({
							...appStateModel.getOrderInvoice(),
							errors: appStateModel.getOrderErrors(),
							isDisabled: !appStateModel.getOrderIsValid(),
						});
					},
				},
			});

			modalView.render<TOrderShipmentRenderArgs>({
				content: {
					view: orderShipmentView,
					renderArgs: {
						...appStateModel.getOrderInvoice(),
						errors: appStateModel.getOrderErrors(),
						isDisabled: !appStateModel.getOrderIsValid(),
					},
				},
			});
		}

		if (step === 'contacts') {
			const orderContactsView = new OrderContactsView({
				element: cloneTemplate('#contacts'),
				eventEmitter,
				eventHandlers: {
					onSubmit: () => {
						api
							.createOrder(appStateModel.getOrderInvoice())
							.then((data) => {
								appStateModel.resetOrder();
								appStateModel.resetBasket();

								const orderSuccessView = new OrderSuccessView({
									element: cloneTemplate('#success'),
									eventEmitter,
									eventHandlers: {
										onClick: () => {
											modalView.close();
										},
									},
								});

								modalView.render<TOrderSuccessRenderArgs>({
									content: {
										view: orderSuccessView,
										renderArgs: {
											description: `Списано ${formatPrice(
												data.total,
												settings.CURRENCY_TITLES
											)}`,
										},
									},
								});
							})
							.catch((error) => {
								console.error(error);
							});
					},
					onInput: ({ field, value }) => {
						appStateModel.setOrderField(field as keyof IOrder, value);

						orderContactsView.render({
							...appStateModel.getOrderInvoice(),
							errors: appStateModel.getOrderErrors(),
							isDisabled: !appStateModel.getOrderIsValid(),
						});
					},
				},
			});

			modalView.render<TOrderContactsRenderArgs>({
				content: {
					view: orderContactsView,
					renderArgs: {
						...appStateModel.getOrderInvoice(),
						errors: appStateModel.getOrderErrors(),
						isDisabled: !appStateModel.getOrderIsValid(),
					},
				},
			});
		}
	}
);

api
	.getProducts()
	.then((products) => {
		appStateModel.setProductsItems(products);
	});
