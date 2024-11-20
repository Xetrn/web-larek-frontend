import { iComponent } from '../../types/base/iComponent';
import { EventEmitter } from './events';

export abstract class Component<T> implements iComponent {
	protected _template: HTMLElement;
	protected _container: HTMLElement;
	protected _events: EventEmitter;

	protected constructor(
		container: HTMLElement,
		events: EventEmitter,
		template: HTMLElement
	) {
		this._template = template;
		this._events = events;
		this._container = container;
	}

	get template(): HTMLElement {
		return this._template;
	}

	get container(): HTMLElement {
		return this._container;
	}

	get events(): EventEmitter {
		return this._events;
	}

	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
