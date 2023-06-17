const express = require("express");
const { rootRouter } = require("./routes");
const { notFoundHandler } = require("./middlewares/notFoundHandler");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/", rootRouter);

app.use(notFoundHandler);

app.use(globalErrorHandler);

module.exports = { app };
