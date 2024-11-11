import { ICatalogModel } from "./catalogModel";
import { IProductModel } from "./productModel";
import { IBusketModel } from "./busketModel";

interface IAppState {
    catalog: ICatalogModel;
    order: IOrderModel;
    busket: IBusketModel;
    formState: IFormModel;
    productState: IProductModel;
}