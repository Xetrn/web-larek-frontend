import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './models/basketModel';
import { CatalogModel } from './models/catalogModel';
import { OrderModel } from './models/orderModel';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { getTotalBasketPrice } from './utils/utils';
import { BasketProductCardView } from './view/BasketProductCardView';
import { BasketRenderButtonView } from './view/BasketRenderButtonView';
import { BasketView } from './view/BasketView';
import { CatalogView } from './view/CatalogView';
import { OrderView } from './view/OrderView';
import { ProductCardView } from './view/ProductCardView';
import { ProductView } from './view/ProductView';
import { ProfileView } from './view/ProfileView';
import { SuccesModalView } from './view/SuccessView';

const api = new Api(API_URL)
const events = new EventEmitter()

const catalogModel = new CatalogModel(events);
const orderModel = new OrderModel(events);
const basketModel = new BasketModel(events);
const catalogView = new CatalogView(events);
const orderView = new OrderView(events);
const basketView = new BasketView(events);
const productCardView = new ProductCardView(events);
const profileView = new ProfileView(events);
const successModalView = new SuccesModalView(events);
const basketRenderButtonView = new BasketRenderButtonView(events);

events.on('changeCatalogData', (products: IProduct[]) => {
    catalogView.render({ items: products.map(product => new ProductView(events).render(product)) })
} );

events.on('changePaymentMethod', ({ payment }: { payment: PaymentMethod }) => {
    orderModel.setPaymentMethod(payment);
    events.emit('renderOrder');
})

events.on('changeAddressInput', ({ address }: { address: string }) => {
    orderModel.setAdrress(address);
})

events.on('changeEmailInput', ({ email }: { email: string }) => {
    orderModel.setEmail(email);
})

events.on('changePhoneInput', ({ phone }: { phone: string }) => {
    orderModel.setPhone(phone);
})

events.on('clearBasketData', () => {
    orderModel.clear();
    basketModel.clear();
    basketRenderButtonView.render({ productsLength: basketModel.getProductLength() });
});

events.on('clickOnCatalogProduct', (product: IProduct) => {
    productCardView.render(product);
})

events.on('addProductToBasket', (product: IProduct) => {
    basketModel.add(product);
    basketRenderButtonView.render({ productsLength: basketModel.getProductLength() });
})

events.on('deleteProductFromBasket', (product: IProduct) => {
    basketModel.remove(product);
    basketRenderButtonView.render({ productsLength: basketModel.getProductLength() });
})

events.on('checkModalError', ({ container, inputHasValue }: { container: HTMLElement, inputHasValue: boolean }) => {
    const errorContainer = container.querySelector('.form__errors');
    inputHasValue ? errorContainer.textContent = '' : errorContainer.textContent = 'Заполнены не все поля!';
})

events.on('renderBasket', () => {
    const products = basketModel.getProducts();
    const totalPrice = getTotalBasketPrice(products);
    const items = products.map((product, index) => new BasketProductCardView(events).render({ product, index }));
    basketView.render({ items, totalPrice })
})

events.on('renderOrder', () => {
    orderView.render({ address: orderModel.getAddress(), payment: orderModel.getPaymentMethod() });
})

events.on('renderProfile', () => {
    profileView.render({ email: orderModel.getEmail(), phone: orderModel.getPhone() });
})

events.on('renderSuccessModal', () => {
    try {
        api.post('/order', {
            address: orderModel.getAddress(),
            email: orderModel.getEmail(),
            phone: orderModel.getPhone(),
            payment: orderModel.getPaymentMethod(),
            total: getTotalBasketPrice(basketModel.getProducts()),
            items: basketModel.getProducts().map(product => product.id)
        });

        successModalView.render({ products: basketModel.getProducts() });
    } catch (error) {
        console.error("Ошибка при оформлении заказа:", error);
    }
})


api.get('/product')
    .then(({ items }: { items: IProduct[] }) => catalogModel.setProducts(items))
