import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterChatsAndUsers1728893517635 implements MigrationInterface {
    name = 'AlterChatsAndUsers1728893517635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_5cf982ff651370bdfe3061388ba"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_9ff8fc297ba6317c88421aecaed"`);
        await queryRunner.query(`CREATE TABLE "chats_participants_users" ("chatsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_8927abbb3526ba8390b651b4675" PRIMARY KEY ("chatsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b66415a2051b0c7cd1961bfbbf" ON "chats_participants_users" ("chatsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5771c3686b4165c67c8f810302" ON "chats_participants_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "secondUserId"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "chats_participants_users" ADD CONSTRAINT "FK_b66415a2051b0c7cd1961bfbbf5" FOREIGN KEY ("chatsId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "chats_participants_users" ADD CONSTRAINT "FK_5771c3686b4165c67c8f8103024" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats_participants_users" DROP CONSTRAINT "FK_5771c3686b4165c67c8f8103024"`);
        await queryRunner.query(`ALTER TABLE "chats_participants_users" DROP CONSTRAINT "FK_b66415a2051b0c7cd1961bfbbf5"`);
        await queryRunner.query(`ALTER TABLE "chats" ADD "creatorId" integer`);
        await queryRunner.query(`ALTER TABLE "chats" ADD "secondUserId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5771c3686b4165c67c8f810302"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b66415a2051b0c7cd1961bfbbf"`);
        await queryRunner.query(`DROP TABLE "chats_participants_users"`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_9ff8fc297ba6317c88421aecaed" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_5cf982ff651370bdfe3061388ba" FOREIGN KEY ("secondUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
