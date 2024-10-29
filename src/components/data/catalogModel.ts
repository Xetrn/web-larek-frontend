
interface ICatalogModel {
    catalog: ICatalog;
    setProducts: (products: IProduct[]) => void;
    getProductPreview: (id: string) => void;
}