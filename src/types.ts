export interface IProduct {
    id: string;
    description: string;
    price: number | null;
    image: string;
    title: string;
    category: string;
}

export interface IOrderForm {
    payment: string;
    address: string
    email: string;
    phone: string;
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IForm {
    valid: boolean;
    errors: string[];
}

export interface IOrder {
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
}

export interface IOrderResult {
    total: number
}

export interface IAppState {
    products: IProduct[];
    basket: IProduct[];
    preview: string | null;
    order: IOrder;
}