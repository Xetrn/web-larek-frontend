import { iComponent } from '../../types/base/iComponent';
import { EventEmitter } from './events';

export abstract class Component<T> implements iComponent {
	events: EventEmitter;
	template: HTMLElement;

	protected constructor(public container: HTMLElement) {}

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
		console.log(data);
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
