console.log("JS is connected!");
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b==0){
        return "Error: Division by zero is not allowed.";
    }
    return a/b;
}
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;
const display = document.querySelector(".display");

function updateDisplay(value) {
  display.textContent = value;
}
function appendNumber(number) {
  if (shouldResetDisplay) {
    updateDisplay("");
    shouldResetDisplay = false;
  }

  if (display.textContent === "0") {
    updateDisplay(number);
  } else {
    updateDisplay(display.textContent + number);
  }
}
function setOperator(operator) {
  if (currentOperator !== null && shouldResetDisplay) {
    currentOperator = operator;
    return;
  }

  if (currentOperator !== null) {
    calculate();
  }

  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}
function calculate() {
  if (currentOperator === null || shouldResetDisplay) return;

  secondNumber = display.textContent;

  let result = operate(currentOperator, firstNumber, secondNumber);

  // If divide by zero error
  if (typeof result === "string") {
    updateDisplay(result);
    currentOperator = null;
    shouldResetDisplay = true;
    return;
  }

  // Round long decimals
  result = Math.round(result * 1000) / 1000;

  updateDisplay(result);
  currentOperator = null;
  shouldResetDisplay = true;
}
function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
    shouldResetDisplay = false;
  updateDisplay("0");
}
