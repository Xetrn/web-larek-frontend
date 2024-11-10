type CategoryType = 'софт-скил' | 'хард-скил' | 'кнопка' | 'другое' | 'дополнительное';
type PaymentType = 'online' | 'cash';
type ProductButtonState = 'Купить' | 'Удалить из корзины';
type CatalogProduct = Omit<IProduct, "description">;
type BusketProduct = Pick<IProduct, "id" | "title" | "price">;
type FormError = 'Не указан тип оплаты' | 'Не указан адрес' | 'Не указан телефон' | 'Не указана почта';


interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: CategoryType;
    price: number | null;
}

interface IBusket {
    products: BusketProduct[];
    totalPrice: number;
}

interface ICatalog {
    products: CatalogProduct[];
}

interface IOrder{
    payment: PaymentType;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
}

interface IOrderResultSuccess {
    id: string;
    total: number;
}

interface IOrderResultError {
    error: string;
}

interface IFormState {
    isValid: boolean;
    errors: FormError[];
} 

interface IPaymentForm extends IFormState {
    payment: PaymentType;
    address: string;
}

interface IContactsForm extends IFormState {
    phone: string;
    email: string;
}

type Id = {
    id: string
}