import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBoardRelation1636730588988 implements MigrationInterface {
    name = 'updateBoardRelation1636730588988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "FK_52345cb793dec6b6c773cfadf2b"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "boardId"`);
        await queryRunner.query(`ALTER TABLE "sections" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sections" ALTER COLUMN "board_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "UQ_9cf0ff28e768678e382fedac49d" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "boards" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "FK_29fa67620fff739b1baa76636f7" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "FK_29fa67620fff739b1baa76636f7"`);
        await queryRunner.query(`ALTER TABLE "boards" ALTER COLUMN "title" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "UQ_9cf0ff28e768678e382fedac49d"`);
        await queryRunner.query(`ALTER TABLE "sections" ALTER COLUMN "board_id" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "sections" ALTER COLUMN "title" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "boardId" integer`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "FK_52345cb793dec6b6c773cfadf2b" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
