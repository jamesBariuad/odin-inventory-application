const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

//display all categories
exports.categoryList = asyncHandler(async (req, res, next) => {
  res.send("not implemented yet");
});

//display detail of a specific category
exports.categoryDetails = asyncHandler(async (req, res, next) => {
  res.send("stops here");
});

//display category create form on GET
exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
  res.send("why is not sending");
});
//handle category create on POST
exports.categoryCreatePost = asyncHandler(async (req, res, next) => {
  res.send("not implementde create on post");
});

//display category delete form on GET
exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("not implementde delete on get");
});

//handle category delete on POST
exports.categoryDeletePost = asyncHandler(async (req, res, next) => {
  res.send("not implementde delete on post");
});

//display category update form on GET
exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("not implementde update on get");
});

//handle category update on POST
exports.categoryUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("not implementde update on post");
});
