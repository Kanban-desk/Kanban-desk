import { MigrationInterface, QueryRunner } from "typeorm";

export class DeskDeleteUQ1721909325682 implements MigrationInterface {
    name = 'DeskDeleteUQ1721909325682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desks" DROP CONSTRAINT "UQ_64e3e28f359fcaf4b6fa8837b27"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desks" ADD CONSTRAINT "UQ_64e3e28f359fcaf4b6fa8837b27" UNIQUE ("avatar_path")`);
    }

}
