import { DateTime } from "luxon";
import {
  BaseModel,
  beforeSave,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import Hash from "@ioc:Adonis/Core/Hash";
import { userTypes } from "App/enum/enum";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public email: string;

  @column()
  public firstName: string;

  @column()
  public lastName: string;

  @column()
  public gender: string;

  @column()
  public contactNumber: string;

  @column()
  public address?: string;

  @column()
  public type: userTypes;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Product)
  public product: HasMany<typeof Product>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
