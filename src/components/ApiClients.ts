import { Api } from "./base/api";

export class ApiClient extends Api{
    constructor(baseUrl: string, options?: RequestInit) {
        super(baseUrl,options);
    }

    async getProducts() {
        return (await this.get('/product'));
    }
}
