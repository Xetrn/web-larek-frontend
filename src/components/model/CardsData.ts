import { ICard } from '../../types/index';
import { ICardsData } from '../../types/index';
import { IEvents } from '../base/events';

export class CardsData implements ICardsData {
	protected _cards: ICard[];
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set cards(cards: ICard[]) {
		this._cards = cards;
		// cards changed
	}

	get cards() {
		return this._cards;
	}

	getCard = (id: string) => this._cards.find((card) => card.id === id); // ById
}
