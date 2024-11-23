export interface IProduct {
    id: string;
    title: string;
    price: number | null;
    category: string;
    image: string;
    description: string;
    inCart?: boolean;
    cartItemIndex?: number;
}

export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IModelData {
    catalog: IProduct[];
    shoppingCart: string[];
    preview: string | null;
}

export interface IcatalogChange {
    products: IProduct[];
}

export interface IUserDataForm {
    payment: string;
    address: string;
}

export interface IUserContactsForm {
    email: string;
    phone: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;