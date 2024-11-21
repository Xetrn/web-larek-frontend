
export default interface IView<T> {
    container: HTMLElement;
    render: (data?: T) => HTMLElement;
}