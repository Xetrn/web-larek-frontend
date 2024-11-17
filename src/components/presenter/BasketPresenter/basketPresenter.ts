import {
  IBasketModel,
  IBasketPresenterDependencies,
} from './basketPresenter.types';
import { EventEmitter } from '../../base/events';
import { BasketView } from '../../view/basket';
import { Events } from '../../../utils/constants';
import { IPresenter } from '../IPresenter';

export class BasketPresenter implements IPresenter {
  private basketButton: HTMLButtonElement;
  private basketCounter: HTMLButtonElement;

  private basketView: BasketView;
  private basketModel: IBasketModel;
  private events: EventEmitter;

  constructor({
    basketView,
    basketModel,
    events,
  }: IBasketPresenterDependencies) {
    this.basketButton = document.querySelector('.header__basket');
    this.basketCounter = this.basketButton.querySelector(
      '.header__basket-counter'
    );
    this.basketView = basketView;
    this.basketModel = basketModel;
    this.events = events;
  }

  init() {
    this.updateBasketCounter();
    this.events.on(Events.BASKET_UPDATE, () => {
      this.updateBasketCounter();
      this.updateBasket();
    });
    this.basketView.setHandlers({
      onDeleteClick: this.handleDeleteClick,
      onSubmitClick: this.handleBasketSubmit,
    });
    this.basketButton.addEventListener('click', this.handleBasketClick);
  }

  private updateBasket = () => {
    const products = this.basketModel.getAll();
    const totalPrice = this.basketModel.totalPrice;
    return this.basketView.render({
      products,
      totalPrice,
    });
  };

  private updateBasketCounter = () => {
    const count = this.basketModel.count;
    this.basketCounter.textContent = count.toString();
  };

  private handleBasketSubmit = () => {
    console.log(this.basketModel.count);
    this.events.emit(Events.MODAL_CLOSE);
  };

  private handleBasketClick = () => {
    this.events.emit(Events.MODAL_OPEN, this.updateBasket());
  };

  private handleDeleteClick = (id: string) => {
    this.basketModel.remove(id);
  };
}
