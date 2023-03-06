import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePeopleFilmsRelation1677786864219 implements MigrationInterface {
    name = 'CreatePeopleFilmsRelation1677786864219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people_films_films" ("peopleId" integer NOT NULL, "filmsId" integer NOT NULL, CONSTRAINT "PK_a42b8c227444fd500c1b78979da" PRIMARY KEY ("peopleId", "filmsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be3d4bf0a2a829c091594359de" ON "people_films_films" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_80ce66926f5e215472c235a3a6" ON "people_films_films" ("filmsId") `);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "characters"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "films"`);
        await queryRunner.query(`ALTER TABLE "people_films_films" ADD CONSTRAINT "FK_be3d4bf0a2a829c091594359de7" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_films_films" ADD CONSTRAINT "FK_80ce66926f5e215472c235a3a61" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_films_films" DROP CONSTRAINT "FK_80ce66926f5e215472c235a3a61"`);
        await queryRunner.query(`ALTER TABLE "people_films_films" DROP CONSTRAINT "FK_be3d4bf0a2a829c091594359de7"`);
        await queryRunner.query(`ALTER TABLE "people" ADD "films" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "films" ADD "characters" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80ce66926f5e215472c235a3a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be3d4bf0a2a829c091594359de"`);
        await queryRunner.query(`DROP TABLE "people_films_films"`);
    }

}