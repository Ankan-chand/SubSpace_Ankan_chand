const app = require("./app");
const { errorMiddleware } = require("./middlewares/Error");
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.use(errorMiddleware);