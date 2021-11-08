import "./styles.css";

const numbers = document.querySelectorAll("button[data-number]");
const operators = document.querySelectorAll("button[data-operator]");
const calculate = document.querySelector("button[data-calculate]");
const clear = document.querySelector("button[data-clear]");
const dot = document.querySelector("button[data-dot]");
const output = document.querySelector("output");

const state = {
  output: "0",
  operands: []
};

calculate.addEventListener("click", handleCalculate);
clear.addEventListener("click", handleClear);
dot.addEventListener("click", handleDot);

numbers.forEach((button) => {
  button.addEventListener("click", handleNumber);
});

operators.forEach((button) => {
  button.addEventListener("click", handleOperator);
});

function updateOutput() {
  output.innerText = state.output;
}

function handleNumber(event) {
  const value = event.target.dataset.number;
  if (state.output === "0") {
    state.output = value;
  } else {
    state.output += value;
  }
  updateOutput();
}

function handleOperator(event) {
  const operator = event.target.dataset.operator;

  state.operands.push({
    value: Number.parseFloat(output.innerText),
    operator
  });

  state.output = "0";

  updateOutput();
}

function handleCalculate() {
  state.operands.push({
    value: Number.parseFloat(state.output),
    operator: null
  });

  const result = state.operands.reduce((left, right) => {
    return {
      value: operate(left.operator, left.value, right.value),
      operator: right.operator
    };
  });

  state.output = result.value;
  state.operands = [];

  updateOutput();
}

function handleClear() {
  state.output = "0";
  state.operands = [];

  updateOutput();
}

function handleDot() {
  if (!state.output.includes(".")) {
    state.output += ".";
  }

  updateOutput();
}

function operate(operator, leftOperand, rightOperand) {
  return {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
  }[operator](leftOperand, rightOperand);
}
