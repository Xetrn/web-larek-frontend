import IView from "./interfaces/IView";


export default class CatalogView implements IView<ICatalog> {
    container: HTMLElement;
    render: (data?: ICatalog) => HTMLElement;
}