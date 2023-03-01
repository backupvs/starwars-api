import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePeopleTable1677713024356 implements MigrationInterface {
    name = 'CreatePeopleTable1677713024356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "people" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "height" integer NOT NULL, 
                "mass" integer NOT NULL, 
                "hairColor" character varying NOT NULL, 
                "skinColor" character varying NOT NULL, 
                "eyeColor" character varying NOT NULL, 
                "birthYear" character varying NOT NULL, 
                "gender" character varying NOT NULL, 
                "homeworld" character varying NOT NULL, 
                "films" text array NOT NULL, 
                "species" text array NOT NULL, 
                "vehicles" text array NOT NULL, 
                "starships" text array NOT NULL,
                CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id")
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "people"`);
    }

}
