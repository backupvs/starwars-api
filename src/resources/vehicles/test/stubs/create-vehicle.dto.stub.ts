import { CreateVehicleDto } from "../../dto/create-vehicle.dto";

export const createVehicleDtoStub = (): CreateVehicleDto => {
    return {
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
        pilots: []
    }
};