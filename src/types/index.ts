//Тип продукта с сервера
export type Product = {
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
}

//Тип списка продуктов с сервера
export type ProductsList = {
    items: Product[],
    total: number
}

//Тип продукта в корзине
export type CartItem = {
    id: string,
    title: string,
    price: number
}

//Тип заказа
export type Order = {
    payment: string,
    email: string,
    address: string,
    phone: string,
    total: number,
    items: string[]
}

//Тип заказа ответ с сервера
export type OrderResp  = {
    id: string,
    total: number
}

//Тип ошибки с сервера  
export type Error = {
    error: string
}