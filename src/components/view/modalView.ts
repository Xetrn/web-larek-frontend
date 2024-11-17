import {
  disableScrollOnElement,
  enableScrollOnElement,
} from '../../utils/utils';
import { BaseView } from './baseView';

interface IModalView {
  open: () => void;
  close: () => void;
}

export class ModalView extends BaseView<HTMLElement> implements IModalView {
  protected page: HTMLBodyElement;
  protected element: HTMLElement;
  protected modalCloseButton: HTMLButtonElement;
  protected modalContainer: HTMLElement;
  protected modalContent: HTMLElement;

  constructor() {
    super();
    this.page = document.querySelector('.page');
    this.element = document.querySelector('#modal-container');
    this.modalCloseButton = this.element.querySelector('.modal__close');
    this.modalContainer = this.element.querySelector('.modal__container');
    this.modalContent = this.element.querySelector('.modal__content');
  }

  render(data: HTMLElement) {
    if (data) {
      this.modalContent.replaceChildren(data);
      this.open();
    }
    return this.element;
  }

  protected setModalListeners = () => {
    document.addEventListener('keydown', this.handleEscapeKeydown);
    this.element.addEventListener('click', this.close);
    this.modalCloseButton.addEventListener('click', this.close);
    this.modalContainer.addEventListener('click', this.handleContainerClick);
  };

  protected removeModalListeners = () => {
    document.removeEventListener('keydown', this.handleEscapeKeydown);
    this.element.removeEventListener('click', this.close);
    this.modalCloseButton.removeEventListener('click', this.close);
    this.modalContainer.removeEventListener('click', this.handleContainerClick);
  };

  protected handleEscapeKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  protected handleContainerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  open = () => {
    this.element.classList.add('modal_active');
    disableScrollOnElement(this.page);
    this.setModalListeners();
  };

  close = () => {
    this.element.classList.remove('modal_active');
    enableScrollOnElement(this.page);
    this.modalContent.innerHTML = '';
    this.removeModalListeners();
  };
}
