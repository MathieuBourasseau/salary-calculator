// GET ALL NECESSARY DOM ELEMENT

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

                // Test of data-rate 
                console.log(btnClicked.dataset.rate)
            }
        )
    })
});

// Raw salary input
const rawSalaryElt = document.getElementById("raw-salary");

// Net salary input
const netSalaryElt = document.getElementById("net-salary");

// Rate applied
const rateAppliedElt = document.querySelectorAll(".rate-applied");

// Contributions
const contributionsElt = document.getElementById("contributions");

// On 12 months
const annualAmountElt = document.getElementById("annual-amount");

// Converter button
const converterButtonElt = document.getElementById("converter-button");