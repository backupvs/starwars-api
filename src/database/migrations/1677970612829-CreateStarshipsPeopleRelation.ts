import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStarshipsPeopleRelation1677970612829 implements MigrationInterface {
    name = 'CreateStarshipsPeopleRelation1677970612829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people_starships_starships" ("peopleId" integer NOT NULL, "starshipsId" integer NOT NULL, CONSTRAINT "PK_fd849a9c3ab64a62004d47402bb" PRIMARY KEY ("peopleId", "starshipsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78e90ed25ace2390fa2c7a4d50" ON "people_starships_starships" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a5517fc734c462fc3a0d32eb9" ON "people_starships_starships" ("starshipsId") `);
        await queryRunner.query(`ALTER TABLE "starships" DROP COLUMN "pilots"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "starships"`);
        await queryRunner.query(`ALTER TABLE "people_starships_starships" ADD CONSTRAINT "FK_78e90ed25ace2390fa2c7a4d50c" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_starships_starships" ADD CONSTRAINT "FK_0a5517fc734c462fc3a0d32eb99" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_starships_starships" DROP CONSTRAINT "FK_0a5517fc734c462fc3a0d32eb99"`);
        await queryRunner.query(`ALTER TABLE "people_starships_starships" DROP CONSTRAINT "FK_78e90ed25ace2390fa2c7a4d50c"`);
        await queryRunner.query(`ALTER TABLE "people" ADD "starships" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "starships" ADD "pilots" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a5517fc734c462fc3a0d32eb9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78e90ed25ace2390fa2c7a4d50"`);
        await queryRunner.query(`DROP TABLE "people_starships_starships"`);
    }

}
