export interface IView<T> {
    render(data?: Partial<T>): HTMLElement;
}

export class View<T> implements IView<T>{
    protected constructor(protected readonly container: HTMLElement) {}

    protected setTextContent(element: HTMLElement, value: unknown) {
        if (element) {
          element.textContent = String(value);
        }
      }

    protected setImageSrc(element: HTMLImageElement, src: string) {
        if(element) {
            element.src = src;
        }
    }

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }   
}