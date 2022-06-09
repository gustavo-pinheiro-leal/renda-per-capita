const router = require("express").Router();
const {trataDados, buscaCep, montaRetorno} = require("./middlewares/validation.js")

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/",trataDados,buscaCep, montaRetorno,(req, res) => {
    res.render("success", {retorno: req.retorno});
});

module.exports=router;