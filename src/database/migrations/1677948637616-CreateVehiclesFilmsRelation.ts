import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehiclesFilmsRelation1677948637616 implements MigrationInterface {
    name = 'CreateVehiclesFilmsRelation1677948637616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "films_vehicles_vehicles" ("filmsId" integer NOT NULL, "vehiclesId" integer NOT NULL, CONSTRAINT "PK_6f20a5b4f1cba0d845777af2366" PRIMARY KEY ("filmsId", "vehiclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_39050cd9acc79678ab127c2353" ON "films_vehicles_vehicles" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6180b2d50059110150ad943ae5" ON "films_vehicles_vehicles" ("vehiclesId") `);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "films"`);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "vehicles"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" ADD CONSTRAINT "FK_39050cd9acc79678ab127c23535" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" ADD CONSTRAINT "FK_6180b2d50059110150ad943ae56" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" DROP CONSTRAINT "FK_6180b2d50059110150ad943ae56"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles_vehicles" DROP CONSTRAINT "FK_39050cd9acc79678ab127c23535"`);
        await queryRunner.query(`ALTER TABLE "films" ADD "vehicles" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "films" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6180b2d50059110150ad943ae5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39050cd9acc79678ab127c2353"`);
        await queryRunner.query(`DROP TABLE "films_vehicles_vehicles"`);
    }

}
