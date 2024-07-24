import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAvatarNotNull1721304122537 implements MigrationInterface {
    name = 'UserAvatarNotNull1721304122537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "content" nvarchar(255) NULL`);
        await queryRunner.query(`UPDATE "notifications" SET "content" = 'default_value' WHERE "content" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "content" nvarchar(255) NOT NULL`);

        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "type" nvarchar(255) NULL`);
        await queryRunner.query(`UPDATE "notifications" SET "type" = 'default_value' WHERE "type" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "type" nvarchar(255) NOT NULL`);

        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "args"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "args" nvarchar(512) NULL`);
        await queryRunner.query(`UPDATE "notifications" SET "args" = 'default_value' WHERE "args" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "args" nvarchar(512) NOT NULL`);

        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" nvarchar(15)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" nvarchar(15)`);

        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" nvarchar(50) NULL`);
        await queryRunner.query(`UPDATE "users" SET "email" = 'default_value' WHERE "email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" nvarchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);

        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" nvarchar(255) NULL`);
        await queryRunner.query(`UPDATE "users" SET "password" = 'default_value' WHERE "password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" nvarchar(255) NOT NULL`);

        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_46a40978974c3c80c3b0d57f821"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_path"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_path" nvarchar(512)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_path"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_path" nvarchar(512)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_46a40978974c3c80c3b0d57f821" UNIQUE ("avatar_path")`);

        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" nvarchar(255) NULL`);
        await queryRunner.query(`UPDATE "users" SET "password" = 'default_value' WHERE "password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" nvarchar(255) NOT NULL`);

        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" nvarchar(50) NULL`);
        await queryRunner.query(`UPDATE "users" SET "email" = 'default_value' WHERE "email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" nvarchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);

        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" nvarchar(15)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" nvarchar(15)`);

        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "args"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "args" nvarchar(512) NULL`);
        await queryRunner.query(`UPDATE "notifications" SET "args" = 'default_value' WHERE "args" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "args" nvarchar(512) NOT NULL`);

        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "type" nvarchar(255) NULL`);
        await queryRunner.query(`UPDATE "notifications" SET "type" = 'default_value' WHERE "type" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "type" nvarchar(255) NOT NULL`);
        
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "content" nvarchar(255) NULL`);
        await queryRunner.query(`UPDATE "notifications" SET "content" = 'default_value' WHERE "content" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "content" nvarchar(255) NOT NULL`);
    }
}