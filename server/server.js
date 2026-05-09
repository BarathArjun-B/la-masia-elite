const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`La Masia Elite API running on port ${PORT}`);
  });
});

process.on("unhandledRejection", (error) => {
  console.error(`Unhandled rejection: ${error.message}`);
  process.exit(1);
});
