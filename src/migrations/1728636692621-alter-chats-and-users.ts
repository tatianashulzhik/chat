import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterChatsAndUsers1728636692621 implements MigrationInterface {
    name = 'AlterChatsAndUsers1728636692621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" ADD "creatorId" integer`);
        await queryRunner.query(`ALTER TABLE "chats" ADD "secondUserId" integer`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_9ff8fc297ba6317c88421aecaed" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_5cf982ff651370bdfe3061388ba" FOREIGN KEY ("secondUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_5cf982ff651370bdfe3061388ba"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_9ff8fc297ba6317c88421aecaed"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "secondUserId"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "creatorId"`);
    }

}
