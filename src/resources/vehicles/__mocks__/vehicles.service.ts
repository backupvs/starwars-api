import { vehicleStub } from "../test/stubs/vehicle.stub";

export const VehiclesService = jest.fn().mockReturnValue({
    findAll: jest.fn().mockResolvedValue([vehicleStub()]),
    findOne: jest.fn().mockResolvedValue(vehicleStub()),
    create: jest.fn().mockResolvedValue(vehicleStub()),
    update: jest.fn().mockResolvedValue(vehicleStub()),
    remove: jest.fn().mockResolvedValue(vehicleStub()),
    addImage: jest.fn().mockResolvedValue(vehicleStub())
});