import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehiclesTable1677947217001 implements MigrationInterface {
    name = 'CreateVehiclesTable1677947217001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "vehicles" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "model" character varying NOT NULL, 
                "vehicleClass" character varying NOT NULL, 
                "manufacturer" character varying NOT NULL, 
                "length" character varying NOT NULL, 
                "costInCredits" character varying NOT NULL, 
                "crew" character varying NOT NULL, 
                "passengers" character varying NOT NULL, 
                "maxAtmospheringSpeed" character varying NOT NULL, 
                "cargoCapacity" character varying NOT NULL, 
                "consumables" character varying NOT NULL, 
                "films" text array NOT NULL, 
                "pilots" text array NOT NULL, 
                CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
