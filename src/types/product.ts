import { Api } from "../components/base/api";
import { EventEmitter } from "../components/base/events";
import { API_URL } from "../utils/constants";

interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    inBasket: boolean;
}

interface ICatalogModel {
    items: IProduct[];
    getProduct(id: string): IProduct | undefined;
    setProducts(products: IProduct[]): void;
    getAllProducts(): IProduct[] | undefined;
}

interface IProductAPIResponse {
    total: number;
    items: IProduct[];
}

interface IEventEmitter{
    emit: (event: string,data: unknown) => void;
}

class Products implements ICatalogModel {
    items: IProduct[] = [];

    constructor(protected emitter: IEventEmitter) {
    }

    setProducts(products: IProduct[]): void {
        this.items = products;
        this._emitChange();
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
        this._emitChange();
    }

    removeProductFromBasket(id: string): void {
        const product = this.getProduct(id);
        if (product) {
            product.inBasket = false;
        }
        this._emitChange();
    }

    protected _emitChange(): void {
        this.emitter.emit('catalog:change', {items: Array.from(this.items.map(product => ({id: product.id, inBasket: product.inBasket})))});
    }
}

const events = new EventEmitter();
const products = new Products(events);
const api = new Api('/');

events.on('catalog:change', (data) => {
    console.log(data);
});

api.get(API_URL)
    .then(products.setProducts.bind(products))
    .catch(err => console.error(err));


products.addProductToBasket('1');
products.addProductToBasket('2');
products.removeProductFromBasket('1');


