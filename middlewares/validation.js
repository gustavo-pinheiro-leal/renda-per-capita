const axios = require("axios");

const trataDados = (req, res, next) => {

    const {name, cep, income, dependents} = req.body;

    if (cep && income && dependents){
        return next();
    }

    res.sendStatus(400);
    
}

const buscaCep = (req, res, next) => {

    const cep = req.body.cep;
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => {
        req.endereco = response.data;
        return next();
    })
    .catch(error => res.status(400).render("failure"));

}

const montaRetorno = (req, res, next) => {

    const {name, income, dependents} = req.body;
    const {siafi, ddd, gia, ibge, ...restoEndereco} = req.endereco;
    const renda = calculaRenda(income, dependents);
    const retorno = {
        name,
        ...restoEndereco,
        renda
    }
    req.retorno = retorno;
    return next();
}

const calculaRenda = (income, dependents) => {
    dependents++;
    return (income / (dependents)).toFixed(2);
}

module.exports = {trataDados, buscaCep, montaRetorno};