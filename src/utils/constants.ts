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
