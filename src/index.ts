import './scss/styles.scss';
import {LarekAPI} from "./service/larek-api";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import { ensureElement, cloneTemplate } from './utils/utils';
import { CatalogModel } from './components/model/CatalogModel';
import { BacketModel } from './components/model/BasketModel';
import { OrderModel } from './components/model/OrderModel';
import { PageView } from './components/view/PageView';
import { ModalView } from './components/view/ModalView';
import { ModalBasketView } from './components/view/ModalBasketView';
import { ModalProductView } from './components/view/ModalProductView';
import { ProductView } from './components/view/ProductView';
import { ProductBasketView } from './components/view/ProductBasketView';
import { ModalPaymentView } from './components/view/ModalPaymentView';
import { ModalContactsView } from './components/view/ModalContactsView';
import { ModalSuccessView } from './components/view/ModalSuccessView';
import { BasketProductItem } from './types/product';
import { IValidationResult } from './types/order';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const modalContainerTemplate = ensureElement<HTMLTemplateElement>('#modal-container');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const productBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success'); 

// Модель данных приложения
const catalogModel = new CatalogModel(api, events);
const basketModel = new BacketModel({}, events);
const orderModel = new OrderModel(api, events);

// Глобальные контейнеры
const pageView = new PageView(document.body, events);
const modalView = new ModalView(modalContainerTemplate, events);
const modalBasketView = new ModalBasketView(cloneTemplate(basketTemplate), events);
const modalProductView = new ModalProductView(cloneTemplate(cardPreviewTemplate), events);
const modalPaymentView = new ModalPaymentView(cloneTemplate(orderTemplate), events);
const modalContactsView = new ModalContactsView(cloneTemplate(contactsTemplate), events);
const modalSuccessView = new ModalSuccessView(cloneTemplate(successTemplate), events);

// Загружаем продукты при старте приложения
catalogModel.loadProducts();

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Рендер продуктов
events.on("products:changed", () => {
  const productViews = catalogModel.catalogList.items.map(item => {
    const productView = new ProductView(cloneTemplate(cardCatalogTemplate), events);
    return productView.render(item);
  });
  
  pageView.catalog = productViews;
});

// Обработка кликов по продукту
events.on("product:clicked", async ({ id }: { id: string }) => {
    const product = await catalogModel.getProductById(id);
    if (product) {
        basketModel.has(product.id) ? modalProductView.inBasket = true : modalProductView.inBasket = false;
        modalView.render({content: modalProductView.render(product)});
    } else {
        console.error("Не удалось загрузить продукт с ID", id);
    }
});

// Блокируем прокрутки страницы
events.on('modal:open', () => {
    pageView.locked = true;
});

// Разблокировка прокрутки страницы
events.on('modal:close', () => {
    pageView.locked = false;
});

// Отрисовать продукты в корзине
events.on('basket:render', (products: BasketProductItem[]) => {
    const productBasketViews = products.map((product, index) => {
        const productBasketView = new ProductBasketView(cloneTemplate(productBasketTemplate), events);
        return productBasketView.render({ item: product, index: index + 1 });
    });

    modalBasketView.items = productBasketViews;
});

// Открыть корзину
events.on('basket:open', () => {
    events.emit('basket:render', basketModel.productsList);

    modalView.render({ content: modalBasketView.render({ totalPrice: basketModel.total }) });
});

// Добавить или удалить товары из корзины
events.on('product:update', (product: BasketProductItem) => {
    if (basketModel.has(product.id)) {
        basketModel.remove(product);
        modalProductView.inBasket = false;
    } else {
        basketModel.add(product);
        modalProductView.inBasket = true;
    }

    pageView.counter = basketModel.productsList.length;
    modalBasketView.totalPrice = basketModel.total;

    events.emit('basket:render', basketModel.productsList);
});

// Открыть форму оплаты
events.on('payment:open', () => {
    orderModel.order.items = basketModel.productsList.map((item) => item.id);
	orderModel.order.total = basketModel.total;
    modalView.render({
        content: modalPaymentView.render({
            payment: orderModel.order.payment,
            address: orderModel.order.address,
        })
    });
    orderModel.validatePayment();
});

// Валидация полей формы оплаты
events.on('payment:change', ({ value }: { value: string }) => {
    orderModel.order.payment = value;
    orderModel.validatePayment();
});
  
events.on('address:change', ({ value }: { value: string }) => {
    orderModel.order.address = value;
    orderModel.validatePayment();
});
  
// Обработка ошибок в форме оплаты
events.on('errors:change', ({ isValid, errorMessage }: IValidationResult) => {
    modalPaymentView.updateValidationState({ isValid, errorMessage });
});

// Открыть форму контактов
events.on('contacts:open', () => {
    modalView.render({
        content: modalContactsView.render({
            email: orderModel.order.email,
            phone: orderModel.order.phone,
        })
    });
    orderModel.validateContacts();
});

// Валидация полей формы контактов
events.on('email:change', ({ value }: { value: string }) => {
    orderModel.order.email = value;
    orderModel.validateContacts();
});
  
events.on('phone:change', ({ value }: { value: string }) => {
    orderModel.order.phone = value;
    orderModel.validateContacts();
});

// Обработка ошибок в форме контактов
events.on('errors:change', ({ isValid, errorMessage }: IValidationResult) => {
    modalContactsView.updateValidationState({ isValid, errorMessage });
});

// Отправка заказа на сервер
events.on('order:post', async () => {
    try {
      await orderModel.createOrder();
      basketModel.clearBasket();
      pageView.counter = 0;
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
    }
});

// Успешное завершение заказа
events.on('order:success', ({ total }: { total: number }) => {
    modalView.render({ content: modalSuccessView.render({ total }) });
});

// Закрытие попапа успешного завершения заказа
events.on('success:close', () => {
    modalView.close();
});
