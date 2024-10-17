import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostsMediaAndAlterUsers1729072434235 implements MigrationInterface {
    name = 'CreatePostsMediaAndAlterUsers1729072434235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "contentType" character varying NOT NULL, "postId" integer, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."posts_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."posts_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_authors_users" ("postsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_df1ae482086bb096f51ca8329a2" PRIMARY KEY ("postsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9daa1f21cc8733ad08dc341c8c" ON "posts_authors_users" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc63fc050a3b2b1743415f1991" ON "posts_authors_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_9dcde1b1308b5f22f34b8454e28" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_authors_users" ADD CONSTRAINT "FK_9daa1f21cc8733ad08dc341c8c4" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_authors_users" ADD CONSTRAINT "FK_cc63fc050a3b2b1743415f19913" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_authors_users" DROP CONSTRAINT "FK_cc63fc050a3b2b1743415f19913"`);
        await queryRunner.query(`ALTER TABLE "posts_authors_users" DROP CONSTRAINT "FK_9daa1f21cc8733ad08dc341c8c4"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_9dcde1b1308b5f22f34b8454e28"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc63fc050a3b2b1743415f1991"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9daa1f21cc8733ad08dc341c8c"`);
        await queryRunner.query(`DROP TABLE "posts_authors_users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TYPE "public"."posts_status_enum"`);
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
