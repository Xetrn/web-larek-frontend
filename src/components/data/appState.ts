import { ICatalogModel } from "./catalogModel";
import { IProductModel } from "./productModel";


interface IAppState {
    catalog: ICatalogModel;
    order: IOrderModel;
    busket: IBusketModel;
    formState: IFormModel;
    productState: IProductModel;
}