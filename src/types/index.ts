export interface Product {
  id: string; 
  description: string;
  image: string;
  title: string; 
  category: string; 
  price: number;
}

export interface ProductInBasket extends Product {
  isAddedToBasket: boolean;  
}

export interface CatalogModel {
  products: ProductInBasket[];  
  findProductById(productId: string): ProductInBasket | undefined; 
  setProductList(newProducts: ProductInBasket[]): void; 
  getProductList(): ProductInBasket[]; 
}

export interface BasketModel {
  items: Map<string, number>; 
  totalPrice: number; 
  addItem(productId: string): void; 
  removeItem(productId: string): void; 
  clearBasket(): void;
}

export type PaymentType = "online" | "cash"; 

export interface UserData {
  paymentMethod: PaymentType;
  address: string; 
  email: string; 
  phoneNumber: string;
}

export interface OrderDetails {
  customerInfo: UserData;
  orderTotal: number; 
  productIds: string[];
}

export interface ProductAPIResponse {
  totalItems: number; 
  products: Product[];
}