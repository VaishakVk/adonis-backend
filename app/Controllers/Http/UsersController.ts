import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { userTypes } from "App/enum/enum";
import User from "App/Models/User";

export default class UsersController {
  public async create(ctx: HttpContextContract) {
    const signupSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({ table: "users", column: "username" }),
      ]),
      email: schema.string({ escape: true }, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({}, [rules.minLength(6)]),
      first_name: schema.string(),
      last_name: schema.string(),
      gender: schema.enum(["male", "female", "other"]),
      contact_number: schema.string({}, [rules.regex(/[0-9\-+]/)]),
      address: schema.string.optional(),
      type: schema.enum(Object.values(userTypes)),
    });

    const payload = await ctx.request.validate({ schema: signupSchema });

    const userData = await User.create(payload);
    ctx.response.status(201).json(userData);
  }

  public async login(ctx: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    });

    const payload = await ctx.request.validate({ schema: loginSchema });

    const userData = await ctx.auth.attempt(payload.email, payload.password);
    ctx.response.status(200).json(userData);
  }
}
