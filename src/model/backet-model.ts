import { BacketProduct } from "../types";

export interface IBacketModel {
    products: BacketProduct[];
    add(id: string): void; //добавление товара в корзину
    get(id: string): BacketProduct; //найти определенный товар по id
    getAll(): BacketProduct[]; //все товары в корзине
    remove(id: string): void; //удалить товар из корзины
}
