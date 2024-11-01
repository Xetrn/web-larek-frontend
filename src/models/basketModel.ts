export class basketModel implements IBasketModel {
    add(id: string) {
        // add product to basket
    }

    remove(id: string) {
        // remove product from basket
    }

    clear() {
        // delete all products from basket
    }

    getProducts() {
        let products: IProduct[] = [];
        return products; // get all products from basket
    }
}