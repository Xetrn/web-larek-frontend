import { IProduct } from "./product"

export interface IProductsList {
  // Список всех продуктов
  items: IProduct[] | null;
  // Получение с сервера списка всех продуктов
  getItems(url: string): Promise<object>;

}