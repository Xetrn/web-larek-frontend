import { Api } from "../base/api";

export class ProductApi extends Api {
  #API_URL: string
  #products: object
  #product: object

  constructor(API_URL: string) {
    super(API_URL);
    this.#API_URL = API_URL;
  }

  async getProducts() {
    await this.get('/product/')
      .then((result) => {
        this.#products = result;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    return this.#products;
  }

  async getProduct(id: string) {
    await this.get(`/product/${id}`)
      .then((result) => {
        this.#product = result;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    return this.#product;
  }
}