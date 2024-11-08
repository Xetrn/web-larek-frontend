import { IEvents } from '../base/events';

export abstract class View<T> {
	protected container: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		this.container = container;
		this.events = events;
	}

	toggleClass(element: HTMLElement, className: string, method?: boolean) {
		element.classList.toggle(className, method);
	}

	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'true');
			else element.removeAttribute('disabled');
		}
	}

	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}
	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	render(): HTMLElement {
		//*
		return this.container;
	}
}
