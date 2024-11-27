import { IEvents } from '../../components/base/events';

export abstract class AbstractModel<T> {
	constructor(data: Partial<T>, protected eventEmitter: IEvents) {
		Object.assign(this, data);
	}

	emitChanges(event: string, payload?: object) {
		this.eventEmitter.emit(event, payload ?? {});
	}
}
