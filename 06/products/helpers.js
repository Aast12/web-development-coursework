const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const currencyFormat = (value) => {
    return numberFormat.format(value);
};


module.exports = {
    currencyFormat
}