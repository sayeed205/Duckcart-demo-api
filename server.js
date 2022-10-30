const Express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const creatorsRoute = require("./routes/creators");
const donationsRoute = require("./routes/donations");

const app = Express();

app.use(Express.json());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/creators", creatorsRoute);
app.use("/api/donations", donationsRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening to to ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
