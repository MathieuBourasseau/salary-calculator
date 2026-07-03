// Rate applied
let currentRate = 22;

// GET ALL NECESSARY DOM ELEMENT FOR TOGGLE PART

// Raw salary input
const rawSalaryElt = document.getElementById("raw-salary");

// Net salary input
const netSalaryElt = document.getElementById("net-salary");

// Rate applied
const rateAppliedElts = document.querySelectorAll(".rate-applied");

// Contributions
const contributionsElt = document.getElementById("contributions");

// On 12 months
const annualAmountElt = document.getElementById("annual-amount");

// Converter button
const converterButtonElt = document.getElementById("converter-button");

// Toggles buttons
// Get the two fieldsets
const fieldsetElts = document.querySelectorAll(".toggle-group");

// Get the buttons inside each of them
fieldsetElts.forEach((fieldset) => {
    const btnElts = fieldset.querySelectorAll("button");

    // Add click event on each buttons
    btnElts.forEach((btn) => {
        btn.addEventListener("click", (e) => {

            // Button clicked
            const btnClicked = e.target;

            // Remove the class from every buttons
            btnElts.forEach((btn) => {
                btn.classList.remove("toggle-active")
            })

            // Add the class only on the button clicked
            btnClicked.classList.add("toggle-active");

            // Update the rate data according to the button clicked
            if (btnClicked.dataset.rate) {

                // Rate update
                currentRate = Number(btnClicked.dataset.rate);

                // Get each rate
                rateAppliedElts.forEach((rate) => {
                    rate.textContent = btnClicked.dataset.rate;
                })
            }
        })
    })
});

// --- CONVERT RAW INTO NET SALARY --- 

rawSalaryElt.addEventListener("input", ()=> {

    // Convert string into number
    const rawSalaryValue = Number(rawSalaryElt.value);

    // Calculate net salary
    const netSalaryConverted = rawSalaryValue * (1 - currentRate/100);

    // Calculate contributions
    const contributions = rawSalaryValue - netSalaryConverted;

    // Display the result into the net salary input
    netSalaryElt.value = netSalaryConverted;

    // Display the contributions
    contributionsElt.textContent = contributions;
})

// --- CONVERT NET INTO RAW SALARY ---

netSalaryElt.addEventListener("input", () => {

    // Convert string into number
    const netSalaryValue = Number(netSalaryElt.value);

    // Calculate raw salary
    const rawSalaryConverted = netSalaryValue / (1 - currentRate/100);

    // Calculate contributions
    const contributions = rawSalaryConverted - netSalaryValue;

    // Display the raw salary into the raw salary input
    rawSalaryElt.value = rawSalaryConverted;

    // Display contributions
    contributionsElt.textContent = contributions;

})






