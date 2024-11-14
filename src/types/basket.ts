
export interface IBasketModel{
    items: IBasketItem[],
    totalPrice: number,
    add(item: IBasketItem): void;
    remove(id: string): void;
    clear(): void;
}

export interface IBasketCatalog{
    items: IBasketItem[],
    total: number,
}

export interface IBasketItem{
    id: string,
    title: string,
    price: number,
}

export interface IBasketItemView{
    id: string,
    index: number,
    title: string,
    price: number
}


export interface IModalWindow{
    closeButton: HTMLElement,
    actionButton: HTMLElement,
    open(): void;
    close(): void;
    render(data: HTMLElement): void;
}