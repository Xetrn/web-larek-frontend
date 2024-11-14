import { ICatalogModel, IEventEmitter, IProductModel } from "../../types";

export class CatalogModel implements ICatalogModel {
    constructor(protected events: IEventEmitter) {}
    products: IProductModel[];
    setItems(products: IProductModel[]): void {
        this.products = products;
        this.events.emit('catalog-model:set-items', products);
    }
    getProduct(id: string): IProductModel {
        if (!this.products) return;
        return this.products.find((product) => product.id === id);
    }
  
}