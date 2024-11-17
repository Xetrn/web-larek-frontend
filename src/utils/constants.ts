import { Category } from '../types';
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {};

export const categoryClasses: Record<Category, string> = {
  [Category.SOFT]: 'card__category_soft',
  [Category.HARD]: 'card__category_hard',
  [Category.BUTTON]: 'card__category_button',
  [Category.OTHER]: 'card__category_other',
  [Category.ADDITIONAL]: 'card__category_additional',
};

export const phoneRegex = /^\+?[78]\d{10}$/;
export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const orderErrors = {
  phone: {
    empty: 'Введите номер телефона',
    invalid: 'Введите корректный номер телефона',
  },
  email: {
    empty: 'Введите адрес электронной почты',
    invalid: 'Введите корректный адрес электронной почты',
  },
  address: 'Введите адрес доставки',
  payment: 'Выберите способ оплаты',
};

export enum Events {
  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close',
  BASKET_UPDATE = 'basket:update',
  ORDER_CREATE = 'order:create',
  ORDER_FINISHED = 'order:finished',
}
