import { Test } from "@nestjs/testing";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";
import { Vehicle } from "../entities/vehicle.entity";
import { VehiclesController } from "../vehicles.controller";
import { VehiclesService } from "../vehicles.service";
import { createVehicleDtoStub } from "./stubs/create-vehicle.dto.stub";
import { vehicleStub } from "./stubs/vehicle.stub";

jest.mock('../vehicles.service');

describe('VehiclesController', () => {
    let vehiclesController: VehiclesController;
    let vehiclesService: VehiclesService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [VehiclesController],
            providers: [VehiclesService]
        }).compile();

        vehiclesController = moduleRef.get<VehiclesController>(VehiclesController);
        vehiclesService = moduleRef.get<VehiclesService>(VehiclesService);
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        describe('when findAll is called', () => {
            let vehicles: Vehicle[];
            let paginationQuery: PaginationQueryDto;

            beforeEach(async () => {
                paginationQuery = {};
                vehicles = await vehiclesController.findAll(paginationQuery);
            });

            test('then it should call vehiclesService', () => {
                expect(vehiclesService.findAll).toBeCalledWith(paginationQuery);
            });

            test('then it should return a vehicles', () => {
                expect(vehicles).toEqual([vehicleStub()]);
            })
        });
    });

    describe('findOne', () => {
        describe('when findOne is called', () => {
            let vehicle: Vehicle;

            beforeEach(async () => {
                vehicle = await vehiclesController.findOne(vehicleStub().id.toString());
            });

            test('then it should call vehiclesService', () => {
                expect(vehiclesService.findOne).toBeCalledWith(vehicleStub().id);
            });

            test('then it should return a vehicle', () => {
                expect(vehicle).toEqual(vehicleStub());
            });
        });
    });

    describe('create', () => {
        describe('when create is called', () => {
            let vehicle: Vehicle;
            let createVehicleDto: CreateVehicleDto;

            beforeEach(async () => {
                createVehicleDto = createVehicleDtoStub();
                vehicle = await vehiclesController.create(createVehicleDto);
            });

            test('then it should call vehiclesService', () => {
                expect(vehiclesService.create).toBeCalledWith(createVehicleDto);
            });

            test('then it should return a vehicle', () => {
                expect(vehicle).toEqual(vehicleStub());
            });
        });
    });

    describe('update', () => {
        describe('when update is called', () => {
            let vehicle: Vehicle;
            let updateVehicleDto: UpdateVehicleDto;

            beforeEach(async () => {
                updateVehicleDto = { name: 'n1' };
                vehicle = await vehiclesController.update(vehicleStub().id.toString(), updateVehicleDto);
            });

            test('then it should call vehiclesService', () => {
                expect(vehiclesService.update).toBeCalledWith(vehicleStub().id, updateVehicleDto);
            });

            test('then it should return a vehicle', () => {
                expect(vehicle).toEqual(vehicleStub());
            });
        });
    });
});