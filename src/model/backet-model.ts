import { IBacketProduct } from "../types";

export interface IBacketModel {
    products: IBacketProduct[];
    add(id: string): void; //добавление товара в корзину
    get(id: string): IBacketProduct; //найти определенный товар по id
    getAll(): IBacketProduct[]; //все товары в корзине
    remove(id: string): void; //удалить товар из корзины
}
