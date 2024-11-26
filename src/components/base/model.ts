import { IEvents } from './events';
export abstract class Model<T> {
	constructor(data: Partial<T>, protected eventEmitter: IEvents) {
		Object.assign(this, data);
	}

	emitChanges(event: string, payload?: object) {
		this.eventEmitter.emit(event, payload ?? {});
	}
}
