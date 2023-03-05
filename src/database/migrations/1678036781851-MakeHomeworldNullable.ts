import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeHomeworldNullable1678036781851 implements MigrationInterface {
    name = 'MakeHomeworldNullable1678036781851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_3427f7c92316561d7131c296bc6"`);
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6"`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_3427f7c92316561d7131c296bc6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_3427f7c92316561d7131c296bc6"`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_3427f7c92316561d7131c296bc6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
