
interface IProductModel {
    product: IProduct;
    addToBusket: (id: string) => void;
    removeFromBusket: (id: string) => void;
}