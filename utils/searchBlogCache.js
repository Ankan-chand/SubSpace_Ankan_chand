const _ = require("lodash");
const { fetchBlogs } = require("./fetchBlogs");

//memoized function for search blogs respect to a given key
const searchBlogCache = _.memoize(async (queryKey) => {
  
  //fetching the blogs
  const fetchedBlogs = await fetchBlogs();

  //filters the blogs containing the given keyword
  const filteredBlogs = _.filter(fetchedBlogs, (blog) => {
    const words = _.split(_.toLower(blog.title), " ");
    return _.includes(words, queryKey);
  });

  // Clear the cache for this queryKey after 15 minutes
  setTimeout(() => {
    searchBlogCache.cache.delete(queryKey);
  }, 15 * 60 * 1000);

  return filteredBlogs;

}, (queryKey) => queryKey);

module.exports = searchBlogCache;
