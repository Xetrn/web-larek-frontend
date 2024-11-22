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
  
export interface IProductList {
  total: number;
  items: IProduct()
}

export interface ICardsData {
  items: IProduct[];
  preview: string | null;
} 

export interface IInputs {
  payment: string;
  address: string;
  email: string;
  phone: string;
}

export interface IOrder extends IInputs {
  total: number;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}

export interface IOrderData {
  clearData(): void;
  getData(): IOrder;
  setItems(products: IProduct[]): void;
  setField(field: keyof IInputs, value: string): void;
  validateOrder(): boolean;
  validateContacts(): boolean;
  checkValidation(data: TPayment | TContacts): boolean;
  checkField(value: string): boolean;
}

export interface BasketModel {
  items: Map<string, number>; 
  totalPrice: number; 
  addItem(productId: string): void; 
  removeItem(productId: string): void; 
  clearBasket(): void;
}

export type PaymentType = "online" | "cash"; 