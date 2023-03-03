import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpeciesPeopleRealtion1677860953122 implements MigrationInterface {
    name = 'CreateSpeciesPeopleRealtion1677860953122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "species_people_people" ("speciesId" integer NOT NULL, "peopleId" integer NOT NULL, CONSTRAINT "PK_4e29c7c9d8235a1b0737874ce6a" PRIMARY KEY ("speciesId", "peopleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62c0a74121aa06cdea24bc1e58" ON "species_people_people" ("speciesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4c896768b50c46acd8b611917e" ON "species_people_people" ("peopleId") `);
        await queryRunner.query(`CREATE TABLE "people_species_species" ("peopleId" integer NOT NULL, "speciesId" integer NOT NULL, CONSTRAINT "PK_a9367442a2f340b0f020cd592b0" PRIMARY KEY ("peopleId", "speciesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d6d545e4740ee652e6f79e9ffd" ON "people_species_species" ("peopleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9232984d4ee14342ad97f44382" ON "people_species_species" ("speciesId") `);
        await queryRunner.query(`ALTER TABLE "species" DROP COLUMN "people"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "species"`);
        await queryRunner.query(`ALTER TABLE "species_people_people" ADD CONSTRAINT "FK_62c0a74121aa06cdea24bc1e584" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_people_people" ADD CONSTRAINT "FK_4c896768b50c46acd8b611917e1" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people_species_species" ADD CONSTRAINT "FK_d6d545e4740ee652e6f79e9ffd5" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_species_species" ADD CONSTRAINT "FK_9232984d4ee14342ad97f443824" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_species_species" DROP CONSTRAINT "FK_9232984d4ee14342ad97f443824"`);
        await queryRunner.query(`ALTER TABLE "people_species_species" DROP CONSTRAINT "FK_d6d545e4740ee652e6f79e9ffd5"`);
        await queryRunner.query(`ALTER TABLE "species_people_people" DROP CONSTRAINT "FK_4c896768b50c46acd8b611917e1"`);
        await queryRunner.query(`ALTER TABLE "species_people_people" DROP CONSTRAINT "FK_62c0a74121aa06cdea24bc1e584"`);
        await queryRunner.query(`ALTER TABLE "people" ADD "species" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "species" ADD "people" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9232984d4ee14342ad97f44382"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d6d545e4740ee652e6f79e9ffd"`);
        await queryRunner.query(`DROP TABLE "people_species_species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c896768b50c46acd8b611917e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62c0a74121aa06cdea24bc1e58"`);
        await queryRunner.query(`DROP TABLE "species_people_people"`);
    }

}
