import { Api } from "../../base/api";

interface IProductsAPI {
    getProducts: () => Promise<IProduct[]>;
    getProduct: (id: string) => Promise<IProduct>;
}
