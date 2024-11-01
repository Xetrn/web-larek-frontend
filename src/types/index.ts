type PaymentMethod = 'online' | 'after-dilivery';

// Types
interface IProduct {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    price: number;
    description: string;
    inBasket: boolean;
}

interface IBasket {
    products: Map<IProduct, number>;  // Map<product, count of product>
}

interface ICatalog {
    products: IProduct[];
}

interface IOrder {
    id: string;
    payment: PaymentMethod;
    customerEmail: string;
    customerAddres: string;
    customerPhone: string;
    products: Map<IProduct, number>;  // Map<product, count of product>
}

// Models
interface IProductModel {
    addToBasket(product: IProduct): void;
    removeFromBasket(product: IProduct): void;
}

interface IBasketModel {
    add(id: string): void;
    remove(id: string): void;
    clear(): void;
    getProducts(): IProduct[] | undefined;
}

interface ICatalogModel {
    getProductByID(id: string): IProduct | undefined;
    getProducts(): IProduct[] | undefined;
}

interface IOrderModel {
    getOrder(): IOrder | undefined;
}

