import { IEvents } from '../base/events';
import { Events } from '../../utils/constants';

import { ICardData } from '../../types/index';
import { ICardsData } from '../../types/index';

export class CardsData implements ICardsData {
	protected _cards: ICardData[];
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set cards(cards: ICardData[]) {
		this._cards = cards;
		this.events.emit(Events.CARDS_DATA_CHANGED, this.cards);
	}
	get cards() {
		return this._cards;
	}

	getCard = (id: string) => this._cards.find((card) => card.id === id); // ById
}
