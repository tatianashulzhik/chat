import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuestios1729088402113 implements MigrationInterface {
    name = 'CreateQuestios1729088402113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."questions_status_enum" AS ENUM('draft', 'published')`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question" text NOT NULL, "answer" text NOT NULL, "status" "public"."questions_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TYPE "public"."questions_status_enum"`);
    }
}
