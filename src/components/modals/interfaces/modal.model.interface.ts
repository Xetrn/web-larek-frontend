import type { IModalProps } from '../modal.view';

export interface IModalModel {
	show(data?: IModalProps): void;
	hide(): void;
}
