import { ApiListResponse } from '../components/base/api';

// Типы данных для товаров
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
}

// Типы данных для корзины
export interface CartItem {
    productId: number;
    quantity: number;
}

// Типы данных для заказов
export interface Order {
    id: number;
    paymentMethod: PaymentMethod;
    deliveryAddress: string;
    customerEmail: string;
    customerPhone: string;
    items: CartItem[];
}

// Типы данных для способа оплаты
export type PaymentMethod = 'creditCard' | 'paypal' | 'bankTransfer';

// Типы данных для ответов API
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// Типы данных для состояния приложения
export interface AppState {
    products: Product[];
    cart: CartItem[];
    order: Partial<Order>;
    isLoading: boolean;
    error?: string;
}

// Типы данных для пользователя
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    addresses: string[];
}

// Интерфейсы для Model
export interface ProductModel {
    getAllProducts(): Promise<ApiListResponse<Product>>;
    getProductById(id: number): Promise<Product>;
}

export interface CartModel {
    addItem(productId: number): void;
    removeItem(productId: number): void;
    getCartItems(): CartItem[];
}

export interface OrderModel {
    setPaymentMethod(method: PaymentMethod): void;
    setDeliveryAddress(address: string): void;
    setCustomerData(email: string, phone: string): void;
    validateOrder(): boolean;
    submitOrder(): Promise<ApiResponse<Order>>;
}

export interface UserModel {
    getUser(): User | null;
    updateUser(user: Partial<User>): void;
    setDeliveryAddress(address: string): void;
    getDeliveryAddress(): string | null;
    clearUserData(): void;
}

// Интерфейсы для View
export interface ProductListView {
    render(products: Product[]): void;
    onProductClick(productId: number): void;
}

export interface ProductDetailView {
    render(product: Product): void;
    onBuyClick(): void;
}

export interface CartView {
    render(cartItems: CartItem[]): void;
    onRemoveItemClick(productId: number): void;
}

export interface OrderFormView {
    render(): void;
    onFormSubmit(data: Partial<Order>): void;
    showValidationError(message: string): void;
}

// Интерфейсы для Presenter
export interface ProductPresenter {
    loadProducts(): void;
    showProductDetails(productId: number): void;
}

export interface CartPresenter {
    addProductToCart(productId: number): void;
    removeProductFromCart(productId: number): void;
    updateCartView(): void;
}

export interface OrderPresenter {
    processPayment(method: PaymentMethod, address: string): void;
    validateAndSubmitOrder(email: string, phone: string): void;
    onOrderSuccess(orderId: number): void;
    onOrderFailure(message: string): void;
}
