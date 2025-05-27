// src/migrations/XXXXXXXXXXXXXX-AddStatusToTask.ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToTask1700000000000 implements MigrationInterface {
    name = 'AddStatusToTask1700000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "status" varchar CHECK ("status" IN ('todo','in-progress','done')) NOT NULL DEFAULT 'todo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
    }
}