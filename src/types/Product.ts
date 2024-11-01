import { Category } from './Category';

export type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: Category;
};