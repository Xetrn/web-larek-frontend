import { Category } from '../types';
import { categoryClasses } from './constants';

export const setCategoryClass = (element: HTMLElement, category: Category) => {
  Object.values(categoryClasses).forEach((className) => {
    element.classList.remove(className);
  });
  element.classList.add(
    categoryClasses[category] ?? categoryClasses[Category.OTHER]
  );
};

export const getProductPrice = (price: number | null): string =>
  price ? `${price} синапсов` : 'Бесценно';
