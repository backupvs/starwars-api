import { Vehicle } from "../../entities/vehicle.entity";

export const vehicleStub = (): Vehicle => {
    return {
        id: 1,
        name: 'n',
        model: 'm',
        vehicleClass: 'vc',
        manufacturer: 'm',
        length: 'l',
        costInCredits: 'cic',
        crew: 'c',
        passengers: 'p',
        maxAtmospheringSpeed: 'mas',
        cargoCapacity: 'cc',
        consumables: 'c',
        films: [],
        pilots: [],
        images: []
    }
};