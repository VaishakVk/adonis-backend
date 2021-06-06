import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import ProductSubCategory from "App/Models/ProductSubCategory";

export default class ProductSubCategoriesController {
  async create(ctx: HttpContextContract) {
    const productSubCategorySchema = schema.create({
      name: schema.string({ trim: true }),
      status: schema.boolean(),
      product_category_id: schema.number([
        rules.exists({ table: "product_categories", column: "id" }),
      ]),
    });

    const payload = await ctx.request.validate({
      schema: productSubCategorySchema,
    });

    const categoryData = await ProductSubCategory.create(payload);
    ctx.response.status(201).json(categoryData);
  }

  async find(ctx: HttpContextContract) {
    const categoryData = await ProductSubCategory.query().preload(
      "productCategory"
    );
    ctx.response.status(200).json(categoryData);
  }

  async findOne(ctx: HttpContextContract) {
    const categoryData = await ProductSubCategory.query()
      .where("id", ctx.params.id)
      .preload("productCategory")
      .firstOrFail();
    ctx.response.status(200).json(categoryData);
  }

  async delete(ctx: HttpContextContract) {
    const categoryData = await ProductSubCategory.findOrFail(ctx.params.id);
    categoryData.delete();
    ctx.response.status(204);
  }

  async update(ctx: HttpContextContract) {
    const productSubCategorySchema = schema.create({
      name: schema.string.optional({ trim: true }),
      status: schema.boolean.optional(),
      product_category_id: schema.number.optional([
        rules.exists({ table: "product_categories", column: "id" }),
      ]),
    });
    const payload = await ctx.request.validate({
      schema: productSubCategorySchema,
    });
    const categoryData = await ProductSubCategory.findOrFail(ctx.params.id);
    await categoryData.merge(payload).save();
    ctx.response.status(200).json(categoryData);
  }
}
