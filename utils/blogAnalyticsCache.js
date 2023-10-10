const _ = require("lodash");
const { fetchBlogs } = require("./fetchBlogs");
const ErrorHandler = require("../utils/ErrorHandler");

//memoized function to fetch and analyze the blogs
const blogAnalyticsCache = _.memoize(async () => {
  //fetching the blogs
  const fetchedBlogs = await fetchBlogs();

  if (!fetchedBlogs.length) {
    return next(new ErrorHandler("No blogs found!", 404));
  }

  //total no. of fetched blogs
  const noOfBlogsFetched = _.size(fetchedBlogs);

  //blog with the longest title
  const longestTitle = _.maxBy(fetchedBlogs, (blog) => _.size(blog.title));

  //no. of blogs with title containing "privacy"
  const titleContainingPrivacy = _.reduce(
    fetchedBlogs,
    (result, blog) => {
      const words = _.split(_.toLower(blog.title), " ");
      if (_.includes(words, "privacy")) {
        return result + 1;
      }
      return result;
    },
    0
  );

  //array of unique blogs
  const uniqueBlogTitles = _.uniqBy(fetchedBlogs, "title");

  //object containg the analytics results
  const blogAnalytics = {
    noOfBlogsFetched,
    longestTitle,
    titleContainingPrivacy,
    uniqueBlogTitles,
  };

  // Clear the cache for this queryKey after 15 minutes
  setTimeout(() => {
    blogAnalyticsCache.cache.clear();
  }, 15 * 60 * 1000);

  return blogAnalytics;
});

module.exports = blogAnalyticsCache;
