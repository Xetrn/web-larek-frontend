export interface IModalPaymentView {
    confirm(payment: string, address: string): HTMLElement;
    close(): void;
}