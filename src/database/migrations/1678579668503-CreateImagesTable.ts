import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImagesTable1678579668503 implements MigrationInterface {
    name = 'CreateImagesTable1678579668503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "imageUrl" character varying NOT NULL, "filmId" integer, "personId" integer, "planetId" integer, "speciesId" integer, "starshipId" integer, "vehicleId" integer, CONSTRAINT "UQ_b81c3bf4a0c17cf677d1d9e2abe" UNIQUE ("key"), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_93aa31698eba7a22fd1cd0c97e3" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_662089e42a27a165afcb4e0812d" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_827828ca25918647b0dc1c15a93" FOREIGN KEY ("planetId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_c02a4e67aceb74f955901a6464a" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_cb4c7f81fd22b3ee81abb46d995" FOREIGN KEY ("starshipId") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_f8239c66e6363f66f00eb581265" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_f8239c66e6363f66f00eb581265"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_cb4c7f81fd22b3ee81abb46d995"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_c02a4e67aceb74f955901a6464a"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_827828ca25918647b0dc1c15a93"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_662089e42a27a165afcb4e0812d"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_93aa31698eba7a22fd1cd0c97e3"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
