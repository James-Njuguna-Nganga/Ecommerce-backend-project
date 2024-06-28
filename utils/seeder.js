const Product = require('../models/product');
const products = require('../data/product');
const connectDB = require("../config/database");


connectDB()

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products are deleted');

    await Product.insertMany(products);
    console.log('All products are added');

    process.exit();

  } catch (error) {
    console.log(error.message);
    process.exit();
  }
}

seedProducts();