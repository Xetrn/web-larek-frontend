
export interface IBasketModel{
    items: IBasketItem[],
    totalPrice: number,
    add(item: IBasketItem): void;
    remove(id: string): void;
    clear(): void;
}

export interface IBasketItem{
    id: string,
    title: string,
    price: number,
}


export interface IModalWindow{
    closeButton: HTMLElement,
    actionButton: HTMLElement,
    open(): void;
    close(): void;
    render(data: HTMLElement): void;
}