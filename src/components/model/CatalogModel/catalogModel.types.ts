import { CatalogItem, IProduct } from "../../../types";

export interface ICatalogModel {
  products: IProduct[];
  load(): Promise<void>;
  getAll(): CatalogItem[];
  getPreviewById(id: string): IProduct;
}