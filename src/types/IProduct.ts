import { ICategory } from './ICategory';

export interface IProduct {
    id: string;
    title: string;
    price: number;
    description: string;
    image: string;
    category: ICategory;
}

export interface ICartItem extends IProduct {
    index: number;
}