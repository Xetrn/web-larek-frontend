export interface ICartModel {
    items: string[];
    add(id: string): void;
    remove(id: string): void;
    clear(): void;
    get total(): number
}