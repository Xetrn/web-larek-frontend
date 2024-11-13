export interface IProductModel {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
}
   
export interface ICartModel {
    products: IProductModel[];
    add(product: IProductModel): void;
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

export interface IUser {
    id: string;
    email: string;
    phone: string;
    address: string;
}

export interface IOrder {
    id: string;
    payment: string;
    mail: string;
    phone: string;
    address: string;
    total: number | null;
    products: IProductModel;
}