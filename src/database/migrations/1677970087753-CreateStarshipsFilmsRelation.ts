import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStarshipsFilmsRelation1677970087753 implements MigrationInterface {
    name = 'CreateStarshipsFilmsRelation1677970087753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "films_starships_starships" ("filmsId" integer NOT NULL, "starshipsId" integer NOT NULL, CONSTRAINT "PK_f7c410e6e8b54adc51f99e0f386" PRIMARY KEY ("filmsId", "starshipsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3965a3d69c030eca6799a06d9d" ON "films_starships_starships" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e79353f238988153784b207757" ON "films_starships_starships" ("starshipsId") `);
        await queryRunner.query(`ALTER TABLE "starships" DROP COLUMN "films"`);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "starships"`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" ADD CONSTRAINT "FK_3965a3d69c030eca6799a06d9d7" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" ADD CONSTRAINT "FK_e79353f238988153784b207757c" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_starships_starships" DROP CONSTRAINT "FK_e79353f238988153784b207757c"`);
        await queryRunner.query(`ALTER TABLE "films_starships_starships" DROP CONSTRAINT "FK_3965a3d69c030eca6799a06d9d7"`);
        await queryRunner.query(`ALTER TABLE "films" ADD "starships" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "starships" ADD "films" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e79353f238988153784b207757"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3965a3d69c030eca6799a06d9d"`);
        await queryRunner.query(`DROP TABLE "films_starships_starships"`);
    }

}
