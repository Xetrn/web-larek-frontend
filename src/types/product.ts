
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

export interface IProductAPIResponse {
    total: number;
    items: IProduct[];
}

export type Category = 'soft' | 'hard' | 'additional' | 'button' | 'other';
export const categoryMap: { [key: string]: Category } = {
    'софт-скил': 'soft',
    'хард-скил': 'hard',
    'дополнительное': 'additional',
    'кнопка': 'button',
    'другое': 'other'
};

