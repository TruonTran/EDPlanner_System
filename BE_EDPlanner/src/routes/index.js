const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const mentorRoutes = require("./mentorRoutes");
const slotRoutes = require("./slotRoutes");
// const productRoutes = require("./productRoutes");
// const categoryRoutes = require("./categoryRoutes");
// const cartRoutes = require("./cartRoutes");
// const orderRoutes = require("./orderRoutes");
// const statisticsRoutes = require("./statisticsRoutes");

const route = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/mentors", mentorRoutes);
  app.use("/api/slots", slotRoutes);
  // app.use("/api/products", productRoutes);
  // app.use("/api/categories", categoryRoutes);
  // app.use("/api/carts", cartRoutes);
  // app.use("/api/orders", orderRoutes);
  // app.use("/api/sta  tistics", statisticsRoutes);
};

module.exports = route;
