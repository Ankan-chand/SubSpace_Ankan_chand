const { catchAsyncError } = require("../middlewares/catchAsyncError");
const _ = require("lodash");
const ErrorHandler = require("../utils/ErrorHandler");
const searchBlogCache = require("../utils/searchBlogCache");
const blogAnalyticsCache = require("../utils/blogAnalyticsCache");


//middleware to fetch and analyse the blogs
exports.blogStatMiddleware = catchAsyncError(async (req, res, next) => {
  
  //retriving the result form cache if available or refetching and reanlasyzing blogs
  const blogAnalytics = await blogAnalyticsCache();


  res.status(200).json({
    success: true,
    total_Blogs: blogAnalytics.noOfBlogsFetched,
    longest_Blog_Title: blogAnalytics.longestTitle,
    title_With_Privacy_Count: blogAnalytics.titleContainingPrivacy,
    unique_Blog_Titles: blogAnalytics.uniqueBlogTitles,
  });
});


//search blogs containing query keyword in the title
exports.getSearchedBlogs = catchAsyncError(async (req, res, next) => {
  const queryKey = _.toLower(req.query.query);

  if (!queryKey) {
    return next(new ErrorHandler("Search query is required", 400));
  }

  //retriving the result form cache if available or re-search blogs for query key
  const searchedBlogs = await searchBlogCache(queryKey);

  if (!searchedBlogs.length) {
    return next(new ErrorHandler("No match found!", 404));
  }

  res.status(200).json({
    success: true,
    searchedBlogs,
  });
});
