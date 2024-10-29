
interface IOrderModel {
    order: IOrder;

    setOrderField: (field: string, value: string) => void;
    setContactsField: (field: string, value: string) => void;
    getTotalPrice: () => number;
    getOrder: () => IOrder;
}