
interface IBusketModel {
    busket: IBusket;

    getBusket: () => IProduct[];
    removeFromBusket: (id: string) => void;
    isInBusket: (id: string) => boolean;

}