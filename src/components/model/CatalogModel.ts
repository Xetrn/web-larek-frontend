import { Model } from "../base/Model";
import { IProductList, IProduct } from "../../types/product";
import { LarekAPI } from "../../service/larek-api";
import { IEvents } from "../base/events";

type CatalogList = Omit<IProductList, 'total'>;

interface ICatalogModel {
  catalogList: CatalogList;
  loadProducts(): Promise<void>;
  getProductById(id: string): Promise<IProduct | null>;
}

export class CatalogModel extends Model<IProductList> implements ICatalogModel {
  catalogList: CatalogList;

  constructor(private api: LarekAPI, events: IEvents) {
    super({}, events); // Передаём пустой объект как начальные данные
  }

  async loadProducts(): Promise<void> {
    try {
      const { items } = await this.api.getProductList();
      this.catalogList = { items };
      this.emitChanges("products:changed", { items });
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  }

  async getProductById(id: string): Promise<IProduct | null> {
    try {
      const product = await this.api.getProductItem(id);
      // this.emitChanges("product:changed", { product });
      return product;
    } catch (error) {
      console.error(`Ошибка при получении продукта с ID ${id}:`, error);
      return null;
    }
  }
}
