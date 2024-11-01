export class catalogModel implements ICatalogModel {
    getProductByID(id: string) {
        let product: IProduct = undefined;
        return product; // get product from catalog
    }
    getProducts() {
        let products: IProduct[] = [];
        return products; // get all products from catalog
    }
}