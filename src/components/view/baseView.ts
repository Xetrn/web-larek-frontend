export abstract class BaseView<T> {
  protected element: HTMLElement;
  abstract render(data: T): HTMLElement;
}
