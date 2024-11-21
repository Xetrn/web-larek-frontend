export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export enum Category {
  SOFT = 'софт-скил',
  OTHER = 'другое',
  ADDITIONAL = 'дополнительное',
  BUTTON = 'кнопка',
  HARD = 'хард-скил',
}

export const categoryClasses: Record<Category, string> = {
  [Category.SOFT]: 'card__category_soft',
  [Category.OTHER]: 'card__category_other',
  [Category.ADDITIONAL]: 'card__category_additional',
  [Category.BUTTON]: 'card__category_button',
  [Category.HARD]: 'card__category_hard',
};

export const settings = {

};
