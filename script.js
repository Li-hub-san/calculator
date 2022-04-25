"use strict";

// TODO: change the calculator AC to C once we start typing
let viewfinderEl = document.getElementById("viewfinder");

function printDigit(event) {
  if (viewfinderEl.innerText === "Not a number") {
    viewfinderEl.innerText = "0";
  }

  if (+viewfinderEl.innerText === 0 && event.target.outerText !== ",") {
    viewfinderEl.innerText = event.target.outerText;
  } else if (
    isNaN(+viewfinderEl.innerText[viewfinderEl.innerText.length - 1]) &&
    viewfinderEl.innerText[viewfinderEl.innerText.length - 1] !== "," &&
    event.target.outerText === ","
  ) {
    viewfinderEl.innerText += 0 + event.target.outerText;
  } else {
    let numbers = viewfinderEl.innerText.split(/[+–÷×]/);
    if (
      event.target.outerText !== "," ||
      numbers[numbers.length - 1].indexOf(",") === -1
    ) {
      viewfinderEl.innerText += event.target.outerText;
    }
  }
}

function addEventToDigits() {
  let digits = document.getElementsByClassName("digits");

  for (let i = 0; i < digits.length; i++) {
    let currentDigit = digits[i];

    currentDigit.addEventListener("click", printDigit);
  }
}

function printOperator(event) {
  if (viewfinderEl.innerText === "Not a number") {
    viewfinderEl.innerText = "0";
  }

  let lastCharacter = viewfinderEl.innerText[viewfinderEl.innerText.length - 1];

  if (event.target.outerText === "=") {
    if (isNaN(+lastCharacter)) {
      viewfinderEl.textContent = removeLastCharacter(viewfinderEl.textContent);
    }

    const cleanViewFinder = viewfinderEl.textContent
      .replace(/×/g, "*")
      .replace(/–/g, "-")
      .replace(/÷/g, "/")
      .replace(/,/g, ".");

    let result = eval(cleanViewFinder);
    if (isNaN(result)) {
      viewfinderEl.textContent = "Not a number";
    } else {
      viewfinderEl.textContent = (+result.toFixed(10))
        .toString()
        .replace(/\./g, ",");
    }
  } else if (isNaN(+lastCharacter)) {
    viewfinderEl.textContent =
      removeLastCharacter(viewfinderEl.textContent) + event.target.outerText;
  } else {
    viewfinderEl.innerText += event.target.outerText;
  }
}

function removeLastCharacter(string) {
  return string.substring(0, string.length - 1);
}

function addEventToOperators() {
  let operatorEls = document.getElementsByClassName("operators");

  for (const operatorEl of operatorEls) {
    operatorEl.addEventListener("click", printOperator);
  }
}

function clearViewfinder() {
  let clearFieldsEl = document.getElementById("clear-fields");

  clearFieldsEl.addEventListener("click", () => {
    viewfinderEl.innerText = "0";
  });
}

addEventToDigits();
clearViewfinder();
addEventToOperators();
