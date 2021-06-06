/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/signup", "UsersController.create");
  Route.post("/login", "UsersController.login");
}).prefix("/user");

Route.group(() => {
  Route.post("/", "ProductCategoriesController.create").middleware([
    "auth",
    "admin",
  ]);
  Route.get("/", "ProductCategoriesController.find").middleware(["auth"]);
  Route.get("/:id", "ProductCategoriesController.findOne").middleware(["auth"]);
  Route.patch("/:id", "ProductCategoriesController.update").middleware([
    "auth",
    "admin",
  ]);
  Route.delete("/:id", "ProductCategoriesController.delete").middleware([
    "auth",
    "admin",
  ]);
}).prefix("/category");

Route.group(() => {
  Route.post("/", "ProductSubCategoriesController.create").middleware([
    "auth",
    "admin",
  ]);
  Route.get("/", "ProductSubCategoriesController.find").middleware(["auth"]);
  Route.get("/:id", "ProductSubCategoriesController.findOne").middleware([
    "auth",
  ]);
  Route.patch("/:id", "ProductSubCategoriesController.update").middleware([
    "auth",
    "admin",
  ]);
  Route.delete("/:id", "ProductSubCategoriesController.delete").middleware([
    "auth",
    "admin",
  ]);
}).prefix("/subcategory");

Route.group(() => {
  Route.post("/", "ProductsController.create").middleware(["auth", "admin"]);
  Route.get("/", "ProductsController.find").middleware(["auth"]);
  Route.get("/:id", "ProductsController.findOne").middleware(["auth"]);
  Route.patch("/:id", "ProductsController.update").middleware([
    "auth",
    "admin",
  ]);
  Route.delete("/:id", "ProductsController.delete").middleware([
    "auth",
    "admin",
  ]);
}).prefix("/product");

Route.get("/", async () => {
  return { hello: "world" };
});
