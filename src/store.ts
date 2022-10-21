import { Store } from "./lib/store";
import { invariant } from "./utils";

type Operator = "+" | "-" | "/" | "*";

export interface Operand {
  value: number;
  operator: Operator | null;
}

export interface State {
  output: string;
  operands: Operand[];
  history: {
    output: string;
    operands: Operand[];
  }[];
}

function isValidOperator(value: string): value is Operator {
  return ["+", "-", "/", "*"].includes(value);
}

const historyKey = "dvcalc-history";

const initialHistory =
  JSON.parse(localStorage.getItem(historyKey) || "[]") || [];

window.addEventListener("beforeunload", () => {
  localStorage.setItem(historyKey, JSON.stringify(store.getState().history));
});

const initialState: State = {
  output: "0",
  operands: [],
  history: initialHistory,
};

export const store = new Store(initialState, {
  operator(state, value: number, operator: string) {
    invariant(isValidOperator(operator), "invalid operator: " + operator);
    const operands = [...state.operands, { value, operator }];
    return { ...state, operands, output: "0" };
  },
  calculate(state) {
    if (state.operands.length == 0) return state;

    const finalOperands = [
      ...state.operands,
      { value: Number.parseFloat(state.output), operator: null },
    ];

    const result = finalOperands.reduce((left, right) => {
      invariant(left.operator, "operator is required");
      const value = {
        "+": (a: number, b: number) => a + b,
        "-": (a: number, b: number) => a - b,
        "*": (a: number, b: number) => a * b,
        "/": (a: number, b: number) => a / b,
      }[left.operator](left.value, right.value);
      return { value, operator: right.operator };
    });

    const output = String(result.value);

    const history = [...state.history, { output, operands: finalOperands }];

    return { history, operands: [], output: output };
  },
  input(state, value: string) {
    const output = state.output === "0" ? value : state.output + value;
    return { ...state, output };
  },
  clear(state) {
    return { ...state, output: "0", operands: [] };
  },
  dot(state) {
    if (!state.output.includes(".")) {
      return { ...state, output: state.output + "." };
    }

    return state;
  },
  removeHistoryEntry(state, index: number) {
    return {
      ...state,
      history: state.history.filter(
        (_, currentIndex) => currentIndex !== index
      ),
    };
  },
});
