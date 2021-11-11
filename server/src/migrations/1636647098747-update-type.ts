import {MigrationInterface, QueryRunner} from "typeorm";

export class updateType1636647098747 implements MigrationInterface {
    name = 'updateType1636647098747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "board_id"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "board_id" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "board_id"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "board_id" character varying NOT NULL DEFAULT ''`);
    }

}
