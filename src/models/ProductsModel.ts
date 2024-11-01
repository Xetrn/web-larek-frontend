import {Product, ProductList} from "../types";

export class ProductsModel {
    private products: Product[] = [];

    setProducts(products: Product[]): void {
        this.products = products;
    }

    getProductById(id: string): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    getProductList(): ProductList {
        return {
            items: this.products,
            total: this.products.length,
        };
    }
}
