import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1711134349756 implements MigrationInterface {
    name = 'InitDb1711134349756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_35cd6c3fafec0bb5d072e24ea20\``);
        await queryRunner.query(`ALTER TABLE \`address\` CHANGE \`user_id\` \`customer_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`payment-method\` ADD \`is_selected\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_9c9614b2f9d01665800ea8dbff7\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_9c9614b2f9d01665800ea8dbff7\``);
        await queryRunner.query(`ALTER TABLE \`payment-method\` DROP COLUMN \`is_selected\``);
        await queryRunner.query(`ALTER TABLE \`address\` CHANGE \`customer_id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_35cd6c3fafec0bb5d072e24ea20\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
