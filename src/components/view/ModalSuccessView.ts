import { View } from "../base/View";
import { IOrder } from "../../types/order";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

type SuccessProps = Pick<IOrder, 'total' >;

export class ModalSuccessView extends View<SuccessProps> {
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._total = ensureElement<HTMLElement>(`.order-success__description`, container);
    this._button = ensureElement<HTMLButtonElement>(`.order-success__close`, container);

    this._button.addEventListener('click', () => {
			this.events.emit('success:close');
		});

  }

  set total(value: string) {
    this.setText(this._total, 'Списано ' + value + ' синапсов')
  }

}
