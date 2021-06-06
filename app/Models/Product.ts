import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import ProductSubCategory from "./ProductSubCategory";
import ProductCategory from "./ProductCategory";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public productId: number;

  @column()
  public productCategoryId: number;

  @column()
  public productSubCategoryId: number;

  @column()
  public title: string;

  @column()
  public description?: string;

  @column()
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => ProductCategory)
  public productCategory: BelongsTo<typeof ProductCategory>;

  @belongsTo(() => ProductSubCategory)
  public productSubCategory: BelongsTo<typeof ProductSubCategory>;
}
