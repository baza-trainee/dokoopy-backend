require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth/auth-routes");
const projectsRouter = require("./routes/api/projects/projects-routes");
const bankRouter = require("./routes/api/bank/bank-routes");
const heroRouter = require("./routes/api/hero/hero-routes");
const reportsRouter = require("./routes/api/reports/reports-routes")
const contactsRouter = require("./routes/api/contacts/contacts-routes")
const partnersRouter = require("./routes/api/partners/partners-routes");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("index", {
    heading: "Dokoopy",
    time: new Date().toUTCString(),
  });
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://dokoopy-frontend.vercel.app"],
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/bank", bankRouter);
app.use("/api/hero", heroRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/partners", partnersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
