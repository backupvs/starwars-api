import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpeciesTable1677857208688 implements MigrationInterface {
    name = 'CreateSpeciesTable1677857208688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "species" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "classification" character varying NOT NULL, 
                "designation" character varying NOT NULL, 
                "averageHeight" character varying NOT NULL, 
                "averageLifespan" character varying NOT NULL, 
                "eyeColors" character varying NOT NULL, 
                "hairColors" character varying NOT NULL, 
                "skinColors" character varying NOT NULL, 
                "language" character varying NOT NULL, 
                "homeworld" text array NOT NULL, 
                "people" text array NOT NULL, 
                "films" text array NOT NULL, 
                CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "species"`);
    }

}
