export interface IView {
	render(data?: object): HTMLElement;
}

export interface IPresenter<V extends IView, M extends object> {
	view: V;
	model: M;
	init(): void;
}
