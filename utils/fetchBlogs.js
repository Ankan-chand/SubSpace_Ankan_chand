const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");

//function to fetch the blogs through api call using axios
exports.fetchBlogs = async () => {
  let response;
  try {
    response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }   
      );
    } catch (error) {
        return next(new ErrorHandler("Api is not available or returned an error", 500));
    }

    return response.data.blogs;
};
