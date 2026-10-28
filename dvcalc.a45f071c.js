class $20aab3d10f5eaa82$export$390f32400eaf98c9 {
    #listeners;
    #state;
    #updaters;
    #runListeners(snapshot) {
        this.#listeners.forEach((listener)=>listener(snapshot));
    }
    #makeUpdaters(updatersMap) {
        return Object.fromEntries(Object.entries(updatersMap).map(([key, value])=>{
            return [
                key,
                (...args)=>{
                    if (!value) return;
                    const oldState = this.#state;
                    const newState = value(oldState, ...args);
                    if (oldState !== newState) {
                        const snapshot = this.#state = Object.freeze(newState);
                        this.#runListeners(snapshot);
                    }
                }
            ];
        }));
    }
    constructor(initialState, updatersMap){
        this.#listeners = new Set();
        this.#state = Object.freeze(initialState);
        this.#updaters = this.#makeUpdaters(updatersMap);
    }
    subscribe(listener) {
        this.#listeners.add(listener);
        return ()=>{
            this.#listeners.delete(listener);
        };
    }
    getState() {
        return Object.freeze(this.#state);
    }
    get updaters() {
        return Object.freeze(this.#updaters);
    }
}


function $bdf0195f3bc674cc$export$f5708dca728d7177(value, message) {
    if (!value) {
        const error = new Error(message);
        error.name = "InvariantViolation";
        throw error;
    }
}


function $03a9e6848100b442$var$isValidOperator(value) {
    return [
        "+",
        "-",
        "/",
        "*"
    ].includes(value);
}
const $03a9e6848100b442$var$historyKey = "dvcalc-history";
const $03a9e6848100b442$var$initialHistory = JSON.parse(localStorage.getItem($03a9e6848100b442$var$historyKey) || "[]") || [];
window.addEventListener("beforeunload", ()=>{
    localStorage.setItem($03a9e6848100b442$var$historyKey, JSON.stringify($03a9e6848100b442$export$6f57813fe9f31bf9.getState().history));
});
const $03a9e6848100b442$var$initialState = {
    output: "0",
    operands: [],
    history: $03a9e6848100b442$var$initialHistory
};
const $03a9e6848100b442$export$6f57813fe9f31bf9 = new (0, $20aab3d10f5eaa82$export$390f32400eaf98c9)($03a9e6848100b442$var$initialState, {
    operator (state, value, operator) {
        (0, $bdf0195f3bc674cc$export$f5708dca728d7177)($03a9e6848100b442$var$isValidOperator(operator), "invalid operator: " + operator);
        const operands = [
            ...state.operands,
            {
                value: value,
                operator: operator
            }
        ];
        return {
            ...state,
            operands: operands,
            output: "0"
        };
    },
    calculate (state) {
        if (state.operands.length == 0) return state;
        const finalOperands = [
            ...state.operands,
            {
                value: Number.parseFloat(state.output),
                operator: null
            }
        ];
        const result = finalOperands.reduce((left, right)=>{
            (0, $bdf0195f3bc674cc$export$f5708dca728d7177)(left.operator, "operator is required");
            const value = ({
                "+": (a, b)=>a + b,
                "-": (a, b)=>a - b,
                "*": (a, b)=>a * b,
                "/": (a, b)=>a / b
            })[left.operator](left.value, right.value);
            return {
                value: value,
                operator: right.operator
            };
        });
        const output = String(result.value);
        const history = [
            ...state.history,
            {
                output: output,
                operands: finalOperands
            }
        ];
        return {
            history: history,
            operands: [],
            output: output
        };
    },
    input (state, value) {
        const output = state.output === "0" ? value : state.output + value;
        return {
            ...state,
            output: output
        };
    },
    clear (state) {
        return {
            ...state,
            output: "0",
            operands: []
        };
    },
    dot (state) {
        if (!state.output.includes(".")) return {
            ...state,
            output: state.output + "."
        };
        return state;
    },
    removeHistoryEntry (state, index) {
        return {
            ...state,
            history: state.history.filter((_, currentIndex)=>currentIndex !== index)
        };
    }
});




function $d69556644bb6dc7a$var$select(selector) {
    const el = document.querySelector(selector);
    (0, $bdf0195f3bc674cc$export$f5708dca728d7177)(el, `the selector ${selector} didn't match any element`);
    return el;
}
const $d69556644bb6dc7a$var$numbers = document.querySelectorAll("button[data-number]");
const $d69556644bb6dc7a$var$operators = document.querySelectorAll("button[data-operator]");
const $d69556644bb6dc7a$var$calculate = $d69556644bb6dc7a$var$select("button[data-calculate]");
const $d69556644bb6dc7a$var$clear = $d69556644bb6dc7a$var$select("button[data-clear]");
const $d69556644bb6dc7a$var$dot = $d69556644bb6dc7a$var$select("button[data-dot]");
const $d69556644bb6dc7a$var$result = $d69556644bb6dc7a$var$select("#result");
const $d69556644bb6dc7a$var$operation = $d69556644bb6dc7a$var$select("#operation");
const $d69556644bb6dc7a$var$outputWrapper = $d69556644bb6dc7a$var$select("#output-wrapper");
const $d69556644bb6dc7a$var$history = $d69556644bb6dc7a$var$select("#history-list");
$d69556644bb6dc7a$var$calculate.addEventListener("click", $d69556644bb6dc7a$var$handleCalculate);
$d69556644bb6dc7a$var$clear.addEventListener("click", $d69556644bb6dc7a$var$handleClear);
$d69556644bb6dc7a$var$dot.addEventListener("click", $d69556644bb6dc7a$var$handleDot);
window.addEventListener("keydown", $d69556644bb6dc7a$var$handleKeydown);
$d69556644bb6dc7a$var$outputWrapper.addEventListener("wheel", (event)=>{
    event.preventDefault();
    $d69556644bb6dc7a$var$outputWrapper.scrollLeft += event.deltaY * (event.ctrlKey ? -1 : 1);
}, {
    passive: false
});
$d69556644bb6dc7a$var$numbers.forEach((button)=>{
    button.addEventListener("click", $d69556644bb6dc7a$var$handleNumber);
});
$d69556644bb6dc7a$var$operators.forEach((button)=>{
    button.addEventListener("click", $d69556644bb6dc7a$var$handleOperator);
});
function $d69556644bb6dc7a$var$formatOperands(operands) {
    return operands.reduce((acc, curr)=>{
        return [
            acc,
            curr.value,
            curr.operator
        ].filter((item)=>item != null).join(" ");
    }, "");
}
function $d69556644bb6dc7a$var$update(state) {
    $d69556644bb6dc7a$var$result.innerText = state.output;
    $d69556644bb6dc7a$var$operation.innerText = $d69556644bb6dc7a$var$formatOperands(state.operands) + " " + state.output;
    const fragment = new DocumentFragment();
    state.history.forEach((entry, index)=>{
        const li = document.createElement("li");
        li.innerHTML = `<button type="button">X</button> ${$d69556644bb6dc7a$var$formatOperands(entry.operands)} = ${entry.output}`;
        fragment.appendChild(li);
        li.addEventListener("click", (event)=>{
            if (event.target instanceof HTMLButtonElement) $d69556644bb6dc7a$var$updaters.removeHistoryEntry(index);
        });
    });
    $d69556644bb6dc7a$var$history.replaceChildren(fragment);
}
const { updaters: $d69556644bb6dc7a$var$updaters } = (0, $03a9e6848100b442$export$6f57813fe9f31bf9);
$d69556644bb6dc7a$var$update((0, $03a9e6848100b442$export$6f57813fe9f31bf9).getState());
(0, $03a9e6848100b442$export$6f57813fe9f31bf9).subscribe($d69556644bb6dc7a$var$update);
function $d69556644bb6dc7a$var$handleNumber(event) {
    const value = event.currentTarget.dataset.number;
    if (value === undefined) throw new Error("invariant error: button does not have a number value");
    $d69556644bb6dc7a$var$updaters.input(value);
}
function $d69556644bb6dc7a$var$handleOperator(event) {
    const operator = event.target.dataset.operator;
    (0, $bdf0195f3bc674cc$export$f5708dca728d7177)(operator, "button does not have an operator");
    const value = Number.parseFloat($d69556644bb6dc7a$var$result.innerText);
    $d69556644bb6dc7a$var$updaters.operator(value, operator);
}
function $d69556644bb6dc7a$var$handleCalculate() {
    $d69556644bb6dc7a$var$updaters.calculate();
}
function $d69556644bb6dc7a$var$handleClear() {
    $d69556644bb6dc7a$var$updaters.clear();
}
function $d69556644bb6dc7a$var$handleDot() {
    $d69556644bb6dc7a$var$updaters.dot();
}
function $d69556644bb6dc7a$var$handleKeydown(event) {
    if (/^\d$/.test(event.key)) $d69556644bb6dc7a$var$updaters.input(event.key);
    else if (/^(\+|-|\*|\/)$/.test(event.key)) {
        const value = Number.parseFloat($d69556644bb6dc7a$var$result.innerText);
        $d69556644bb6dc7a$var$updaters.operator(value, event.key);
    } else if (event.key === "Enter") // event.preventDefault();
    $d69556644bb6dc7a$var$updaters.calculate();
    console.log(event.key);
}


//# sourceMappingURL=dvcalc.a45f071c.js.map
