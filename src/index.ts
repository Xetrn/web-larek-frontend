import { EventEmitter, IEvents } from './components/base/events';
import OrderAPI, { IOrderAPI } from './components/data/api/orderAPI';
import ProductsAPI, { IProductsAPI } from './components/data/api/productAPI';
import BusketModel, { IBusketModel } from './components/data/busketModel';
import CatalogModel, { ICatalogModel } from './components/data/catalogModel';
import ProductModel, { IProductModel } from './components/data/productModel';
import BusketPreview from './components/views/busketPreview';
import BusketView from './components/views/busketView';
import CatalogView from './components/views/catalogView';
import { IProductView } from './components/views/interfaces/IProductView';
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
const busketModel: IBusketModel = new BusketModel(broker);

const pageWrapper: HTMLElement = document.querySelector(".page__wrapper");
const catalogContainer: HTMLElement = document.querySelector(".gallery");
const modalContainer: HTMLElement = document.querySelector("#modal-container");
const busketPreviewContainer: HTMLButtonElement = document.querySelector(".header__basket");

const successTemplate:  HTMLTemplateElement = document.querySelector("#success");
const cardCatalogTemplate: HTMLTemplateElement = document.querySelector("#card-catalog");
const fullCardTemplate: HTMLTemplateElement = document.querySelector("#card-preview");
const cardBusketTemplate: HTMLTemplateElement = document.querySelector("#card-basket");
const basketTemplate: HTMLTemplateElement = document.querySelector("#basket");
const orderTemplate: HTMLTemplateElement = document.querySelector("#order");
const contactsTemplate: HTMLTemplateElement = document.querySelector("#contacts");

const modalView: IView<HTMLElement> = new ModalView(pageWrapper, modalContainer, broker);
const catalogView: IView<ICatalog> = new CatalogView(catalogContainer, cardCatalogTemplate, broker);
const productView: IProductView = new ProductView(broker, fullCardTemplate);
const busketPreview: IView<number> = new BusketPreview(busketPreviewContainer, broker);
const busketView: IView<IBusket> = new BusketView(basketTemplate, cardBusketTemplate, broker);

broker.on(Events.CATALOG_FETCHED, (catalogData) => {
    const catalog: ICatalog = catalogData as ICatalog;
    catalogView.render(catalog);
});

broker.on(Events.PRODUCT_CARD_OPENED, (productData) => {
    const product: IProduct = productData as IProduct;
    const isProductInBusket = busketModel.isInBusket(product.id);
    productModel.setCurrentProduct(product);
    productView.render(product, isProductInBusket);
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

broker.on(Events.ADDED_PRODUCT_TO_BUSKET, () => {
    const currentProduct = productModel.getCurrentProduct();
    busketModel.addToBusket(currentProduct);
    const busketLength = busketModel.getBusketCount();
    productView.render(currentProduct, true);
    busketPreview.render(busketLength);
})

broker.on(Events.REMOVED_PRODUCT_FROM_BUSKET, (idData) => {
    const id = (idData as Id).id;
    busketModel.removeFromBusket(id);
    const busket = busketModel.getBusket();
    busketPreview.render(busket.products.length);
    busketView.render(busket);
})

broker.on(Events.BUSKET_OPENED, () => {
    const busket = busketModel.getBusket();
    busketView.render(busket);
})