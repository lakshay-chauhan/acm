document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/currencies")
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById("currencyTable");
            data.forEach(currency => {
                let row = `<tr><td>${currency.currency_code}</td><td>${currency.rate_to_usd}</td></tr>`;
                table.innerHTML += row;
            });
        });
});
