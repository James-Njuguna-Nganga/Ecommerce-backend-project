const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//create new product => /api/v1/admin/product/new

exports.newProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  })

})
//get all products => /api/v1/products?search/filter/pagination of products in the database

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();  //for frontend
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products
  })
})

//get single product details => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }


  res.status(200).json({
    success: true,
    product
  })
})

//update product  => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    product
  })

})

//delete product  => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Product removed successfully'
  });
})

// Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  // Find product by ID
  const product = await Product.findById(productId);

  // If product is not found, return an error
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Ensure product.reviews is an array
  if (!Array.isArray(product.reviews)) {
    product.reviews = [];
  }

  // Ensure req.user is defined
  if (!req.user) {
    return next(new ErrorHandler('User not authenticated', 401));
  }

  // Create the review object
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  // Check if the user has already reviewed the product
  const isReviewed = product.reviews.find(
    r => r.user && r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach(review => {
      if (review.user && review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  }  else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  });
});

//get product reviews => /api/v1/reviews

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.id);



  res.status(200).json({
    success: true,
    reviews: product.reviews
  });
})

//delete product review => /api/v1/reviews

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.id);



  res.status(200).json({
    success: true,
    reviews: product.reviews
  });
})

