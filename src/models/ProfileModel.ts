import {EventEmitter} from "../components/base/events";

export class ProfileModel {
    _events: EventEmitter | null = null

    phone = "";
    email = "";

    constructor(events: EventEmitter) {
        this._events = events
    }
}