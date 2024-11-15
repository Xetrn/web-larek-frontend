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
    price: number | null;

    /**
     * Категория
     */
    category: string;
}
