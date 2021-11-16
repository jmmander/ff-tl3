import {MigrationInterface, QueryRunner} from "typeorm";

export class boards1636646303044 implements MigrationInterface {
    name = 'boards1636646303044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boards" ("id" SERIAL NOT NULL, "title" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "board_id" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "boardId" integer`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "section_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "cards_section_id_seq"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "title" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_d314a937c4659cf3b2088016930" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "FK_52345cb793dec6b6c773cfadf2b" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "FK_52345cb793dec6b6c773cfadf2b"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_d314a937c4659cf3b2088016930"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "title" text NOT NULL`);
        await queryRunner.query(`CREATE SEQUENCE "cards_section_id_seq" OWNED BY "cards"."section_id"`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "section_id" SET DEFAULT nextval('cards_section_id_seq')`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "boardId"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "board_id"`);
        await queryRunner.query(`DROP TABLE "boards"`);
    }

}
