import { Api } from './base/api';
import { Order, OrderResult, Product, ApiResponseList } from '../types';

export class AppApi extends Api {
    private readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    private attachCdnToImage(item: Product): Product {
        return {
            ...item,
            image: this.cdn + item.image,
        };
    }

    async fetchProductById(id: string): Promise<Product> {
        const product = await this.get(`/product/${id}`);
        if (!product || typeof product !== 'object' || !('image' in product)) {
            throw new Error('Invalid product data received');
        }
        return this.attachCdnToImage(product as Product);
    }

    async fetchProductList(): Promise<Product[]> {
        const response = await this.get(`/product`);
        if (!response || typeof response !== 'object' || !('items' in response)) {
            throw new Error('Invalid product list data received');
        }
        const data = response as ApiResponseList<Product>;
        return data.items.map(this.attachCdnToImage.bind(this));
    }

    async submitOrder(order: Order): Promise<OrderResult> {
        const result = await this.post(`/order`, order);
        if (!result || typeof result !== 'object' || !('id' in result)) {
            throw new Error('Invalid order result data received');
        }
        return result as OrderResult;
    }
}