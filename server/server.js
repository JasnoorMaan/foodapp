const PORT = process.env.PORT ?? 8000;
// const priceService = require("./service/pricingService");
const express = require("express");
const app = express();

const cors = require("cors");
const routes = require("./routes/routes");

const pool = require("./db");

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
