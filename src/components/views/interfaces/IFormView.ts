import IView from "./IView";

export interface IFormView<T> extends IView<T> {
    resetForm: () => void;
}