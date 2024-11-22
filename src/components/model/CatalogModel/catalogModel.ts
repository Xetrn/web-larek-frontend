import { IProduct, IProductAPI } from '../../../types';
import { CatalogModelDependencies, ICatalogModel } from './catalogModel.types';

export class CatalogModel implements ICatalogModel {
  private api: IProductAPI;
  products: IProduct[];

  constructor({ api }: CatalogModelDependencies) {
    this.api = api;
  }

  async load() {
    const { items } = await this.api.getProducts();
    this.products = items;
  }

  getAll() {
    return this.products;
  }

  getPreviewById(id: string) {
    return this.products.find((p) => p.id === id);
  }
}
