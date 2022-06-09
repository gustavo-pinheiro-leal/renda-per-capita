const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const routes = require ("./routes");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));
