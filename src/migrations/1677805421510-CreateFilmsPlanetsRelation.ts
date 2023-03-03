import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFilmsPlanetsRelation1677805421510 implements MigrationInterface {
    name = 'CreateFilmsPlanetsRelation1677805421510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "films_planets_planets" ("filmsId" integer NOT NULL, "planetsId" integer NOT NULL, CONSTRAINT "PK_a5a8f53f9e8b8e7a870dc8a6160" PRIMARY KEY ("filmsId", "planetsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59f34f486757575a016c375061" ON "films_planets_planets" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_956e9e10fd96ed618538bb2b96" ON "films_planets_planets" ("planetsId") `);
        await queryRunner.query(`ALTER TABLE "planets" DROP COLUMN "films"`);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "planets"`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" ADD CONSTRAINT "FK_59f34f486757575a016c3750616" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" ADD CONSTRAINT "FK_956e9e10fd96ed618538bb2b96c" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_planets_planets" DROP CONSTRAINT "FK_956e9e10fd96ed618538bb2b96c"`);
        await queryRunner.query(`ALTER TABLE "films_planets_planets" DROP CONSTRAINT "FK_59f34f486757575a016c3750616"`);
        await queryRunner.query(`ALTER TABLE "films" ADD "planets" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planets" ADD "films" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_956e9e10fd96ed618538bb2b96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59f34f486757575a016c375061"`);
        await queryRunner.query(`DROP TABLE "films_planets_planets"`);
    }

}
