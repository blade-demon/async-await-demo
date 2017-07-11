const axios = require("axios");
const co = require("co");

const getExchangeRate = (from, to) => {
    return axios.get(`http://api.fixer.io/latest?base=${from}`).then(response => {
        return response.data.rates[to];
    });
}

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response)=> {
        return response.data.map((country) => country.name);
    });
};

const convertCurrency = (from, to, amount) => {
    return getCountries(to).then((countries) => {
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangeAmount = amount * rate;
        return `${amount} ${from} is worth ${exchangeAmount} ${to}.`;
    });
}
 
 /**
  * Co module
  */
const convertCurrencyCO = co.wrap(function *(from, to, amount) {
    const countries = yield getCountries(to);
    const rate = yield getExchangeRate(from, to);
    const exchangeAmount = amount * rate;
    
    return `${amount} ${from} is worth ${exchangeAmount.toFixed(2)} ${to}. ${to} can be use in the following countries: ${countries.join(', ')}`;
});

/**
 * Async await 
 * @param {String} from 
 * @param {String} to 
 * @param {Number} amount 
 */
const convertCurrencyAsyncAwait = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangeAmount = amount * rate;
    
    return `${amount} ${from} is worth ${exchangeAmount.toFixed(2)} ${to}. ${to} can be use in the following countries: ${countries.join(', ')}`;
};


convertCurrencyAsyncAwait('CAD', 'CNY', 100).then((status) => {
    console.log(status);
});