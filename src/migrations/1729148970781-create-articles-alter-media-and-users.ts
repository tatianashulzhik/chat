import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticlesAlterMediaAndUsers1729148970781 implements MigrationInterface {
    name = 'CreateArticlesAlterMediaAndUsers1729148970781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."articles_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."articles_status_enum" NOT NULL DEFAULT 'draft', "link" text, "author" text, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles_authors_users" ("articlesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_a711994cb6bf2cbcfb421b0fa26" PRIMARY KEY ("articlesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9e9360e62f0980fdef8711d168" ON "articles_authors_users" ("articlesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a3ec45ba7e08af0eacc2f802b" ON "articles_authors_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "media" ADD "articleId" integer`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_74983db3f1711777ae2d5f2059b" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles_authors_users" ADD CONSTRAINT "FK_9e9360e62f0980fdef8711d168e" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles_authors_users" ADD CONSTRAINT "FK_4a3ec45ba7e08af0eacc2f802b0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles_authors_users" DROP CONSTRAINT "FK_4a3ec45ba7e08af0eacc2f802b0"`);
        await queryRunner.query(`ALTER TABLE "articles_authors_users" DROP CONSTRAINT "FK_9e9360e62f0980fdef8711d168e"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_74983db3f1711777ae2d5f2059b"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "articleId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a3ec45ba7e08af0eacc2f802b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e9360e62f0980fdef8711d168"`);
        await queryRunner.query(`DROP TABLE "articles_authors_users"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TYPE "public"."articles_status_enum"`);
    }

}
