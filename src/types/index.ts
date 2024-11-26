export interface IProduct {
    //идентификатор товара
    id: string; 

    //название товара                
    title: string;  

    //описание товара             
    description: string; 

    //изображение товара            
    image: string;    
    
    //цена товара
    price: number | null;  
    
    //категория
    category: string;

    //содержится ли в корзине
    isBacketContains: boolean           
}

export interface IProductList {
    //список всех продуктов
    items: IProduct[];

    //колличество всех продуктов
    total: number;
}

export interface IBacketProduct {
    //идентификатор товара
    id: string;

    //название товара
    title: string;

    //цена товара
    price: number;
}

export interface IOrder {
    //способ оплаты
    payment: string;

    //адрес
    address: string;

    //почта пользователя
    email: string;

    //телефонный номер пользователя
    phone: string;

    //итоговая сумма заказа
    total: number;

    //список приобретаемых товаров
    items: string[];
}