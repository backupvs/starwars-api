import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanetsTable1677800054143 implements MigrationInterface {
    name = 'CreatePlanetsTable1677800054143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "planets" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "rotationPeriod" character varying NOT NULL, 
                "orbitalPeriod" character varying NOT NULL, 
                "gravity" character varying NOT NULL, 
                "population" character varying NOT NULL, 
                "climate" character varying NOT NULL, 
                "terrain" character varying NOT NULL, 
                "surfaceWater" character varying NOT NULL, 
                "residents" text array NOT NULL, 
                "films" text array NOT NULL, 
                CONSTRAINT "PK_d5fbc2513a6d4909fe31938b0fd" PRIMARY KEY ("id")
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "planets"`);
    }

}
