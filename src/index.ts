import './scss/styles.scss'
import { API_URL } from './utils/constants'
import { EventEmitter } from './components/base/events'
import { Event } from './types/events'
import CardDefaultView from './view/product-card-default-view'
import CardActiveView from './view/product-card-active-view'
import { IProductsList } from './types/productsList'
import { ProductApi } from './components/data/productApi'
import { MarketPageView } from './view/market-page-view'
import { MarketPageModalView } from './view/modal-data-view'
import { MarketPageModel } from './model/market-page-model'
import BusketView from './view/busket-view'
import BusketButtonView from './view/busket-button-view'
import { IProduct } from './types/product'
import { BusketModel } from './model/basket-model'
import OrderFirstStepView from './view/order-first-step-view'
import OrderSecondStepView from './view/order-second-step-view'
import OrderFinishStepView from './view/modal-order-finish-view'
import { OrderModel } from './model/order-model'

const event = new EventEmitter()
const productApi = new ProductApi(API_URL)

const marketPageView = new MarketPageView()
const marketPageModel = new MarketPageModel(event)
const marketPageModalView = new MarketPageModalView(event)
const busketModel = new BusketModel(event)
const orderModel = new OrderModel(event)
const busketButtonView = new BusketButtonView([], event)
let busketView = new BusketView([], event)

productApi.getProducts()
.then((data: IProductsList) => {
    marketPageModel.getAllProducts(data.items)
})

event.on(Event.LOAD_PRODUCTS, (products: IProduct[]) => {
    marketPageView.render({items: products.map(product => new CardDefaultView(product, event).template)})
})

event.on(Event.PRODUCT_CARD_OPEN, (product: IProduct) => {
    marketPageModalView.renderOne({item: new CardActiveView(product, event).template})
})

event.on(Event.MODAL_CLOSE, () => marketPageModalView.remove())

event.on(Event.BUSKET_OPEN, (products: IProduct[]) => {
    marketPageModalView.renderOne({
        item: busketView.template
    })
})

event.on(Event.ADD_PRODUCT_TO_BUSKET, (product: IProduct) => {
    busketModel.addProduct(product)
    busketButtonView.render(busketModel.items.length)
    busketView = new BusketView(busketModel.items, event)
})

event.on(Event.REMOVE_PRODUCT_FROM_BUSKET, (product: IProduct) => {
    busketModel.removeProduct(product)
    busketButtonView.render(busketModel.getProductСount())
    busketView = new BusketView(busketModel.items, event)
    marketPageModalView.renderOne({
        item: busketView.template
    })
})

event.on(Event.ORDER_EMIT, (products: IProduct[]) => {
    marketPageModalView.renderOne({item: new OrderFirstStepView(products, event).template})
    orderModel.setItems(products.map((x) => x.id))
    orderModel.setPrice(products.reduce((sum, item) => sum + item.price, 0))
})

event.on(Event.ORDER_ADD_ADDRESS, ({address}: {address: string}) => {
    orderModel.setAddress(address)
})

event.on(Event.ORDER_ADD_PAYMENT, ({payment}: {payment: string}) => {
    orderModel.setPayment(payment)
})

event.on(Event.ORDER_ADD_EMAIL, ({email}: {email: string}) => {
    orderModel.setEmail(email)
})

event.on(Event.ORDER_ADD_PHONE, ({phone}: {phone: string}) => {
    orderModel.setPhone(phone)
})

event.on(Event.ORDER_CONTINUE, (products: IProduct[]) => {
    marketPageModalView.renderOne({item: new OrderSecondStepView(products, event).template})

})

event.on(Event.PAY, (products: IProduct[]) => {
    productApi.post('/order/', orderModel.getOrder()).then((data) => { console.log(data) }).catch(console.error)
    marketPageModalView.renderOne({item: new OrderFinishStepView(products, event).template})
    busketModel.clearBucket()
    busketButtonView.render(busketModel.getProductСount())
    busketView = new BusketView(busketModel.items, event)
})

event.on(Event.ORDER_END, () => {
    marketPageModalView.remove()
})
