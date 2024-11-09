// Устанавливает dataset атрибуты элемента
export function setElementData<T extends Record<string, unknown> | object>(
	el: HTMLElement,
	data: T
) {
	for (const key in data) {
		el.dataset[key] = String(data[key]);
	}
}

//  Проверка на простой объект
export function isPlainObject(obj: unknown): obj is object {
	const prototype = Object.getPrototypeOf(obj);
	return prototype === Object.getPrototypeOf({}) || prototype === null;
}

export function isBoolean(v: unknown): v is boolean {
	return typeof v === 'boolean';
}

//  Фабрика DOM-элементов в простейшей реализации
//  здесь не учтено много факторов
//  в интернет можно найти более полные реализации
export function createElement<T extends HTMLElement>(
	tagName: keyof HTMLElementTagNameMap,
	props?: Partial<Record<keyof T, string | boolean | object>>,
	children?: HTMLElement | HTMLElement[]
): T {
	const element = document.createElement(tagName) as T;

	if (props) {
		for (const key in props) {
			const value = props[key];

			if (isPlainObject(value) && key === 'dataset') {
				setElementData(element, value);
			} else {
				// @ts-expect-error fix indexing later
				element[key] = isBoolean(value) ? value : String(value);
			}
		}
	}

	if (children) {
		for (const child of Array.isArray(children) ? children : [children]) {
			element.append(child);
		}
	}

	return element;
}
