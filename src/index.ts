import { EventEmitter, IEvents } from './components/base/events';
import OrderAPI, { IOrderAPI } from './components/data/api/orderAPI';
import ProductsAPI, { IProductsAPI } from './components/data/api/productAPI';
import CatalogModel, { ICatalogModel } from './components/data/catalogModel';
import ProductModel, { IProductModel } from './components/data/productModel';
import CatalogView from './components/views/catalogView';
import IView from './components/views/interfaces/IView';
import ModalView from './components/views/modalView';
import ProductView from './components/views/productView';
import './scss/styles.scss';
import { Events } from './types/eventsTypes';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';

const broker : IEvents = new EventEmitter();

const productAPI: IProductsAPI = new ProductsAPI(CDN_URL, API_URL);
const orderAPI: IOrderAPI = new OrderAPI(API_URL);

const catalogModel: ICatalogModel = new CatalogModel(productAPI, broker);
const productModel: IProductModel = new ProductModel();

const pageWrapper: HTMLElement = document.querySelector(".page__wrapper");
const catalogContainer: HTMLElement = document.querySelector(".gallery");
const modalContainer: HTMLElement = document.querySelector("#modal-container");

const successTemplate:  HTMLTemplateElement = document.querySelector("#success");
const cardCatalogTemplate: HTMLTemplateElement = document.querySelector("#card-catalog");
const fullCardTemplate: HTMLTemplateElement = document.querySelector("#card-preview");
const cardBusketTemplate: HTMLTemplateElement = document.querySelector("#card-basket");
const basketTemplate: HTMLTemplateElement = document.querySelector("#basket");
const orderTemplate: HTMLTemplateElement = document.querySelector("#order");
const contactsTemplate: HTMLTemplateElement = document.querySelector("#contacts");

const modalView: IView<HTMLElement> = new ModalView(pageWrapper, modalContainer, broker);
const catalogView: IView<ICatalog> = new CatalogView(catalogContainer, cardCatalogTemplate, broker);
const productView: IView<IProduct> = new ProductView(broker, fullCardTemplate);

broker.on(Events.CATALOG_FETCHED, (catalogData) => {
    const catalog: ICatalog = catalogData as ICatalog;
    catalogView.render(catalog);
});

broker.on(Events.PRODUCT_CARD_OPENED, (productData) => {
    const product: IProduct = productData as IProduct;
    productModel.setCurrentProduct(product);
    productView.render(product);
});

broker.on(Events.PRODUCT_CARD_CLICKED, (idData) => {
    const id : Id = idData as Id;
    catalogModel.callProductPreview(id.id);
})

broker.on(Events.MODAL_OPENED, (container) => {
    const renderData: HTMLElement = container as HTMLElement;
    modalView.render(renderData);
})

broker.on(Events.MODAL_CLOSED, () => {
    modalView.render();
})