// https://github.com/fawazahmed0/exchange-api

const BASE_URL = "https://cdn.jsdelivr.net/gh/@fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");



// for (code in countryList) {
//     console.log(code, countryList[code]);
// }

for (let select of dropdowns) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "From" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "To" && currencyCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtval);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurrency.value, toCurrency.value);
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let rate = data[toCurrency.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = amtVal * rate
    msg.innerText = `${amtVal} ${fromCurrency.value}  = ${finalAmount} ${toCurrency}`
};
const updateFlag = (element) => {
    // console.log(element);
    let currencyCode = element.value;
    // console.log(currencyCode);
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangerate();
});

window.addEventListener("load", () => {
    updateExchangeRate()
})

