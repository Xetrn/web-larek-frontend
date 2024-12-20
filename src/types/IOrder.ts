export interface IOrder {
    total: number;
    payment?: string;
    address: string;
    email: string;
    phone: string;
    items: string[];
}
