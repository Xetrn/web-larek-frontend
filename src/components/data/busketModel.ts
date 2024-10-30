
interface IBusketModel {
    busket: IBusket;

    getBusket: () => BusketProduct[];
    removeFromBusket: (id: string) => void;
    isInBusket: (id: string) => boolean;

}