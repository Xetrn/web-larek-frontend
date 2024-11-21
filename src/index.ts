import './scss/styles.scss';
import {LarekAPI} from "./service/larek-api";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import { ensureElement, cloneTemplate } from './utils/utils';
import { PageView } from './components/view/PageView';
import { ProductView } from './components/view/ProductView';
import { CatalogModel } from './components/model/CatalogModel';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

// Модель данных приложения
const catalogModel = new CatalogModel(api, events);

// Глобальные контейнеры
const pageView = new PageView(document.body, events);

// Переиспользуемые части интерфейса


// Загружаем продукты при старте приложения
catalogModel.loadProducts();

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно
events.on("products:changed", () => {
  const productViews = catalogModel.catalogList.items.map(item => {
    const productView = new ProductView(cloneTemplate(cardCatalogTemplate), events);
    return productView.render(item);
  });

  pageView.catalog = productViews;
});
