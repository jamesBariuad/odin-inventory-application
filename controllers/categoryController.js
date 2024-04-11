const Category = require("../models/category");
const Products = require("../models/product");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//display all categories
exports.categoryList = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find();
  res.render("categoryList", {
    title: "Categories",
    categoryList: allCategories,
  });
});

//display detail of a specific category
exports.categoryDetails = asyncHandler(async (req, res, next) => {
  const [productsInCategory, categoryDetails] = await Promise.all([
    Products.find({ category: req.params.id }, "name"),
    Category.findById(req.params.id),
  ]);

  res.render("categoryDetails", {
    productsInCategory: productsInCategory,
    category: categoryDetails,
  });
});

//display category create form on GET
exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
  res.render("categoryForm");
});
//handle category create on POST
exports.categoryCreatePost = [
  body("name", "Category must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Category description must contain at least 10 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("categoryForm", {
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();

      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

//display category delete form on GET
exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
  const [productsWithChosenCategory, chosenCategory] = await Promise.all([
    Products.find({category:req.params.id}),
    Category.findById(req.params.id)
  ])


    res.render("categoryDeleteForm",{
      products: productsWithChosenCategory,
      category: chosenCategory
    })
});

//handle category delete on POST
exports.categoryDeletePost = asyncHandler(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id)
  res.redirect("/inventory/categories")
});

//display category update form on GET
exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("not implementde update on get");
});

//handle category update on POST
exports.categoryUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("not implementde update on post");
});
