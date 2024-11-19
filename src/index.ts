import './scss/styles.scss';
import {EventEmitter} from "./components/base/events";
import {CatalogModel} from "./models/CatalogModel";
import {CatalogView} from "./components/view/CatalogView";
import {Product} from "./types";
import {ProductView} from "./components/view/ProductView";
import {Api} from "./components/base/api";
import {API_URL} from "./utils/constants";
import {ProductList} from "./types/ProductList";
import {ModalView} from "./components/view/ModalView";
import {ProductModalView} from "./components/view/ProductModalView";
import {BasketModel} from "./models/BasketModel";
import {BasketOpenButtonView} from "./components/view/BasketOpenButtonView";
import {BasketModalView} from "./components/view/BasketModalView";

const api = new Api(API_URL)
const events = new EventEmitter()

const catalogModel = new CatalogModel(events)
const basketModel = new BasketModel(events)
const catalogView = new CatalogView(events)

const basketOpenButtonView = new BasketOpenButtonView(events)

events.on("catalog-model: change items", (products: Product[]) => {
    catalogView.render({items: products.map(product => new ProductView(events).render(product))})
})

const modalView = new ModalView(events)

events.on("modal-view: close", () => {
    modalView.render({opened: false})
})

events.on("product-view: click", (product: Product) => {
    modalView.render({
        opened: true,
        content: new ProductModalView(events).render({product, inBasket: basketModel.has(product)})
    })
})
events.on("product-modal-view: add", ({product}: { product: Product }) => {
    basketModel.add(product)

    modalView.render({
        opened: true,
        content: new ProductModalView(events).render({product, inBasket: basketModel.has(product)})
    })
})

events.on("basket-open-button-view: click", () => {
    const basketModalView = new BasketModalView(events)
    const products = catalogModel.items.filter(item => basketModel.has(item))

    modalView.render({
        opened: true,
        content: basketModalView.render({products}),
        actions: basketModalView.renderActions({products})
    })
})

events.on("product-basket-view: delete", (product: Product) => {
    basketModel.remove(product)

    const basketModalView = new BasketModalView(events)
    const products = catalogModel.items.filter(item => basketModel.has(item))
    modalView.render({
        opened: true,
        content: basketModalView.render({products}),
        actions: basketModalView.renderActions({products})
    })
})

api.get('/product/')
    .then((data: ProductList) => {
        catalogModel.setItems(data.items)
    })
