// Rate applied
let currentRate = 22;

// Monthly or annual salary
let currentPeriod = "monthly"

// --- ARROW FUNCTION TO UPDATE CONVERTION --- 

const updateNetFromRaw = () => {

    const currentRawSalary = rawSalaryElt.value;

    const newNetSalary = currentRawSalary * (1 - currentRate / 100);
    const newContributions = currentRawSalary - newNetSalary;

    let newAnnualNetSalary;

    if (currentPeriod === "monthly") {
        // newNetSalary is a monthly amount, multiply to get the yearly total
        newAnnualNetSalary = newNetSalary * 12;
    } else if (currentPeriod === "annual") {
        // newNetSalary is already a yearly amount, nothing to multiply
        newAnnualNetSalary = newNetSalary;
    }

    netSalaryElt.value = newNetSalary.toFixed(2);
    contributionsElt.textContent = newContributions.toFixed(2);
    annualAmountElt.textContent = newAnnualNetSalary.toFixed(2);

}

const updateRawFromNet = () => {

    const currentNetSalary = Number(netSalaryElt.value);

    const newRawSalary = currentNetSalary / (1 - currentRate / 100);
    const newContributions = newRawSalary - currentNetSalary;

    let newAnnualNetSalary;

    if (currentPeriod === "monthly") {
        // currentNetSalary is a monthly amount, multiply to get the yearly total
        newAnnualNetSalary = currentNetSalary * 12;
    } else if (currentPeriod === "annual") {
        // currentNetSalary is already a yearly amount, nothing to multiply
        newAnnualNetSalary = currentNetSalary;
    }

    rawSalaryElt.value = newRawSalary.toFixed(2);
    contributionsElt.textContent = newContributions.toFixed(2);
    annualAmountElt.textContent = newAnnualNetSalary.toFixed(2);

}



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

                updateNetFromRaw();
            }

            // Update the period and calculation according to the button clicked
            if (btnClicked.dataset.period) {

                // Save the former value of period
                const oldPeriod = currentPeriod;

                // Period update
                currentPeriod = btnClicked.dataset.period;

                // Compare the two values 
                if (oldPeriod === currentPeriod) {
                    return;
                }

                if (currentPeriod === "annual") {

                    const rawSalary = Number(rawSalaryElt.value);
                    const rawAnnualSalary = rawSalary * 12;

                    rawSalaryElt.value = rawAnnualSalary;

                } else if (currentPeriod === "monthly") {

                    const rawSalary = Number(rawSalaryElt.value);
                    const rawMonthlySalary = rawSalary / 12;

                    rawSalaryElt.value = rawMonthlySalary;
                }

                updateNetFromRaw();
            }
        })
    })
});

// --- CONVERT RAW INTO NET SALARY --- 

rawSalaryElt.addEventListener("input", updateNetFromRaw);

// --- CONVERT NET INTO RAW SALARY ---

netSalaryElt.addEventListener("input", updateRawFromNet);

// --- CONVERTER BUTTON --- 

converterButtonElt.addEventListener("click", () => {

    // Take the current raw salary and treat it as if it had been typed into "Salaire net"
    const formerRawSalary = rawSalaryElt.value;

    netSalaryElt.value = formerRawSalary;
    updateRawFromNet();

})







