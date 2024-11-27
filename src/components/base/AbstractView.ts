import { isPlainObject } from '../../utils/utils';

import { IEvents } from './events';

interface IView {
	render(args?: object): unknown;
}

type TViewConstructionArgs<
	Element extends HTMLElement = HTMLElement,
	EventHandlers extends object = object
> = {
	element: Element;
	eventEmitter: IEvents;
	eventHandlers?: EventHandlers;
};

type TViewNested<RenderArgs extends object = object> = {
	view: IView | HTMLElement;
	renderArgs?: RenderArgs;
};

abstract class AbstractView<
	Element extends HTMLElement = HTMLElement,
	RenderArgs extends object = object,
	EventHandlers extends object = object
> implements IView
{
	protected readonly _element: Element;

	protected readonly _eventEmitter: IEvents;

	protected _eventHandlers: EventHandlers = {} as EventHandlers;

	constructor({
		element,
		eventEmitter,
		eventHandlers,
	}: TViewConstructionArgs<Element, EventHandlers>) {
		this._element = element;
		this._eventEmitter = eventEmitter;

		if (eventHandlers && isPlainObject(eventHandlers)) {
			this._eventHandlers = eventHandlers as EventHandlers;
		}
	}

	render(args?: Partial<RenderArgs>) {
		Object.assign(this, args ?? {});

		return this._element;
	}
}

export { AbstractView, IView, TViewConstructionArgs, TViewNested };
