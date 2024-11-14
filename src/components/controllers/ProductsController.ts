import { Actions } from "../../utils/constants";
import { EventEmitter } from "../base/events";
import { ProductsModel } from "../models/ProductsModel";
import { IView } from "../views/IView";
import { Product } from "../../types";


export class ProductsController {
    private CatalogView: IView;

    constructor(private events: EventEmitter, private model: ProductsModel, ) {
        this.events.on(Actions.CATALOG_CHANGE, this.renderCatalog.bind(this));
    }

    renderCatalog(products: Product[]) {}
}
