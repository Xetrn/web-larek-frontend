import { IEvents } from '../base/events';
import { EventsNames } from '../../utils/constants';

import { ICardData } from '../../types/index';

export class CardsData {
	protected _cards: ICardData[];
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set cards(cards: ICardData[]) {
		this._cards = cards;
		this.events.emit(EventsNames.CARDS_DATA_CHANGED, this._cards);
	}
	get cards() {
		return this._cards;
	}

	getCard = (id: string) => this._cards.find((card) => card.id === id); // ById
}
