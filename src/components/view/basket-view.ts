import { IEvents } from '../base/events';
import { View } from './View';
import { TBasketView } from '../../types/';

export class BasketView	extends View<TBasketView> {

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
	}
}
