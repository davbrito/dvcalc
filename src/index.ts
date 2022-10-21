import { State, store } from "./store";
import "./styles.css";
import { invariant } from "./utils";

function select<E extends Element>(selector: string) {
  const el = document.querySelector<E>(selector);
  invariant(el, `the selector ${selector} didn't match any element`);
  return el;
}

const numbers = document.querySelectorAll<HTMLButtonElement>(
  "button[data-number]"
);
const operators = document.querySelectorAll<HTMLButtonElement>(
  "button[data-operator]"
);
const calculate = select<HTMLButtonElement>("button[data-calculate]");
const clear = select<HTMLButtonElement>("button[data-clear]");
const dot = select<HTMLButtonElement>("button[data-dot]");
const result = select<HTMLDivElement>("#result");
const operation = select<HTMLDivElement>("#operation");
const outputWrapper = select<HTMLDivElement>("#output-wrapper");

calculate.addEventListener("click", handleCalculate);
clear.addEventListener("click", handleClear);
dot.addEventListener("click", handleDot);
window.addEventListener("keydown", handleKeydown);
outputWrapper.addEventListener(
  "wheel",
  (event: WheelEvent) => {
    event.preventDefault();
    outputWrapper.scrollLeft += event.deltaY * (event.ctrlKey ? -1 : 1);
  },
  { passive: false }
);

numbers.forEach((button) => {
  button.addEventListener("click", handleNumber);
});

operators.forEach((button) => {
  button.addEventListener("click", handleOperator);
});

function update(state: State) {
  result.innerText = state.output;
  operation.innerText =
    state.operands.reduce((acc, curr) => {
      return [acc, curr.value, curr.operator]
        .filter((item) => item != null)
        .join(" ");
    }, "") +
    " " +
    state.output;
}

update(store.getState());
store.subscribe(update);

function handleNumber(event: Event) {
  const value = (event.currentTarget as HTMLElement).dataset.number;
  if (value === undefined) {
    throw new Error("invariant error: button does not have a number value");
  }
  store.input(value);
}

function handleOperator(event: Event) {
  const operator = (event.target as HTMLElement).dataset.operator;
  if (operator === undefined) {
    throw new Error("invariant error: button does not have an operator");
  }
  const value = Number.parseFloat(result.innerText);
  store.operator(value, operator);
}

function handleCalculate() {
  store.calculate();
}

function handleClear() {
  store.clear();
}

function handleDot() {
  store.dot();
}

function handleKeydown(event: KeyboardEvent) {
  if (/^\d$/.test(event.key)) {
    store.input(event.key);
  } else if (/^(\+|-|\*|\/)$/.test(event.key)) {
    const value = Number.parseFloat(result.innerText);
    store.operator(value, event.key);
  }
}
