export type Order = {
    paymentTime: "online" | "cash";
    address: string;
    email: string;
    phone: string;
    items: number[];
}
