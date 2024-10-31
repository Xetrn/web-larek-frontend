export interface IView {
	render(data?: object): HTMLElement;
}

export interface IPresenter<T extends object> {
	view: IView;
	model: T;
	init(): void;
}
