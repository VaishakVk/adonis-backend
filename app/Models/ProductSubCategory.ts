import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  column,
  hasMany,
  HasMany,
  BelongsTo,
} from "@ioc:Adonis/Lucid/Orm";
import ProductCategory from "./ProductCategory";
import Product from "./Product";

export default class ProductSubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public name: string;

  @column()
  public productCategoryId: number;

  @column()
  public status: boolean;

  @hasMany(() => Product)
  public product: HasMany<typeof Product>;

  @belongsTo(() => ProductCategory)
  public productCategory: BelongsTo<typeof ProductCategory>;
}
