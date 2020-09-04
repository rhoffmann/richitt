import { Migration } from '@mikro-orm/migrations';

export class Migration20200903201515 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "post" ("id" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);'
    );
    this.addSql(
      'alter table "post" add constraint "post_pkey" primary key ("id");'
    );

    this.addSql(
      'create table "user" ("id" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);'
    );
    this.addSql(
      'alter table "user" add constraint "user_pkey" primary key ("id");'
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");'
    );
  }
}
