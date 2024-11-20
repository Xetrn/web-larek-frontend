import { IOrderForm, IOrderItem, IUserForm, FormErrors, IOrderApiData, IOrderBasketData } from "../types/order";
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
        const isOrderField = field in this.orderData;
        const isUserField = field in this.userData;

        if (isOrderField) {
            this.orderData[field as keyof IOrderForm] = value;
        } else if (isUserField) {
            this.userData[field as keyof IUserForm] = value;
        }

        if (this.validateOrder(field)) {
            const dataToEmit = isOrderField ? this.orderData : this.userData;
            const eventType = isOrderField ? 'order:ready' : 'user:ready';
            this.emitter.emit(eventType, dataToEmit);
        }
    }

    validateOrder(field: keyof (IOrderForm & IUserForm)) {
        const errors: Partial<IOrderForm & IUserForm> = {};

        const isOrderField = field in this.orderData;
        const isUserField = field in this.userData;

        if (isOrderField) {
            this.validateOrderFields(errors, this.orderData);
        } else if (isUserField) {
            this.validateUserFields(errors, this.userData);
        }

        this.orderFormErrors = errors;
        this.emitter.emit('formErrors:change', this.orderFormErrors);
        return Object.keys(errors).length === 0;
    }

    private validateOrderFields(errors: Partial<IOrderForm>, data: IOrderForm,) {
        if (!data.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }
        if (!data.address || data.address.trim() === '') {
            errors.address = 'Необходимо указать адрес';
        }
    }

    private validateUserFields(errors: Partial<IUserForm>, data: IUserForm) {
        if (!data.email || data.email.trim() === '') {
            errors.email = 'Необходимо указать email';
        }
        if (!data.phone || data.phone.trim() === '') {
            errors.phone = 'Необходимо указать телефон';
        }
    }

    protected _emitChange(event: string): void {
        this.emitter.emit(event, this.getOrderData());
    }
}
