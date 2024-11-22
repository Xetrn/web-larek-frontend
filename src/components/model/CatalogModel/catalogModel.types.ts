import { CatalogItem, IProduct, IProductAPI } from '../../../types';

export interface ICatalogModel {
  products: IProduct[];
  load(): Promise<void>;
  getAll(): CatalogItem[];
  getPreviewById(id: string): IProduct;
}

export interface CatalogModelDependencies {
  api: IProductAPI;
}
