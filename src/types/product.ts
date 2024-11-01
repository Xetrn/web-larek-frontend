/**
 * Товар
 */
export type Product = {
    /**
     * ID
     */
    id: string;

    /**
     * Название
     */
    title: string;

    /**
     * Описание
     */
    description: string;

    /**
     * Ссылка на изображение
     */
    image: string;

    /**
     * Цена продукта
     */
    price: string | null;

    /**
     * Категория
     */
    category: string;
}
