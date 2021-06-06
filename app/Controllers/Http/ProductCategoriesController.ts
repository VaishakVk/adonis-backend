import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import ProductCategory from "App/Models/ProductCategory";

export default class ProductCategoriesController {
  async create(ctx: HttpContextContract) {
    const productCategorySchema = schema.create({
      name: schema.string({ trim: true }),
      status: schema.boolean(),
    });

    const payload = await ctx.request.validate({
      schema: productCategorySchema,
    });

    const categoryData = await ProductCategory.create(payload);
    ctx.response.status(201).json(categoryData);
  }

  async find(ctx: HttpContextContract) {
    const categoryData = await ProductCategory.all();
    ctx.response.status(200).json(categoryData);
  }

  async findOne(ctx: HttpContextContract) {
    const categoryData = await ProductCategory.findOrFail(ctx.params.id);
    ctx.response.status(200).json(categoryData);
  }

  async delete(ctx: HttpContextContract) {
    const categoryData = await ProductCategory.findOrFail(ctx.params.id);
    categoryData.delete();
    ctx.response.status(204);
  }

  async update(ctx: HttpContextContract) {
    const productCategorySchema = schema.create({
      name: schema.string.optional({ trim: true }),
      status: schema.boolean.optional(),
    });
    const payload = await ctx.request.validate({
      schema: productCategorySchema,
    });
    const categoryData = await ProductCategory.findOrFail(ctx.params.id);
    await categoryData.merge(payload).save();
    ctx.response.status(200).json(categoryData);
  }
}
