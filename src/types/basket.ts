
export interface IBasketModel{
    items: Map<string, number>,
    totalPrice: number,
    add(id: string): void;
    remove(id: string): void;
    clear(): void;
}

