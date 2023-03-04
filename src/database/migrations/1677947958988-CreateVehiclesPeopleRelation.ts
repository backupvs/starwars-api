import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehiclesPeopleRelation1677947958988 implements MigrationInterface {
    name = 'CreateVehiclesPeopleRelation1677947958988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people_vehicles_vehicles" ("peopleId" integer NOT NULL, "vehiclesId" integer NOT NULL, CONSTRAINT "PK_abdfef92ec95f3e00ccc38ffbbd" PRIMARY KEY ("peopleId", "vehiclesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c4799c95577dd53de3c919206" ON "people_vehicles_vehicles" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_69511f955e4694544aa0056f25" ON "people_vehicles_vehicles" ("vehiclesId") `);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "pilots"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "vehicles"`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" ADD CONSTRAINT "FK_0c4799c95577dd53de3c9192060" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" ADD CONSTRAINT "FK_69511f955e4694544aa0056f256" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" DROP CONSTRAINT "FK_69511f955e4694544aa0056f256"`);
        await queryRunner.query(`ALTER TABLE "people_vehicles_vehicles" DROP CONSTRAINT "FK_0c4799c95577dd53de3c9192060"`);
        await queryRunner.query(`ALTER TABLE "people" ADD "vehicles" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "pilots" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69511f955e4694544aa0056f25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c4799c95577dd53de3c919206"`);
        await queryRunner.query(`DROP TABLE "people_vehicles_vehicles"`);
    }

}
