

export interface IBusketModel {
    getBusket: () => IBusket;
    getBusketCount: () => number;
    addToBusket: (product: IProduct) => void;
    removeFromBusket: (id: string) => void;
    clearBusket: () => void;
    isInBusket: (id: string) => boolean;

}


export default class BusketModel implements IBusketModel {

    private busket: IBusket;

    constructor() {
        this.busket = {products: [], totalPrice: 0};
    }

    getBusket(): IBusket {
        return this.busket;
    }

    getBusketCount(): number {
        return this.busket.products.length;
    }

    addToBusket(product: IProduct): void {
        this.busket.totalPrice += product.price;
        const busketProduct: BusketProduct = {id: product.id, price: product.price, title: product.title};
        this.busket.products.push(busketProduct);
    }

    removeFromBusket(id: string):void {
        this.busket.totalPrice -= this.busket.products.find(p => p.id === id).price
        this.busket.products = this.busket.products.filter(p => p.id !== id);
    }

    isInBusket(id: string): boolean {
        return this.busket.products.find(p => p.id === id) !== undefined;
    }

    clearBusket(): void {
        this.busket.products = [];
        this.busket.totalPrice = 0;
    }
}