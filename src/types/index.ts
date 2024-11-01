export interface IProductModel {
    id: string;
    title: string;
    description: string;
    section: string;
    price: number;
    picture: string;
}
   
export interface ICartModel {
    products: Map<string, number>;
    totalPrice: number;
    add(id:string): void;
    remove(id:string): void;
}

export interface ICatalogModel {
    products: IProductModel[]
    setItems(items:IProductModel[]): void;
    getProduct(id:string): IProductModel;
}
   
export interface IEventEmitter {
    emit: (event: string, data?: unknown) => void;
}