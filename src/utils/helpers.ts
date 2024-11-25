export function getCardCategoryClass(category: string): string {
	switch (category) {
		case 'софт-скил':
			return 'card__category_soft';
		case 'хард-скил':
			return 'card__category_hard';
		case 'дополнительное':
			return 'card__category_additional';
		case 'кнопка':
			return 'card__category_button';
		default:
			return 'card__category_other';
	}
}
