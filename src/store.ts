import { Store } from "./lib/store";
import { invariant } from "./utils";

type Operator = "+" | "-" | "/" | "*";

export interface State {
  output: string;
  operands: { value: number; operator: Operator }[];
}

function isValidOperator(value: string): value is Operator {
  return ["+", "-", "/", "*"].includes(value);
}

const initialState: State = { output: "0", operands: [] };

export const store = new Store(initialState, {
  operator(state, value: number, operator: string) {
    invariant(isValidOperator(operator), "invalid operator: " + operator);
    const operands = [...state.operands, { value, operator }];
    return { operands, output: "0" };
  },
  calculate(state) {
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

    return { operands: [], output: String(result.value) };
  },
  input(state, value: string) {
    const output = state.output === "0" ? value : state.output + value;
    return { ...state, output };
  },
  clear() {
    return { output: "0", operands: [] };
  },
  dot(state) {
    if (!state.output.includes(".")) {
      return { ...state, output: state.output + "." };
    }

    return state;
  },
});
