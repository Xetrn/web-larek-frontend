

export interface IUserForm {
    email: string;
    phone: string;
}

export interface IOrderForm {
    payment: string;
    address: string;
}



export interface IOrderApiData extends IOrderBasketData, IUserForm, IOrderForm {}

export interface IOrderItem{
    id: string
}

export interface IOrderBasketData{
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export type FormErrors = Partial<Record<keyof IUserForm | keyof IOrderForm, string>>;
