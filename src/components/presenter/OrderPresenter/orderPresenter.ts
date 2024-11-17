import { EventEmitter } from '../../base/events';
import { IPresenter } from '../IPresenter';
import {
  OrderSuccessView,
  AddressFormView,
  ContactFormView,
} from '../../view/order';
import {
  IOrderModel,
  IOrderPresenterDependencies,
} from './orderPresenter.types';
import { Events } from '../../../utils/constants';
import { IOrderResult, PaymentMethod } from '../../../types';

export class OrderPresenter implements IPresenter {
  private orderModel: IOrderModel;
  private events: EventEmitter;
  private orderSuccessView: OrderSuccessView;
  private addressFormView: AddressFormView;
  private contactFormView: ContactFormView;

  constructor({
    events,
    orderModel,
    orderSuccessView,
    contactFormView,
    addressFormView,
  }: IOrderPresenterDependencies) {
    this.events = events;
    this.orderModel = orderModel;
    this.orderSuccessView = orderSuccessView;
    this.contactFormView = contactFormView;
    this.addressFormView = addressFormView;
  }

  init() {
    this.events.on(Events.ORDER_CREATE, () => {
      this.events.emit(Events.MODAL_OPEN, this.renderAddressForm());
    });
    this.events.on(Events.ORDER_FINISHED, (result: IOrderResult) => {
      this.events.emit(Events.MODAL_OPEN, this.renderOrderSuccess(result));
    });

    this.addressFormView.setHandlers({
      onSubmit: this.handleAddressSubmit,
      onPaymentMethodChange: this.handlePaymentMethodChange,
      onAddressChange: this.handleAddressChange,
    });

    this.contactFormView.setHandlers({
      onSubmit: this.handleContactsSubmit,
      onEmailChange: this.handleEmailChange,
      onPhoneChange: this.handlePhoneChange,
    });

    this.orderSuccessView.setHandlers({
      onClose: this.handleClose,
    });
  }

  private renderAddressForm = () => {
    return this.addressFormView.render();
  };

  private renderContactForm = () => {
    return this.contactFormView.render();
  };

  private renderOrderSuccess = (result: IOrderResult) => {
    return this.orderSuccessView.render({ result });
  };

  private handleAddressSubmit = () => {
    this.addressFormView.submitDisabled();
    const error = this.orderModel.validateAddressForm();
    if (error) {
      this.addressFormView.submitEnable();
      this.addressFormView.renderError(error);
      return;
    }

    this.events.emit(Events.MODAL_OPEN, this.renderContactForm());
  };

  private handleContactsSubmit = () => {
    this.contactFormView.submitDisabled();

    const error = this.orderModel.validateContactsForm();
    if (error) {
      this.contactFormView.submitEnable();
      this.contactFormView.renderError(error);
      return;
    }

    this.orderModel.createOrder().then((result) => {
      this.events.emit(Events.ORDER_FINISHED, result);
    });
  };

  private handleClose = () => {
    this.events.emit(Events.MODAL_CLOSE);
  };

  private handlePaymentMethodChange = (value: PaymentMethod) => {
    this.orderModel.updateOrderInputs({ payment: value });
  };

  private handleAddressChange = (value: string) => {
    this.orderModel.updateOrderInputs({ address: value });
  };

  private handleEmailChange = (value: string) => {
    this.orderModel.updateOrderInputs({ email: value });
  };

  private handlePhoneChange = (value: string) => {
    this.orderModel.updateOrderInputs({ phone: value });
  };
}
