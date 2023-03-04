import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpeciesPlanetRelation1677859091241 implements MigrationInterface {
    name = 'CreateSpeciesPlanetRelation1677859091241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "species" RENAME COLUMN "homeworld" TO "homeworldId"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "homeworldId"`);
        await queryRunner.query(`ALTER TABLE "species" ADD "homeworldId" integer`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_3427f7c92316561d7131c296bc6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_3427f7c92316561d7131c296bc6"`);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "homeworldId"`);
        await queryRunner.query(`ALTER TABLE "species" ADD "homeworldId" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" RENAME COLUMN "homeworldId" TO "homeworld"`);
    }
}
