
export interface IFormModel {
    Form: IFormState;
    validate: () => void;
}

export default class FormModel implements IFormModel {
    private form: IFormState;

    get Form(): IFormState {
        return this.form;
    }

    set Form(form: IFormState) {
        this.form = form;
    }

    private validatePaymentForm(): void {
        const paymentForm = this.form as IPaymentForm;
        if (paymentForm.payment === null) {
            this.form.errors.push("Не указан тип оплаты");
        }
        if (paymentForm.address === "") {
            this.form.errors.push("Не указан адрес");
        }
    }

    private validateContactsForm(): void {
        const contactsForm = this.form as IContactsForm;
        if (contactsForm.email === "") {
            this.form.errors.push("Не указана почта");
        }
        if (contactsForm.phone === "") {
            this.form.errors.push("Не указан телефон");
        }
    }

    validate() {
        this.form.errors = [];
        if ('payment' in this.form) {
            this.validatePaymentForm();
        }
        else {
            this.validateContactsForm();
        }
        this.form.isValid = this.form.errors.length === 0;
    }
}
