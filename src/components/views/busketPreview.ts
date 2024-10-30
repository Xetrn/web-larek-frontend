import IView from "./interfaces/IView";

export default class BusketPreview implements IView<number> {
    counter: HTMLElement;
    container: HTMLElement;
    render: (data?: number) => HTMLElement;
}