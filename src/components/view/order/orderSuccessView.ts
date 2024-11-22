import { IOrderResult } from '../../../types';
import { cloneTemplate } from '../../../utils/utils';
import { BaseView } from '../baseView';

type OrderSuccessRenderProps = {
  result: IOrderResult;
};

type OrderSuccessHandlers = {
  onClose: () => void;
};

export class OrderSuccessView extends BaseView<OrderSuccessRenderProps> {
  private closeHandler: () => void;

  private orderDescription: HTMLParagraphElement;
  private closeButton: HTMLButtonElement;

  constructor() {
    super();
    this.element = cloneTemplate('#success');
    this.orderDescription = this.element.querySelector(
      '.order-success__description'
    );
    this.closeButton = this.element.querySelector('.order-success__close');
  }

  setHandlers({ onClose }: OrderSuccessHandlers) {
    this.closeHandler = onClose;
  }

  render({ result }: OrderSuccessRenderProps): HTMLElement {
    this.orderDescription.textContent = `Списано ${result.total} синапсов`;
    this.closeButton.addEventListener('click', this.closeHandler);
    return this.element;
  }
}
