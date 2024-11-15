export type Payment = "online" | "on-site";

export interface IUserForm {
    email: string;
    phone: string;
}

export interface IOrderForm {
    payment: Payment;
    address: string;
}

export interface IOrderData {
    userData: IUserForm;
    orderForm: IOrderForm;
    total: number;
    items: IOrderItem[];
}

export interface IOrderItem{
    id: string
}

export interface IOrderResult {
    id: string;
    total: number;
}
