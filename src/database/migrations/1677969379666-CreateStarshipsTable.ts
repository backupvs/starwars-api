import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStarshipsTable1677969379666 implements MigrationInterface {
    name = 'CreateStarshipsTable1677969379666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "starships" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "model" character varying NOT NULL, 
                "starshipClass" character varying NOT NULL, 
                "manufacturer" character varying NOT NULL, 
                "costInCredits" character varying NOT NULL, 
                "length" character varying NOT NULL, 
                "crew" character varying NOT NULL, 
                "passengers" character varying NOT NULL, 
                "maxAtmospheringSpeed" character varying NOT NULL, 
                "hyperdriveRating" character varying NOT NULL, 
                "mglt" character varying NOT NULL, 
                "cargoCapacity" character varying NOT NULL, 
                "consumables" character varying NOT NULL, 
                "films" text array NOT NULL, 
                "pilots" text array NOT NULL, 
                CONSTRAINT "PK_10c86d0ac9be05d3f986287a092" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "starships"`);
    }

}
