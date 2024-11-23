import './scss/styles.scss';

import { ModelData } from './components/modelData';
import { EventEmitter } from './components/base/events';
import { CustomAPI } from './components/customApi';
import { API_URL, CDN_URL } from './utils/constants';
import { ProductCard } from './components/productCard';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/page';
import {
    IProduct,
    IUserContactsForm,
    IUserDataForm,
    IcatalogChange,
} from './types';
import { Popup } from './components/popup';
import { ShoppingCart } from './components/shoppingCart';
import { UserDataForm } from './components/userDataForm';
import { UserContactsForm } from './components/userContactsForm';
import { Success } from './components/success';

const events = new EventEmitter();
const api = new CustomAPI(CDN_URL, API_URL);
const appData = new ModelData({}, events);
const page = new Page(document.body, events);

// КАРТОЧКИ

const cardTemlate = ensureElement<HTMLTemplateElement>('#card-catalog');

// Получение данных карточек товарав с сервера
api.getProductList()
  .then(appData.setCatalog.bind(appData))
  .catch((err) => {
      console.error(err);
  });

// Отображение карточек в галерее после подгрузки данных
events.on<IcatalogChange>('catalog:change', () => {
    page.catalog = appData.catalog.map((item) => {
        const card = new ProductCard(cloneTemplate(cardTemlate), {
            onClick: () => events.emit('preview:change', item),
        });
        return card.render({
            title: item.title,
            image: item.image,
            price: item.price,
            category: item.category,
        });
    });
});

// Отображение модального окна карточки товара
const modal = new Popup(ensureElement<HTMLElement>('#modal-container'), events);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

events.on('preview:change', (item: IProduct) => {
    const card = new ProductCard(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
            if (!item.inCart) {
                events.emit('productCard:add', item);
            } else {
                events.emit('productCard:remove', item);
            }
            card.changeButtonDescription(item.inCart);
        },
    });
    modal.render({
        content: card.render({
            id: item.id,
            title: item.title,
            image: item.image,
            description: item.description,
            inCart: item.inCart,
            category: item.category,
            price: item.price,
        }),
    });
    page.locked = true;
});

// Разблокировка скролла при закрытии модального окна
events.on('modal:close', () => {
    page.locked = false;
});

// КОРЗИНА

const shoppingCartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardInShoppingCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const shoppingCart = new ShoppingCart(cloneTemplate(shoppingCartTemplate),events);

// Добавление товара в корзину
events.on('productCard:add', (item: IProduct) => {
    item.inCart = true;
    appData.addToShoppingCart(item);
    modal.close();
});

// Удаление товара из корзины
events.on('productCard:remove', (item: IProduct) => {
    item.inCart = false;
    appData.removeFromShoppingCart(item);
    modal.close();
});

// Отображение модального окна корзины
events.on('shoppingCart:select', () => {
    // Активируем кнопку "Оформить" если в корзину добавлен товар
    shoppingCart.buttonToggler = appData.shoppingCart.map((item) => item.id);
    modal.render({
        content: shoppingCart.render({
            total: appData.getTotal(),
        }),
    });
    page.locked = true;
});

// Изменение наполнения корзины
events.on('shoppingCart:change', () => {
    page.counter = appData.countShoppingCartItems();
    shoppingCart.total = appData.getTotal();
    shoppingCart.items = appData.shoppingCart.map((item, cartItemIndex) => {
        const card = new ProductCard(cloneTemplate(cardInShoppingCartTemplate), {
            onClick: () => {
                events.emit('cardInShoppingCart:remove', item);
                // Проверяем, не пора ли блокировать кнопку, если в корзине не осталось товаров
                shoppingCart.buttonToggler = appData.shoppingCart.map((item) => item.id)
            },
        });
        return card.render({
            cartItemIndex: cartItemIndex + 1,
            title: item.title,
            price: item.price,
        });
    });
});

// Событие удаления карточки товара из корзины без закрытия модального окна корзины
events.on('cardInShoppingCart:remove', (item: IProduct) => {
    appData.removeFromShoppingCart(item);
});

// ОФОРМЛЕНИЕ ЗАКАЗА
const userDataTemplate = ensureElement<HTMLTemplateElement>('#order');
const userContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const userData = new UserDataForm(cloneTemplate(userDataTemplate), events);
const userContacts = new UserContactsForm(cloneTemplate(userContactsTemplate),events);

// Отображение модального окна формы ввода способа оплаты и адреса доставки
events.on('goToOrder:submit', () => {
    modal.render({
        content: userData.render({
            valid: false,
            errors: [],
            payment: '',
            address: '',
        }),
    });
});

// отображение модального окна формы ввода электронной почты и номера телефона
events.on('order:submit', () => {
    modal.render({
        content: userContacts.render({
            valid: false,
            errors: [],
            phone: '',
            email: '',
        }),
    });
});

// Изменилось состояние валидации формы ввода способа оплаты и адреса доставки
events.on('UserDataFormErrors:change', (errors: Partial<IUserDataForm>) => {
    const { address, payment } = errors;
    userData.valid = !payment && !address;
    userData.errors = Object.values({ payment, address })
      .filter((i) => !!i)
      .join('; ');
});

// Изменилось состояние валидации формы ввода электронной почты и номера телефона
events.on(
  'UserContactsFormErrors:change',
  (errors: Partial<IUserContactsForm>) => {
      const { email, phone } = errors;
      userContacts.valid = !email && !phone;
      userContacts.errors = Object.values({ email, phone })
        .filter((i) => !!i)
        .join('; ');
  }
);

// Изменилось одно из полей формы ввода способа оплаты и адреса доставки
events.on(
  /^order\..*:change/,
  (data: { field: keyof IUserDataForm; value: string }) => {
      appData.setUserDataField(data.field, data.value);
  }
);

// Изменилось одно из полей формы электронной почты и номера телефона
events.on(
  /^contacts\..*:change/,
  (data: { field: keyof IUserContactsForm; value: string }) => {
      appData.setUserContactsField(data.field, data.value);
  }
);

// Завершение заказа, отправка сформированного заказа на сервер
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const success = new Success(cloneTemplate(successTemplate),{onClick:()=> modal.close()})

events.on('contacts:submit', () => {
    api.orderProducts({...appData.order, items: appData.shoppingCart.map((item) => item.id), total: appData.getTotal()})
      .then((res) => {
          appData.clearShoppingCart(),
            shoppingCart.resetCartView(),
            appData.clearOrder(),
            page.counter = 0,
            modal.render({
                content: success.render({
                    total: res.total,
                }),
            });
      })
      .catch((error) => {
          console.log(error);
      });
});