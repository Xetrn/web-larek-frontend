export interface IModalDataView {
    confirm(email: string, phone: string): HTMLElement;
    close(): void;
}