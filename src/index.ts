import './scss/styles.scss';
import {LarekAPI} from "./service/larek-api";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import { ensureElement, cloneTemplate } from './utils/utils';
import { CatalogModel } from './components/model/CatalogModel';
import { PageView } from './components/view/PageView';
import { ModalView } from './components/view/ModalView';
import { ProductView } from './components/view/ProductView';
import { ModalProductView } from './components/view/ModalProductView';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const modalContainerTemplate = ensureElement<HTMLTemplateElement>('#modal-container');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

// Модель данных приложения
const catalogModel = new CatalogModel(api, events);

// Глобальные контейнеры
const pageView = new PageView(document.body, events);
const modalView = new ModalView(modalContainerTemplate, events);

// Переиспользуемые части интерфейса


// Загружаем продукты при старте приложения
catalogModel.loadProducts();

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Рендер продуктов
events.on("products:changed", () => {
  const productViews = catalogModel.catalogList.items.map(item => {
    const productView = new ProductView(cloneTemplate(cardCatalogTemplate), events);
    return productView.render(item);
  });

  pageView.catalog = productViews;
});

// Обработка кликов по продукту
events.on("product:clicked", async ({ id }: { id: string }) => {
    const product = await catalogModel.getProductById(id);
    if (product) {
        const modalProductView = new ModalProductView(cloneTemplate(cardPreviewTemplate), events);
        modalView.render({content: modalProductView.render(product)});
    } else {
        console.error("Не удалось загрузить продукт с ID", id);
    }
});

// Блокируем прокрутки страницы
events.on('modal:open', () => {
    pageView.locked = true;
});

// Разблокировка прокрутки страницы
events.on('modal:close', () => {
    pageView.locked = false;
});
