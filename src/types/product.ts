
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    inBasket: boolean;
}

export interface ICatalogModel {
    items: IProduct[];
    getProduct(id: string): IProduct | undefined;
    setProducts(products: IProduct[]): void;
    getAllProducts(): IProduct[] | undefined;
}

interface IProductAPIResponse {
    total: number;
    items: IProduct[];
}

