require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db"); // ← single function

const PORT = 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
