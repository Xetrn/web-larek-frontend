/**
 * Форма заказа
 */
export type OrderForm = {
	/**
	 * Тип оплаты
	 */
	payment: string;

	/**
	 * Адрес доставки
	 */
	address: string;

	/**
	 * Номер телефона
	 */
	phone: string;

	/**
	 * Почта
	 */
	email: string;

	/**
	 * Общая сумма заказа
	 */
	total: number;
};
