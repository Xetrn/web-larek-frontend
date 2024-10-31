export abstract class BaseView {
  protected element: HTMLElement;
	abstract render(data: unknown): HTMLElement;
}
