import { Actions } from "../../utils/constants";
import { EventEmitter } from "../base/events";
import { OrderModel } from "../models/OrderModel";
import ModalView from "../views/ModalView";
import { Product } from "../../types";

export class OrderController {
    private CartView: ModalView;

    constructor(private events: EventEmitter, private model: OrderModel) {
        this.events.on(Actions.CART_CHANGE, this.renderCart.bind(this));
    }

    renderCart(products: Product[]) {}

}
