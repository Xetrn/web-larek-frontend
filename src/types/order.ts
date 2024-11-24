export interface IOrder {
  // Способ оплаты
  payment: string;
  // почта
  email: string;
  // Номр телефона
  phone: string;
  // Адрес
  address: string;
  // Итоговая сумма заказа
  total: number | null;
  // Продукты
  items: string[] | [];
}
