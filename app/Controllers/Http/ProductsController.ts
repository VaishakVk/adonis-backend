import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Product from "App/Models/Product";

export default class ProductsController {
  async create(ctx: HttpContextContract) {
    const productSchema = schema.create({
      title: schema.string({ trim: true }),
      description: schema.string.optional({ trim: true }),
      price: schema.number(),
      product_category_id: schema.number([
        rules.exists({ table: "product_categories", column: "id" }),
      ]),
      product_sub_category_id: schema.number([
        rules.exists({ table: "product_sub_categories", column: "id" }),
      ]),
    });

    const payload = await ctx.request.validate({
      schema: productSchema,
    });

    const userData = await ctx.auth.user;

    const productData = await Product.create({
      ...payload,
      userId: userData?.id,
    });
    ctx.response.status(201).json(productData);
  }

  async find(ctx: HttpContextContract) {
    const productData = await Product.query()
      .preload("productCategory")
      .preload("productSubCategory")
      .preload("user");
    ctx.response.status(200).json(productData);
  }

  async findOne(ctx: HttpContextContract) {
    const productData = await Product.query()
      .where("id", ctx.params.id)
      .preload("productCategory")
      .preload("productSubCategory")
      .preload("user")
      .firstOrFail();
    ctx.response.status(200).json(productData);
  }

  async delete(ctx: HttpContextContract) {
    const productData = await Product.findOrFail(ctx.params.id);
    productData.delete();
    ctx.response.status(204);
  }

  async update(ctx: HttpContextContract) {
    const productSchema = schema.create({
      title: schema.string.optional({ trim: true }),
      description: schema.string.optional({ trim: true }),
      price: schema.number(),
      product_category_id: schema.number.optional([
        rules.exists({ table: "product_categories", column: "id" }),
      ]),
      product_sub_category_id: schema.number.optional([
        rules.exists({ table: "product_sub_categories", column: "id" }),
      ]),
      //   user_id: schema.number.optional([
      //     rules.exists({ table: "users", column: "id" }),
      //   ]),
    });
    const payload = await ctx.request.validate({
      schema: productSchema,
    });
    const userData = await ctx.auth.user;

    const productData = await Product.findOrFail(ctx.params.id);
    await productData.merge({ ...payload, userId: userData?.id }).save();
    ctx.response.status(200).json(productData);
  }
}
