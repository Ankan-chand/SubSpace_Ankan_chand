const express = require("express");
const {blogStatMiddleware, getSearchedBlogs} = require("../controller/blog");
const router = express.Router();

//route for blog analysis
router.route("/blog-stats").get(blogStatMiddleware);

//route for blog search with query keyword
router.route('/blog-search').get(getSearchedBlogs);

module.exports = router;