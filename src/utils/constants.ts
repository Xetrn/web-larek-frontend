export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const activeButtonClassName = "button_alt-active";

export const correspondingCategories: Record<CategoryType, string> = {
    "другое": "other",
    "софт-скил": "soft",
    "хард-скил": "hard",
    "кнопка": "button",
    "дополнительное": "additional"
};
