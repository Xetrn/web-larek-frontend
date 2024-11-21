export enum Category {
  SOFT = 'софт-скил',
  HARD = 'хард-скил',
  BUTTON = 'кнопка',
  OTHER = 'другое',
  ADDITIONAL = 'дополнительное',
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: Category;
  price: number | null;
}

export interface IBasket {
  products: Set<BasketItem>;
  totalPrice: number;
}

export type CatalogItem = Omit<IProduct, 'description'>;

export type BasketItem = Pick<IProduct, 'id' | 'title' | 'price'>;
