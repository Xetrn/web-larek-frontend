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

const cardTemlate = ensureElement<HTMLTemplateElement>('#card-catalog');

api.getProductList()
  .then(appData.setCatalog.bind(appData))
  .catch((err) => {
      console.error(err);
  });

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

events.on('modal:close', () => {
    page.locked = false;
});


const shoppingCartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardInShoppingCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const shoppingCart = new ShoppingCart(cloneTemplate(shoppingCartTemplate),events);

events.on('productCard:add', (item: IProduct) => {
    item.inCart = true;
    appData.addToShoppingCart(item);
    modal.close();
});

events.on('productCard:remove', (item: IProduct) => {
    item.inCart = false;
    appData.removeFromShoppingCart(item);
    modal.close();
});

events.on('shoppingCart:select', () => {
    shoppingCart.buttonToggler = appData.shoppingCart.map((item) => item.id);
    modal.render({
        content: shoppingCart.render({
            total: appData.getTotal(),
        }),
    });
    page.locked = true;
});

events.on('shoppingCart:change', () => {
    page.counter = appData.countShoppingCartItems();
    shoppingCart.total = appData.getTotal();
    shoppingCart.items = appData.shoppingCart.map((item, cartItemIndex) => {
        const card = new ProductCard(cloneTemplate(cardInShoppingCartTemplate), {
            onClick: () => {
                events.emit('cardInShoppingCart:remove', item);
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

events.on('cardInShoppingCart:remove', (item: IProduct) => {
    appData.removeFromShoppingCart(item);
});

const userDataTemplate = ensureElement<HTMLTemplateElement>('#order');
const userContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const userData = new UserDataForm(cloneTemplate(userDataTemplate), events);
const userContacts = new UserContactsForm(cloneTemplate(userContactsTemplate),events);

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

events.on('UserDataFormErrors:change', (errors: Partial<IUserDataForm>) => {
    const { address, payment } = errors;
    userData.valid = !payment && !address;
    userData.errors = Object.values({ payment, address })
      .filter((i) => !!i)
      .join('; ');
});

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

events.on(
  /^order\..*:change/,
  (data: { field: keyof IUserDataForm; value: string }) => {
      appData.setUserDataField(data.field, data.value);
  }
);

events.on(
  /^contacts\..*:change/,
  (data: { field: keyof IUserContactsForm; value: string }) => {
      appData.setUserContactsField(data.field, data.value);
  }
);

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