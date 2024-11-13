import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CartModel } from './components/models/сartModel';
import { CatalogModel } from './components/models/сatalogModel';
import { CatalogView } from './components/view/catalogView';
import { ModalView } from './components/view/modalView';
import { ProductView } from './components/view/productView';
import { ProductPreviewView } from './components/view/prouctPreviewView';
import { CartProductView } from './components/view/сartProductView';
import { CartView } from './components/view/сartView';
import './scss/styles.scss';
import { IProductModel } from './types';
import { API_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';

const api = new Api(API_URL);
const events = new EventEmitter();

const cartModel = new CartModel(events);
const catalogModel = new CatalogModel(events);
const catalogView = new CatalogView(document.querySelector('.gallery'));
const cartView = new CartView(events);
const cartButton = document.querySelector('.header__basket') as HTMLButtonElement

cartButton.onclick = () => {
    modalView.render(cartView.render(cartModel.products));
    modalView.toggle();
}

const modalElement = document.querySelector('.modal') as HTMLElement;

const modalView = new ModalView(modalElement);

function renderCatalog(products: IProductModel[]) {
	catalogView.render({
		products: products.map((product) =>
			new ProductView(events).render(product)
		),
	});
}

events.on('catalog-model:set-items', (products: IProductModel[]) => {
	renderCatalog(products);
});

api.get('/product/').then((data: { items: IProductModel[]; total: number }) => {
	catalogModel.setItems(data.items);
});

// function renderCart(items: string[]) {
//     cartView.render({ products:  items.map(id => 
//         {
//             const productView = new CartProductView(document.querySelector('.basket__list') ,events);
//             return productView.render(catalogModel.getProduct(id))
//         })}
//     );
// }

// events.on('ui:basket-add', (event: {id: string}) => {
//     cartModel.add(event.id);
// })


events.on('ui:basket-remove', (product: IProductModel) => {
    cartModel.remove(product.id);
    modalView.render(cartView.render(cartModel.products));
})


events.on('basket:change', () => {
    cartButton.querySelector('.header__basket-counter').textContent = `${cartModel.products.length}`;
})

events.on('product-view:click', (product: IProductModel) => {
    modalView.render(new ProductPreviewView(events).render(product));
    modalView.toggle();
})

events.on("product-preview:basket-add", (product: IProductModel) => {
    cartModel.add(product);
    console.log(cartModel.products);
})

