type PaymentMethod = 'card' | 'cash';

// Types
interface IProduct {
    id: string;
    title: string;
    category: string;
    image: string;
    price: number;
    description: string;
    inBasket: boolean;
}


// Models
interface IBasketModel {
    add(product: IProduct): void;
    remove(product: IProduct): void;
    getProductLength(): number;
    clear(): void;
    getProducts(): IProduct[];
}

interface ICatalogModel {
    getProducts(): IProduct[];
    setProducts(products: IProduct[]): void;
}

interface IOrderModel {
    clear(): void;
    setPaymentMethod(method: PaymentMethod): void;
    setAdrress(address: string): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
    getPaymentMethod(): PaymentMethod;
    getAddress(): string;
    getEmail(): string;
    getPhone(): string;
}

