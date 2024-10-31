export type ProductPreviewButtonLabel = 'В корзину' | 'Удалить из корзины';

type CategoryType =
  | 'софт-скил'
  | 'хард-скил'
  | 'кнопка'
  | 'другое'
  | 'дополнительное';

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: CategoryType;
  price: number | null;
}

export type CatalogProduct = Omit<IProduct, 'description'>;
