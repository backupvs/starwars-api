import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeUniqueColumns1678045486396 implements MigrationInterface {
    name = 'MakeUniqueColumns1678045486396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planets" ADD CONSTRAINT "UQ_70a170f032a2ca04a6ec6eb2d98" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "UQ_1adf701cac3b2c0f8bacb54774b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_aa397b791341ed3615397050d4b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "starships" ADD CONSTRAINT "UQ_41580e76da7903fb3827a3510eb" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "films" ADD CONSTRAINT "UQ_ef6e0245decf772d1dd66f158ae" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317"`);
        await queryRunner.query(`ALTER TABLE "films" DROP CONSTRAINT "UQ_ef6e0245decf772d1dd66f158ae"`);
        await queryRunner.query(`ALTER TABLE "starships" DROP CONSTRAINT "UQ_41580e76da7903fb3827a3510eb"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_aa397b791341ed3615397050d4b"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "UQ_1adf701cac3b2c0f8bacb54774b"`);
        await queryRunner.query(`ALTER TABLE "planets" DROP CONSTRAINT "UQ_70a170f032a2ca04a6ec6eb2d98"`);
    }

}
