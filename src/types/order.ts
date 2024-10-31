type Payment = "online" | "on-site";

interface IUserData {
    payment: Payment;
    address: string;
    email: string;
    phone: string;
}

interface IOrderData {
    userData: IUserData;
    total: number;
    items: string[];
}