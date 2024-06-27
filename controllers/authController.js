const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/kccvibpsuiusmwfepb3m',
      url: 'https://res.cloudinary.com/shopit/image/upload/v1666305757/avatars/kccvibpsuiusmwfepb3m.png'
    }
  });

  res.status(201).json({
    success: true,
    user
  });
});
