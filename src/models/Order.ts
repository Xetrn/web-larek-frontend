import { IBasketCatalog } from "../types/basket";
import { IOrderData, IOrderForm, IOrderItem, IUserForm, Payment, FormErrors, IOrderApiData, IOrderBasketData } from "../types/order";
import { EventEmitter } from "../components/base/events";

export class OrderModel  {
    protected total: number = 0;
    protected items: IOrderItem[] = [];


    protected orderData: IOrderForm = {
        payment: '',
        address: '',
    };

    protected userData: IUserForm = {
        email: '',
        phone: ''
    };

    protected orderFormErrors: FormErrors = {};

     constructor(protected emitter: EventEmitter) {
    }

    setProduct(data: IOrderBasketData): void {
        this.total = data.total;
        this.items = data.items.map(id => ({id}));
    }

    getOrderData(): IOrderForm {
        return this.orderData;
    }

    makeOrder(): void {
        this._emitChange('order:made');
    }

    clearOrder(): void {
        this.orderData = {
            payment: '',
            address: '',
        };

        this.userData = {
            email: '',
            phone: '',
        };
    }

    getUserData(): IUserForm {
        return this.userData;
    }


    getAllData(): IOrderApiData {
        return {
            ...this.orderData,
            ...this.userData,
            total: this.total,
            items: this.items.map(item => item.id)
        };
    }

    getTotal(): number {
        return this.total;
    }

    setOrderField(field: keyof (IOrderForm & IUserForm), value: string) {
        if (field in this.orderData) {
            this.orderData[field as keyof IOrderForm] = value;
        } else if (field in this.userData) {
            this.userData[field as keyof IUserForm] = value;
        }

        if (this.validateOrder(field)) {
            if(field in this.orderData) {
                console.log(`${field}:ready`, this.orderData);
                this.emitter.emit('order:ready', this.orderData);
            }
            else if(field in this.userData) {
                console.log(`${field}:ready`, this.userData);
                this.emitter.emit('user:ready', this.userData);
            }
        }
    }

    validateOrder(field: keyof (IOrderForm & IUserForm)) {
        const errors: typeof this.orderFormErrors = {};

        if(field in this.orderData) {
            if (!this.orderData.payment) {
                errors.payment = 'Не выбран способ оплаты';
            }
            else if (!this.orderData.address) {
                errors.address = 'Необходимо указать адрес';
            }
        }
        else if(field in this.userData) {
            if (!this.userData.email) {
                errors.email = 'Необходимо указать email';
            }
            else if (!this.userData.phone) {
                errors.phone = 'Необходимо указать телефон';
            }
        }
        
        this.orderFormErrors = errors;
        this.emitter.emit('formErrors:change', this.orderFormErrors);
        return Object.keys(errors).length === 0;
    }

    protected _emitChange(event: string): void {
        this.emitter.emit(event, this.getOrderData());
    }
}
