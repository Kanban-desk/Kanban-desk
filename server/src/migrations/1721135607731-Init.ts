import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1721135607731 implements MigrationInterface {
    name = 'Init1721135607731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "statuses" ("status_id" int NOT NULL IDENTITY(1,1), "name" nvarchar(64) NOT NULL, "color" nvarchar(7) NOT NULL, "deskDeskId" int, CONSTRAINT "PK_e60daf67031169e5ef3fa35e133" PRIMARY KEY ("status_id"))`);
        await queryRunner.query(`CREATE TABLE "desks" ("desk_id" int NOT NULL IDENTITY(1,1), "name" nvarchar(100) NOT NULL, "avatar_path" nvarchar(100) NOT NULL, "authorUserId" int, CONSTRAINT "UQ_64e3e28f359fcaf4b6fa8837b27" UNIQUE ("avatar_path"), CONSTRAINT "PK_35750e75446a751e2354f1b6566" PRIMARY KEY ("desk_id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("notification_id" int NOT NULL IDENTITY(1,1), "content" varchar(255) NOT NULL, "type" varchar(255) NOT NULL, "args" varchar(512) NOT NULL, "is_seen" bit NOT NULL CONSTRAINT "DF_096549b018e21acc852c620cc8d" DEFAULT 0, "send_date" datetime2 NOT NULL CONSTRAINT "DF_13fe621c0486c53361d9c74423e" DEFAULT getdate(), "userUserId" int, CONSTRAINT "PK_eaedfe19f0f765d26afafa85956" PRIMARY KEY ("notification_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" int NOT NULL IDENTITY(1,1), "content" nvarchar(2056) NOT NULL, "publication_date" datetime2 NOT NULL CONSTRAINT "DF_f1dc88c032ddcb61418ec6aaad3" DEFAULT getdate(), "taskTaskId" int, "authorUserId" int, CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "priorities" ("priority_id" int NOT NULL IDENTITY(1,1), "name" nvarchar(32) NOT NULL, "color" nvarchar(7) NOT NULL, CONSTRAINT "PK_29175997a8046949b40fac05a0a" PRIMARY KEY ("priority_id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("task_id" int NOT NULL IDENTITY(1,1), "name" nvarchar(100) NOT NULL, "description" nvarchar(1028) NOT NULL, "start_date" datetime2, "end_date" datetime2, "tags" nvarchar(40) NOT NULL, "publication_date" datetime2 NOT NULL CONSTRAINT "DF_6d0ec07ca78a060978938a3a4e6" DEFAULT getdate(), "priorityPriorityId" int, "statusStatusId" int, "authorUserId" int, CONSTRAINT "PK_3feca00d238e5cf50185fab8d46" PRIMARY KEY ("task_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" int NOT NULL IDENTITY(1,1), "first_name" varchar(15), "last_name" varchar(15), "email" varchar(50) NOT NULL, "password" varchar(255) NOT NULL, "avatar_path" varchar(512), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_46a40978974c3c80c3b0d57f821" UNIQUE ("avatar_path"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("token_id" int NOT NULL IDENTITY(1,1), "token" varchar(512) NOT NULL, "expires_at" datetime2 NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_8fddd278029bfa176c0e6dd16d1" DEFAULT getdate(), "revoked_at" datetime2, "is_revoked" bit NOT NULL CONSTRAINT "DF_5ceb83ed855aca05fcd939578fb" DEFAULT 0, "userUserId" int, CONSTRAINT "UQ_6a8ca5961656d13c16c04079dd3" UNIQUE ("token"), CONSTRAINT "PK_de8dcea5d0b08d61d5ad1cf8575" PRIMARY KEY ("token_id"))`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_1acb82a524a0daaa6051eede612" FOREIGN KEY ("deskDeskId") REFERENCES "desks"("desk_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "desks" ADD CONSTRAINT "FK_efa8a59481f8922f4f6883712bf" FOREIGN KEY ("authorUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_c5cc52b42fde832d730c437e40f" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b633d4847b1fff1a87ad09df5d8" FOREIGN KEY ("taskTaskId") REFERENCES "tasks"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c5da56fa978fa80ab371e666f1e" FOREIGN KEY ("authorUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_189699cdd6796eaeeebfc710811" FOREIGN KEY ("priorityPriorityId") REFERENCES "priorities"("priority_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_f1c17c342901f2adb77f35426cf" FOREIGN KEY ("statusStatusId") REFERENCES "statuses"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d0a44bdadecece83dd1d2a4aed8" FOREIGN KEY ("authorUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d94e478145bb596788ec9ff1b2f" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d94e478145bb596788ec9ff1b2f"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d0a44bdadecece83dd1d2a4aed8"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_f1c17c342901f2adb77f35426cf"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_189699cdd6796eaeeebfc710811"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c5da56fa978fa80ab371e666f1e"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b633d4847b1fff1a87ad09df5d8"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_c5cc52b42fde832d730c437e40f"`);
        await queryRunner.query(`ALTER TABLE "desks" DROP CONSTRAINT "FK_efa8a59481f8922f4f6883712bf"`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_1acb82a524a0daaa6051eede612"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "priorities"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "desks"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
    }

}
