const Express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const creatorsRoute = require("./routes/creators");
const donationsRoute = require("./routes/donations");

const app = Express();

// middleware
app.use(Express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// base routes
app.use("/api/creators", creatorsRoute);
app.use("/api/donations", donationsRoute);

const PORT = process.env.PORT;

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening to ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
