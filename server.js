const Express = require("express");
require("dotenv").config();

const creatorRoute = require("./routes/creators");

const app = Express();

app.use(Express.json());

app.use((req, res, next) => {
  res.status(200).json({
    msg: "api is working",
  });

  console.log(req.path, req.method);
  next();
});

app.use("/api/creators", creatorRoute);

const PORT = 3000;

app.listen(PORT || process.env.PORT, () => {
  console.log(`listening to to ${PORT}`);
});
