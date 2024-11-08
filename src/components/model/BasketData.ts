import { IBasketData } from '../../types/index';
import { IEvents } from '../base/events';
import { ICard } from '../../types/index';

export class BasketData implements IBasketData {
	protected _goods: ICard[] = [];
	total: 0;
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	get goods() {
		return this._goods;
	}

	set goods(cards: ICard[]) {
		this._goods = cards;
	}

	isInBasket(id: string) {
		return this._goods.some((good) => good.id === id);
	}
	//*

	addToBasket(card: ICard) {
		this._goods.push(card);
		this.total += card.price;
		// + basketData changed
	}

	removeFromBasket(id: string) {
		this._goods = this._goods.filter((good) => good.id !== id);
		this.total -= this._goods.find((good) => good.id === id)?.price ?? 0;
		// + basketData changed
	}

	clearBasket() {
		this._goods = [];
		this.total === 0;
		// + basketData changed
	}

	getGoodsNumber = (): number => this._goods.length;

	getTotal = (): number => this._goods.reduce((acc, good) => acc + good.price, 0);

	getIdsOfGoods = (): string[] => this._goods.map((good) => good.id);

	//*
}
