#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Product = require("./models/product");

const categories = [];
const products = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createProducts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description:description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function productCreate(index, name, price, description, numberInStock , category) {
   const productDetails = {
    name:name,
    price:price,
    description:description,
    numberInStock:numberInStock,
    category:category
   } 

   const product = new Product(productDetails)
   await product.save()
   products[index] = product;
   console.log(`Added product: ${product.name}`)

  
}

async function createCategories(){
  console.log("Adding categories")
  await Promise.all([
    categoryCreate(0, "Smartphones","Power in your pocket! Get the latest smartphones for ultimate convenience."),
    categoryCreate(1, "Tablets","Your portable entertainment hub! Explore our range of tablets for on-the-go fun."),
    categoryCreate(2, "Wearable Devices", "Stay connected, stay stylish! Discover our wearable tech for effortless convenience."),
  ])
}

async function createProducts(){
  console.log("Adding products")
  await Promise.all([
    productCreate(0,"iPhone 13 Pro", 999, "A flagship smartphone with a stunning Super Retina XDR display and powerful A15 Bionic chip.", 50, categories[0]),
    productCreate(1, "Samsung Galaxy S21 Ultra", 1199 , "A premium Android smartphone with a dynamic AMOLED display and versatile camera system.", 30, categories[0]),
    productCreate(2,"Google Pixel 6 Pro", 899 , "A cutting-edge smartphone with Google Tensor chip and advanced computational photography features.", 20, categories[0]),

    productCreate(3, "iPad Pro 12.9-inch", 1099, "A powerful tablet with M1 chip, Liquid Retina XDR display, and support for Apple Pencil.", 40, categories[1]),
    productCreate(4, "Samsung Galaxy Tab S7+", 849, "An Android tablet with Super AMOLED display, S Pen support, and DeX mode for productivity.", 25, categories[1]),
    productCreate(5, "Microsoft Surface Pro 7", 899, "A versatile 2-in-1 tablet with Intel Core processor, detachable keyboard, and Windows 10.", 35, categories[1]),

    productCreate(6, "Apple Watch Series 7", 399, "A premium smartwatch with larger display, advanced health features, and watchOS 8.", 60, categories[2]),
    productCreate(7, "Fitbit Charge 5", 179.95, "An advanced fitness tracker with color AMOLED display and built-in GPS.", 75, categories[2]),
    productCreate(8, "Garmin Forerunner 945", 599.99, "A GPS smartwatch designed for athletes with performance monitoring tools and music storage.", 30, categories[2]),
  ])
}

