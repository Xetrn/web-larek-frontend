import { EventEmitter } from "../components/base/events";
import { IOrder } from "../types/order";

export class OrderModel{
  #events: EventEmitter | null = null;

  #address = "";
  #phone = "";
  #email = "";
  #payment = "";
  #price = 0;
  #items: string[];

  constructor(events: EventEmitter) {
    this.#events = events
  }

  setAddress(data: string) {
    this.#address = data;
  }

  setEmail(data: string) {
    this.#email = data;
  }

  setPhone(data: string) {
    this.#phone = data;
  }

  setPayment(data: string) {
    this.#payment = data;
  }

  setPrice(data: number) {
    this.#price = data;
  }

  setItems(items: string[]) {
    this.#items = items;
  }

  getOrder(): IOrder {
    return {
      "payment": this.#payment,
      "email": this.#email,
      "phone": this.#phone,
      "address": this.#address,
      "total": this.#price,
      "items": this.#items,
    }
  }
}