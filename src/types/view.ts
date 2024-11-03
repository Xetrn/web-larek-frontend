interface IView<T> {
	render(data?: T): HTMLElement;
}
