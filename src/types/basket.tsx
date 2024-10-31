export interface IBasket{
	items: Map<string, number>,
	totalPrice: number,
	add(id: string): void;
	changeAmount(id: string, amount: number): void;
	remove(id: string): void;
	clear(): void;
}