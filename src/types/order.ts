export type Payment = "online" | "on-site";

export interface IUserData {
    payment: Payment;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderData {
    userData: IUserData;
    total: number;
    items: string[];
}