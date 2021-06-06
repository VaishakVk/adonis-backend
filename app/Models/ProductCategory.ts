import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import ProductSubCategory from "./ProductSubCategory";

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Product)
  public product: HasMany<typeof Product>;

  @hasMany(() => ProductSubCategory)
  public productSubCategory: HasMany<typeof ProductSubCategory>;
}
