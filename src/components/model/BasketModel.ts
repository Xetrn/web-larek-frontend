import { Model } from "../base/Model";
import { BasketProductItem } from "../../types/product";

interface IBacketModel {
  productsList: BasketProductItem[];
	total: number;
  add(product: BasketProductItem): void;
  remove(product: BasketProductItem): void;
	has(id: string): void;
  clearBasket(): void;
}

export class BacketModel extends Model<BasketProductItem> implements IBacketModel {
  productsList: BasketProductItem[] = [];
	total = 0 as number;

	add(product: BasketProductItem) {
		this.productsList = [...this.productsList, product];
		this.updateTotalBasketSum();
	}

	remove(product: BasketProductItem) {
		this.productsList = this.productsList.filter(
			(item) => item.id !== product.id
		);
		this.updateTotalBasketSum();
	}
	
  has(id: string) {
		return Array.from(this.productsList).some((product) => product.id === id);
  }
	
	clearBasket() {
		this.productsList = [];
		this.updateTotalBasketSum();
	}

	private finalPrice() {
		let total = 0;
		this.productsList.forEach((product) => {
			total += product.price;
		});
		return total;
	}

	private updateTotalBasketSum() {
		this.total = this.finalPrice();
	}
}
