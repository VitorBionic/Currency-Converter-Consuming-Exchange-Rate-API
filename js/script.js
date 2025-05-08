const frm = document.querySelector("form")
const resp = document.querySelector("h2")

frm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const inCurrencySelect = document.getElementById("inCurrency")
    const outCurrencySelect = document.getElementById("outCurrency")
    const inValueInput = document.getElementById("inValue")

    let inCurrency
    for (const option of inCurrencySelect.options) {
        if (option.selected) {
            inCurrency = option.value
            break
        }
    }

    let outCurrency
    for (const option of outCurrencySelect.options) {
        if (option.selected) {
            outCurrency = option.value
            break
        }
    }

    const value = parseFloat(inValueInput.value)

    const output = await convert(value, inCurrency, outCurrency)

    if (output !== null) {
        resp.innerText = `${output.toFixed(2)} ${outCurrency}`
    } else {
        resp.innerText = "Conversion failed."
    }
    
})

async function convert(value, inCurrency, outCurrency) {
    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/48b924a98ee0f35cd7951431/latest/${inCurrency}`
        )
        const data = await response.json()
        const exchangeRate = data.conversion_rates[outCurrency]
        return value * exchangeRate
    } catch (error) {
        console.error("Error in conversion:", error)
        return null
    }
}
