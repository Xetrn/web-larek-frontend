import { ICatalogModel, IProduct, IProductAPIResponse } from "../types/product";
import { EventEmitter } from "../components/base/events";

export class Products implements ICatalogModel {
    items: IProduct[] = [];

    constructor(protected emitter: EventEmitter) {
    }

    setProducts(products: IProduct[]): void {
        this.items = products;
        this.setInBasketField();
        this._emitChange('catalog:load');
    }

    setInBasketField(){
        this.items.forEach(product => {
            product.inBasket = false;
        });
    }

    getProduct(id: string): IProduct | undefined {
        return this.items.find(product => product.id === id);
    }

    getAllProducts(): IProduct[] {
        return this.items;
    }

    addProductToBasket(id: string): void {
        const product = this.getProduct(id);
        if (product) {
            product.inBasket = true;
        }
        this._emitChange('catalog:addBasket');
    }

    

    removeProductFromBasket(id: string): void {
        const product = this.getProduct(id);
        if (product) {
            product.inBasket = false;
        }
        this._emitChange('catalog:removeBasket');
    }

    protected _emitChange(evt:string): void {
        this.emitter.emit(evt, 
            {items: Array.from(this.items.map(product => 
                ({
                    id: product.id,
                    inBasket: product.inBasket,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                })))
            }   
        );
    }
}