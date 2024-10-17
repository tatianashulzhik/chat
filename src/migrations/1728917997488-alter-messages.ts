import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMessages1728917997488 implements MigrationInterface {
    name = 'AlterMessages1728917997488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages_users_statuses" ("messageId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_1eb666ccff63ea9d4a7aa1fbb92" PRIMARY KEY ("messageId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_049557c3221a7a55efa71b6186" ON "messages_users_statuses" ("messageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d91bc76f76a83f702d4c758abe" ON "messages_users_statuses" ("userId") `);
        await queryRunner.query(`ALTER TABLE "messages_users_statuses" ADD CONSTRAINT "FK_049557c3221a7a55efa71b61865" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "messages_users_statuses" ADD CONSTRAINT "FK_d91bc76f76a83f702d4c758abe4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages_users_statuses" DROP CONSTRAINT "FK_d91bc76f76a83f702d4c758abe4"`);
        await queryRunner.query(`ALTER TABLE "messages_users_statuses" DROP CONSTRAINT "FK_049557c3221a7a55efa71b61865"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d91bc76f76a83f702d4c758abe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_049557c3221a7a55efa71b6186"`);
        await queryRunner.query(`DROP TABLE "messages_users_statuses"`);
    }

}
