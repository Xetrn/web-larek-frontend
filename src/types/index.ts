export interface Product {
    //идентификатор товара
    id: string; 

    //название товара                
    name: string;  

    //описание товара             
    description: string; 

    //изображение товара            
    image: string;    
    
    //цена товара
    price: number | null;             
}

export interface ProductList {
    //список всех продуктов
    products: Product[];
}

export interface BacketProduct {
    //идентификатор товара
    id: string;

    //название товара
    name: string;

    //цена товара
    price: number;
}

export interface Order {
    //идентификатор заказа
    id: string;

    //способ оплаты
    payment: string;

    //адрес
    address: string;

    //почта пользователя
    email: string;

    //телефонный номер пользователя
    phone: string;

    //итоговая сумма заказа
    totalPrice: number;

    //список приобретаемых товаров
    products: BacketProduct[];
}