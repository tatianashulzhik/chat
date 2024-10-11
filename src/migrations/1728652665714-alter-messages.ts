import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMessages1728652665714 implements MigrationInterface {
    name = 'AlterMessages1728652665714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "updateAt"`);
    }

}
