import { BasketItemView } from "../view/BasketItemView";
import { EventEmitter } from "../base/events";
import { BasketView } from "../view/BasketView";
import { BasketModel } from "../models/BasketModel";
import { CatalogModel } from "../models/CatalogModel";

// инициализация брокера событий
const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket'));
const basketModel = new BasketModel(events);
const catalogModel = new CatalogModel(events);

function getBasketItemContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('basket__item');
    container.innerHTML = `
        <h2 class="basket__title"></h2>
        <button class="basket-item__add">Добавить</button>
        <button class="basket-item__remove">Удалить</button>
    `;
    return container;
}

function renderBasket(items: string[]) {
    basketView.render({
        items: items.map(id => {
            const itemView = new BasketItemView(getBasketItemContainer(), events);
            return itemView.render(catalogModel.getProduct(id));
        })
    });
}
  
events.on('basket:change', (event: { items: string[] }) => {
    renderBasket(event.items);
});

events.on('ui:basket-add', (event: { id: string }) => {
    basketModel.add(event.id);
});

events.on('ui:basket-remove', (event: { id: string }) => {
    basketModel.remove(event.id);
});