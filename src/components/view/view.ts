export abstract class View {
  protected element: HTMLElement;
	abstract render(data: unknown): HTMLElement;
}
