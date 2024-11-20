/**
 * Модель продукта
 */
export type Product = {
    /**
     * ID
     */
    id: string;

    /**
     * Описание продукта
     */
    title: string;

    /**
     * Ссылка на изображение продукта
     */
    description: string;

    /**
     * Название продукта
     */
    image: string;

    /**
     * Категория продукта
     */
    price: string | null;

    /**
     * Цена продукта
     */
    category: string;
}

