const Product = require("../models/product");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { categoryList } = require("./categoryController");
const category = require("../models/category");
const { error } = require("console");
const product = require("../models/product");

//homepage
exports.index = asyncHandler(async (req, res, next) => {
  const [numberOfProducts, numberOfCategories] = await Promise.all([
    Product.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Inventory App",
    numberOfProducts: numberOfProducts,
    numberOfCategories: numberOfCategories,
  });
});

//display all products
exports.productList = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find().exec();

  res.render("productList", {
    title: "All Products",
    allProducts: allProducts,
  });
});

//display detail of a specific product
exports.productDetails = asyncHandler(async (req, res, next) => {
  const chosenProductDetails = await Product.findById(req.params.id)
    .populate("category")
    .exec();

  res.render("productDetails", {
    title: "Product Details",
    productDetails: chosenProductDetails,
  });
});

//display product create form on GET
exports.productCreateGet = asyncHandler(async (req, res, next) => {
  const categoryList = await Category.find().sort({name:1});

  res.render("productForm", { categoryList: categoryList });
});

//handle product create on POST
exports.productCreatePost = [
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : req.body.category;
    }
    next();
  },

  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("numberInStock", "Number in stock must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      numberInStock: req.body.numberInStock,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      const categoryList = await Category.find();

      res.render("productForm", {
        categoryList: categoryList,
        errors: errors.array(),
        productDetails: product,
      });

      return;
    } else {
      const productExists = await Product.findOne({ name: product.name });
      if (productExists) {
        res.redirect(productExists.url);
      }

      await product.save();
      res.redirect(product.url);
    }
  }),
];

//display product delete form on GET
exports.productDeleteGet = asyncHandler(async (req, res, next) => {
  const chosenProduct = await Product.findById(req.params.id)
  res.render("productDeleteForm",{
    product: chosenProduct
  })
});

//handle product delete on POST
exports.productDeletePost = asyncHandler(async (req, res, next) => {
  console.log(req.params.id)
  await Product.findByIdAndDelete(req.params.id)
  res.redirect('/inventory/products')
});

//display product update form on GET
exports.productUpdateGet = asyncHandler(async (req, res, next) => {
  const chosenProduct = await Product.findById(req.params.id)
  const categories = await Category.find()
  res.render("productForm",{
    title: "Update product",
    product: chosenProduct,
    categoryList: categories
  })
});

//handle product update on POST
exports.productUpdatePost = [
  body("name","Product name should contain at least 3 characters").trim().isLength({min:3}).escape(),
  body("description","Product description should contain at least 3 characters").trim().isLength({min:3}).escape(),

  asyncHandler(async(req,res,next)=>{
    const errors = validationResult(req)
    const categories = await Category.find()

    const updatedProduct = new Product({
      name:req.body.name,
      description: req.body.description,
      price:req.body.price,
      numberInStock: req.body.numberInStock,
      category:req.params.category,
      _id: req.params.id
    })

    console.log(updatedProduct)

    if(!errors.isEmpty()){
      res.render("productForm",{
        errors: errors.array(),
        product: updatedProduct,
        categoryList: categories
      }
    )
    return
    }else{
      const isDuplicate = await Product.find({name: updatedProduct.name})
      console.log(isDuplicate)
      if (isDuplicate){
        res.render("productForm",{
          title: "Update product",
          product: updatedProduct,
          categoryList: categories
        }
      )
      }else{
        await Product.findByIdAndUpdate(req.params.id, updatedProduct)
        res.redirect(updatedProduct.url)
      }

    }
  })
]
