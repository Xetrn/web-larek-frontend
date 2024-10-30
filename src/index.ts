import './scss/styles.scss';
import {EventEmitter} from "./components/base/events";
import {CatalogModel} from "./models/CatalogModel";
import {CatalogView} from "./components/view/CatalogView";
import {Product} from "./types";
import {ProductView} from "./components/view/ProductView";
import {Api} from "./components/base/api";
import {API_URL} from "./utils/constants";
import {ProductsDTO} from "./types/ProductsDTO";
import {ModalView} from "./components/view/ModalView";
import {ProductModalView} from "./components/view/ProductModalView";
import {BucketModel} from "./models/BucketModel";

const api = new Api(API_URL)
const events = new EventEmitter()

const catalogModel = new CatalogModel(events)
const bucketModel = new BucketModel(events)
const catalogView = new CatalogView(events)
events.on("catalog-model: change items", (products: Product[]) => {
    catalogView.render({items: products.map(product => new ProductView(events).render(product))})
})

const modalView = new ModalView(events)

events.on("modal-view: close", () => {
    modalView.render({opened: false})
})

events.on("product-view: click", (product: Product) => {
    modalView.render({opened: true, content: new ProductModalView(events).render({product})})
})
events.on("product-modal-view: add", ({id}: {id: string}) => {
    bucketModel.add(id)
    modalView.render({opened: false})
})

api.get('/product/')
    .then((data: ProductsDTO) => {
        catalogModel.setItems(data.items)
    })
