import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpeciesFilmsRelation1677863268330 implements MigrationInterface {
    name = 'CreateSpeciesFilmsRelation1677863268330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "films_species_species" ("filmsId" integer NOT NULL, "speciesId" integer NOT NULL, CONSTRAINT "PK_b16e4a6a250dfe1872c561203d0" PRIMARY KEY ("filmsId", "speciesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be1d816ce6bdc4677080067eb4" ON "films_species_species" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6042e3f9819bb64e4264509f73" ON "films_species_species" ("speciesId") `);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "films"`);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "species"`);
        await queryRunner.query(`ALTER TABLE "films_species_species" ADD CONSTRAINT "FK_be1d816ce6bdc4677080067eb4b" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_species_species" ADD CONSTRAINT "FK_6042e3f9819bb64e4264509f73e" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_species_species" DROP CONSTRAINT "FK_6042e3f9819bb64e4264509f73e"`);
        await queryRunner.query(`ALTER TABLE "films_species_species" DROP CONSTRAINT "FK_be1d816ce6bdc4677080067eb4b"`);
        await queryRunner.query(`ALTER TABLE "films" ADD "species" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" ADD "films" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6042e3f9819bb64e4264509f73"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be1d816ce6bdc4677080067eb4"`);
        await queryRunner.query(`DROP TABLE "films_species_species"`);
    }

}
