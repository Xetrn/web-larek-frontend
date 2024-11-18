import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';

import { IBasketData } from '../../types/index';
import { ICardData } from '../../types/index';

export class BasketData implements IBasketData {
	protected _goods: ICardData[] = [];
	total: 0;
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	get goods() {
		return this._goods;
	}
	set goods(cards: ICardData[]) {
		this._goods = cards;
	}

	isInBasket(id: string) {
		return this._goods.some((good) => good.id === id);
	}
	//*

	addToBasket(card: ICardData) {
		this._goods.push(card);
		this.total += card.price;
		this.events.emit(Events.BASKET_DATA_CHANGED, { id: card.id });
	}
	removeFromBasket(id: string) {
		const itemIndex = this._goods.findIndex((good) => good.id === id);

		if (itemIndex === -1) {
			return;
		}

		this.total -= this._goods[itemIndex].price;
		this._goods.splice(itemIndex, 1);
		this.events.emit(Events.BASKET_DATA_CHANGED, { id });
	}

	clearBasket() {
		this._goods = [];
		this.total === 0;
		this.events.emit(Events.BASKET_DATA_CHANGED, this._goods);
	}

	getGoodsNumber = (): number => this._goods.length;
	getTotal = (): number => this._goods.reduce((acc, good) => acc + good.price, 0);
	getGoodsIds = (): string[] => this._goods.map((good) => good.id);
	isEmpty = (): boolean => this._goods.length === 0;
}
