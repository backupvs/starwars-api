import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanetPeopleRelation1677800608083 implements MigrationInterface {
    name = 'CreatePlanetPeopleRelation1677800608083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" RENAME COLUMN "homeworld" TO "homeworldId"`);
        await queryRunner.query(`ALTER TABLE "planets" DROP COLUMN "residents"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "homeworldId"`);
        await queryRunner.query(`ALTER TABLE "people" ADD "homeworldId" integer`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "homeworldId"`);
        await queryRunner.query(`ALTER TABLE "people" ADD "homeworldId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planets" ADD "residents" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "people" RENAME COLUMN "homeworldId" TO "homeworld"`);
    }

}
