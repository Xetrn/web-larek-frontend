export interface IProduct {
  // Идентификатор продукта
  id: string;
  // Описание продукта
  description: string; 
  // Изображение продукта
  image: string;
  // Название продукта
  title: string;
  // Категория продукта
  category: string;
  // Цена продукта
  price: number | null;
  // Находится ли товар в корзине
  busket: false | true;
}