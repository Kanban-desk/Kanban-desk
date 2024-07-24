import { MigrationInterface, QueryRunner } from "typeorm";

export class SomeChanges1721305840624 implements MigrationInterface {
    name = 'SomeChanges1721305840624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" int NOT NULL IDENTITY(1,1), "content" nvarchar(2056) NOT NULL, "publication_date" datetime2 NOT NULL CONSTRAINT "DF_f1dc88c032ddcb61418ec6aaad3" DEFAULT getdate(), "taskTaskId" int, "authorUserId" int, CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b633d4847b1fff1a87ad09df5d8" FOREIGN KEY ("taskTaskId") REFERENCES "tasks"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c5da56fa978fa80ab371e666f1e" FOREIGN KEY ("authorUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c5da56fa978fa80ab371e666f1e"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b633d4847b1fff1a87ad09df5d8"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
