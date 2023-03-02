import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFilmsTable1677778830638 implements MigrationInterface {
    name = 'CreateFilmsTable1677778830638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "films" (
                "id" SERIAL NOT NULL, 
                "title" character varying NOT NULL, 
                "episodeId" integer NOT NULL, 
                "openingCrawl" character varying NOT NULL, 
                "director" character varying NOT NULL, 
                "producer" character varying NOT NULL, 
                "releaseDate" date NOT NULL, 
                "characters" text array NOT NULL, 
                "planets" text array NOT NULL, 
                "starships" text array NOT NULL, 
                "vehicles" text array NOT NULL, 
                "species" text array NOT NULL, 
                CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id")
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "films"`);
    }

}
