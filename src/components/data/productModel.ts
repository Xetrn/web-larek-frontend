
export interface IProductModel {
    getCurrentProduct: () => IProduct | null;
    setCurrentProduct: (product: IProduct) => void;
    addToBusket: (id: string) => void;
    removeFromBusket: (id: string) => void;
}

export default class ProductModel implements IProductModel {
    private currentProduct: IProduct | null;

    constructor() {
        this.currentProduct = null;
    }

    getCurrentProduct(): IProduct | null {
        return this.currentProduct;
    }

    setCurrentProduct(product: IProduct): void {
        this.currentProduct = product;
    }

    addToBusket(id: string): void {
        
    }

    removeFromBusket(id: string): void {

    }
}