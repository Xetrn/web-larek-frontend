
interface IBusketModel {
    getBusket: () => BusketProduct[];
    removeFromBusket: (id: string) => void;
    isInBusket: (id: string) => boolean;

}