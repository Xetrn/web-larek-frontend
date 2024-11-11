import { CatalogItem, IProduct, IProductAPI } from '../types';

interface ICatalogModel {
  products: IProduct[];
  load(): Promise<void>;
  getAll(): CatalogItem[];
  getPreviewById(id: string): IProduct;
}

export class CatalogModel implements ICatalogModel {
  products: IProduct[];

  constructor(private api: IProductAPI) {}

  async load() {
    this.products = (await this.api.getProducts()).items;
  }

  getAll() {
    return this.products;
  }

  getPreviewById(id: string) {
    return this.products.find((p) => p.id === id);
  }
}
