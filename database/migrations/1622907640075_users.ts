import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("username").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name");
      table.string("gender");
      table.string("contact_number");
      table.string("address");
      table.enum("type", ["admin", "user"]);
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
