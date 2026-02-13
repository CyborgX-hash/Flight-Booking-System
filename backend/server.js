require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/db")

const PORT = process.env.PORT || 5001

connectDB();

app.get("/test-deploy", (req, res) => {
  res.send("Deployment Verification: v2.0 (Success!)")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
