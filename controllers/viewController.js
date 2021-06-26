const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  //1) Get Tour data from collection
  const tours = await Tour.find();
  //2) Build template
  //3) Render that template using data from step 1
  res.status(200).render('overview', { title: 'All tours', tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  //1) Get the data for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new appError('There is no tour with this name', 404));
  }

  //2) Build template

  //3) Render that template using data from step 1)

  res.status(200).render('tour', { title: `${tour.name} tour`, tour });
});

exports.getLoginForm = (req, res) => {
  // res.setHeader(
  //   'Content-Security-Policy',
  //   "script-src 'self' cdn.jsdelivr.net  blob: data: gap:"
  // );
  res.status(200).render('login', { title: 'Login' });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', { title: 'Your account' });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true }
  );

  res
    .status(200)
    .render('account', { title: 'Your account', user: updatedUser });
});
