import { IView } from "./view";

export class CartView implements IView {
    constructor(protected container: HTMLElement) {}
    render(data: { products: HTMLElement[] }): HTMLElement {
        if (data) {
            this.container.replaceChildren(...data.products);
        }
        return this.container;
    }
}