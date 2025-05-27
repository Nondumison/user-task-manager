import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToTask1700000000000 implements MigrationInterface {
    name = 'AddStatusToTask1700000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // SQLite requires creating a new table with the constraint
        await queryRunner.query(`
            CREATE TABLE "temp_task" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "completed" boolean NOT NULL DEFAULT (0),
                "status" varchar CHECK (status IN ('todo', 'in-progress', 'done')) 
                NOT NULL DEFAULT 'todo',
                "userId" integer,
                FOREIGN KEY ("userId") REFERENCES "user" ("id")
            )
        `);

        // Copy data from old table
        await queryRunner.query(`
            INSERT INTO "temp_task" ("id", "title", "description", "completed", "status", "userId")
            SELECT "id", "title", "description", "completed", 'todo', "userId" FROM "task"
        `);

        // Drop old table and rename new one
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "temp_task" RENAME TO "task"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse the process if needed
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
    }
}