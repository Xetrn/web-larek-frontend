import { Events } from "../../types/eventsTypes";
import { IEvents } from "../base/events";
import { IProductsAPI } from "./api/productAPI";

export interface ICatalogModel {
    getCatalog: () => ICatalog;
    setProducts: () => void;
    callProductPreview: (id: string) => void;
}

export default class CatalogModel implements ICatalogModel {

    private catalog : ICatalog;
    private api: IProductsAPI;
    private broker: IEvents;

    constructor(api: IProductsAPI, broker: IEvents) {
        this.api = api;
        this.broker = broker;
        this.setProducts();
    }

    getCatalog(): ICatalog {
        return this.catalog;
    }

    setProducts(): void {
         this.api.getProducts()
        .then(products => products.map(({description, ...product}) => product as CatalogProduct))
        .then(catalogProducts => this.catalog = {products: catalogProducts})
        .then(_ => this.broker.emit(Events.CATALOG_FETCHED, this.catalog));
    }

    callProductPreview(id: string): void {
        this.api.getProduct(id)
        .then(product => this.broker.emit(Events.PRODUCT_CARD_OPENED, product));
    }
}