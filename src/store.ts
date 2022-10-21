type Operator = "+" | "-" | "/" | "*";

export interface State {
  output: string;
  operands: {
    value: number;
    operator: Operator;
  }[];
}

type Listener = (state: State) => void;

let $state: Readonly<State> = {
  output: "0",
  operands: [],
};

const listeners = new Set<Listener>();

function assertOperator(value: string): asserts value is Operator {
  if (!["+", "-", "/", "*"].includes(value)) {
    throw new Error("invalid operator: " + value);
  }
}

function runListeners(state: State) {
  listeners.forEach((listener) => listener(state));
}

function operate(
  operator: Operator,
  leftOperand: number,
  rightOperand: number
) {
  return {
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
    "*": (a: number, b: number) => a * b,
    "/": (a: number, b: number) => a / b,
  }[operator](leftOperand, rightOperand);
}

export const store = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getState(): State {
    return Object.freeze($state);
  },
  ...makeUpdaters({
    operator(state, value: number, operator: string) {
      assertOperator(operator);

      const operands = [...state.operands, { value, operator }];
      return { operands, output: "0" };
    },
    calculate(state) {
      const finalOperands = [
        ...state.operands,
        { value: Number.parseFloat(state.output), operator: null },
      ];

      const result = finalOperands.reduce((left, right) => {
        if (!left.operator) {
          throw new Error("invariant failed: operator is required");
        }

        const value = operate(left.operator, left.value, right.value);
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
  }),
};

type MakeUpdatersResult<
  T extends Partial<{ [key: string]: (state: State, ...args: any[]) => State }>
> = {
  [Key in keyof T]: T[Key] extends (state: State, ...args: infer Args) => any
    ? (...args: Args) => void
    : never;
};

function makeUpdaters<
  T extends Partial<{ [key: string]: (state: State, ...args: any[]) => State }>
>(updaters: T): MakeUpdatersResult<T> {
  return Object.fromEntries(
    Object.entries(updaters).map(([key, value]) => {
      return [
        key,
        (...args: any[]) => {
          if (!value) return;
          const oldState = $state;
          const newState = value(oldState, ...args);
          if (oldState !== newState) {
            $state = Object.freeze(newState);
            runListeners($state);
          }
        },
      ];
    })
  ) as MakeUpdatersResult<T>;
}
