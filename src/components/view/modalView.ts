import { BaseView } from './baseView';

interface IModalView {
  open: () => void;
  close: () => void;
}

export class ModalView extends BaseView<HTMLElement> implements IModalView {
  protected element: HTMLElement;
  protected modalCloseButton: HTMLButtonElement;
  protected modalContainer: HTMLElement;
  protected modalContent: HTMLElement;
  protected pageWrapper: HTMLElement;

  constructor() {
    super();
    this.element = document.querySelector('#modal-container');
    this.pageWrapper = document.querySelector('.page__wrapper');
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

  protected setListeners = () => {
    document.addEventListener('keydown', this.handleEscapeKeydown);
    this.element.addEventListener('click', this.close);
    this.modalCloseButton.addEventListener('click', this.close);
    this.modalContainer.addEventListener('click', (e) => e.stopPropagation());
  };

  protected removeListeners = () => {
    document.removeEventListener('keydown', this.handleEscapeKeydown);
    this.element.removeEventListener('click', this.close);
    this.modalCloseButton.removeEventListener('click', this.close);
    this.modalContainer.removeEventListener('click', (e) =>
      e.stopPropagation()
    );
  };

  protected handleEscapeKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  open = () => {
    this.element.classList.add('modal_active');
    this.pageWrapper.classList.add('page__wrapper_locked');
    this.setListeners();
  };

  close = () => {
    this.element.classList.remove('modal_active');
    this.pageWrapper.classList.remove('page__wrapper_locked');
    this.modalContent.innerHTML = '';
    this.removeListeners();
  };
}
