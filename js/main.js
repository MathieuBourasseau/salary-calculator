// GET ALL NECESSARY DOM ELEMENT

// Toggles buttons
const fieldsetElts = document.querySelectorAll(".toggle-group");
fieldsetElts.forEach((fieldset) => {
    console.log(fieldset.querySelectorAll("button"))
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