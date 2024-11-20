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
import {BasketSettingsModalView} from "./components/view/BasketSettingsModalView";
import {ProfileModel} from "./models/ProfileModel";
import {ProfileSettingsModalView} from "./components/view/ProfileSettingsModalView";
import {OrderSuccessModalView} from "./components/view/OrderSuccessModalView";

const api = new Api(API_URL)
const events = new EventEmitter()

const catalogModel = new CatalogModel(events)
const basketModel = new BasketModel(events)
const profileModel = new ProfileModel(events)
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

    basketOpenButtonView.render({count: basketModel.getCount()})

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

events.on("basket-modal-view: buy", () => {
    const basketSettingsModalView = new BasketSettingsModalView(events)

    modalView.render({
        opened: true,
        content: basketSettingsModalView.render({method: basketModel.method, address: basketModel.address}),
        actions: basketSettingsModalView.renderActions({disabled: !basketModel.method || !basketModel.address})
    })
})

events.on("basket-settings-view: change method", ({method}: {method: "online" | "offline"}) => {
    basketModel.setMethod(method)
    const basketSettingsModalView = new BasketSettingsModalView(events)

    modalView.render({
        opened: true,
        content: basketSettingsModalView.render({method: basketModel.method, address: basketModel.address}),
        actions: basketSettingsModalView.renderActions({disabled: !basketModel.method || !basketModel.address})
    })
})

events.on("basket-settings-view: change address", ({address}: {address: string}) => {
    basketModel.setAddress(address)

    if(address.length <= 1) {
        const basketSettingsModalView = new BasketSettingsModalView(events)

        modalView.render({
            opened: true,
            content: basketSettingsModalView.render({method: basketModel.method, address: basketModel.address}),
            actions: basketSettingsModalView.renderActions({disabled: !basketModel.method || !basketModel.address})
        })
    }
})

events.on("basket-settings-view: next step", () => {
    const profileSettingsModalView = new ProfileSettingsModalView(events)

    modalView.render({
        opened: true,
        content: profileSettingsModalView.render({phone: profileModel.phone, email: profileModel.email}),
        actions: profileSettingsModalView.renderActions({disabled: !profileModel.phone || !profileModel.email})
    })
})

events.on("profile-settings-view: change phone", ({phone}: {phone: string}) => {
    profileModel.phone = phone

    if(phone.length <= 1) {
        const profileSettingsModalView = new ProfileSettingsModalView(events)

        modalView.render({
            opened: true,
            content: profileSettingsModalView.render({phone: profileModel.phone, email: profileModel.email}),
            actions: profileSettingsModalView.renderActions({disabled: !profileModel.phone || !profileModel.email})
        })
    }
})

events.on("profile-settings-view: change email", ({email}: {email: string}) => {
    profileModel.email = email

    if(email.length <= 1) {
        const profileSettingsModalView = new ProfileSettingsModalView(events)

        modalView.render({
            opened: true,
            content: profileSettingsModalView.render({phone: profileModel.phone, email: profileModel.email}),
            actions: profileSettingsModalView.renderActions({disabled: !profileModel.phone || !profileModel.email})
        })
    }
})

events.on("profile-settings-view: buy", () => {
    const products = catalogModel.items.filter(item => basketModel.has(item))

    api.post('/order/', {
        email: profileModel.email,
        phone: profileModel.phone,
        payment: basketModel.method,
        address: basketModel.address,
        total: products.reduce((sum, next) => sum + Number(next.price), 0),
        items: products.map(({id}) => id)
    })
        .then(({total}: {total: number}) => {
            basketModel.clear()

            basketOpenButtonView.render({count: basketModel.getCount()})

            modalView.render({
                opened: true,
                content: new OrderSuccessModalView(events).render({total}),
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

api.get('/product/')
    .then((data: ProductList) => {
        catalogModel.setItems(data.items)
    })
