let $03a9e6848100b442$var$$state = {
    output: "0",
    operands: []
};
const $03a9e6848100b442$var$listeners = new Set();
function $03a9e6848100b442$var$assertOperator(value) {
    if (![
        "+",
        "-",
        "/",
        "*"
    ].includes(value)) throw new Error("invalid operator: " + value);
}
function $03a9e6848100b442$var$runListeners(state) {
    $03a9e6848100b442$var$listeners.forEach((listener)=>listener(state));
}
function $03a9e6848100b442$var$operate(operator, leftOperand, rightOperand) {
    return ({
        "+": (a, b)=>a + b,
        "-": (a, b)=>a - b,
        "*": (a, b)=>a * b,
        "/": (a, b)=>a / b
    })[operator](leftOperand, rightOperand);
}
const $03a9e6848100b442$export$6f57813fe9f31bf9 = {
    subscribe (listener) {
        $03a9e6848100b442$var$listeners.add(listener);
        return ()=>{
            $03a9e6848100b442$var$listeners.delete(listener);
        };
    },
    getState () {
        return Object.freeze($03a9e6848100b442$var$$state);
    },
    ...$03a9e6848100b442$var$makeUpdaters({
        operator (state, value, operator) {
            $03a9e6848100b442$var$assertOperator(operator);
            const operands = [
                ...state.operands,
                {
                    value: value,
                    operator: operator
                }
            ];
            return {
                operands: operands,
                output: "0"
            };
        },
        calculate (state) {
            const finalOperands = [
                ...state.operands,
                {
                    value: Number.parseFloat(state.output),
                    operator: null
                }, 
            ];
            const result = finalOperands.reduce((left, right)=>{
                if (!left.operator) throw new Error("invariant failed: operator is required");
                const value = $03a9e6848100b442$var$operate(left.operator, left.value, right.value);
                return {
                    value: value,
                    operator: right.operator
                };
            });
            return {
                operands: [],
                output: String(result.value)
            };
        },
        input (state, value) {
            const output = state.output === "0" ? value : state.output + value;
            return {
                ...state,
                output: output
            };
        },
        clear () {
            return {
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
        }
    })
};
function $03a9e6848100b442$var$makeUpdaters(updaters) {
    return Object.fromEntries(Object.entries(updaters).map(([key, value])=>{
        return [
            key,
            (...args)=>{
                if (!value) return;
                const oldState = $03a9e6848100b442$var$$state;
                const newState = value(oldState, ...args);
                if (oldState !== newState) {
                    $03a9e6848100b442$var$$state = Object.freeze(newState);
                    $03a9e6848100b442$var$runListeners($03a9e6848100b442$var$$state);
                }
            }, 
        ];
    }));
}



function $bdf0195f3bc674cc$export$f5708dca728d7177(value, message) {
    if (!value) {
        const error = new Error(message);
        error.name = "InvariantViolation";
        throw error;
    }
}


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
function $d69556644bb6dc7a$var$update(state) {
    $d69556644bb6dc7a$var$result.innerText = state.output;
    $d69556644bb6dc7a$var$operation.innerText = state.operands.reduce((acc, curr)=>{
        return [
            acc,
            curr.value,
            curr.operator
        ].filter((item)=>item != null).join(" ");
    }, "") + " " + state.output;
}
$d69556644bb6dc7a$var$update((0, $03a9e6848100b442$export$6f57813fe9f31bf9).getState());
(0, $03a9e6848100b442$export$6f57813fe9f31bf9).subscribe($d69556644bb6dc7a$var$update);
function $d69556644bb6dc7a$var$handleNumber(event) {
    const value = event.currentTarget.dataset.number;
    if (value === undefined) throw new Error("invariant error: button does not have a number value");
    (0, $03a9e6848100b442$export$6f57813fe9f31bf9).input(value);
}
function $d69556644bb6dc7a$var$handleOperator(event) {
    const operator = event.target.dataset.operator;
    if (operator === undefined) throw new Error("invariant error: button does not have an operator");
    const value = Number.parseFloat($d69556644bb6dc7a$var$result.innerText);
    (0, $03a9e6848100b442$export$6f57813fe9f31bf9).operator(value, operator);
}
function $d69556644bb6dc7a$var$handleCalculate() {
    (0, $03a9e6848100b442$export$6f57813fe9f31bf9).calculate();
}
function $d69556644bb6dc7a$var$handleClear() {
    (0, $03a9e6848100b442$export$6f57813fe9f31bf9).clear();
}
function $d69556644bb6dc7a$var$handleDot() {
    (0, $03a9e6848100b442$export$6f57813fe9f31bf9).dot();
}
function $d69556644bb6dc7a$var$handleKeydown(event) {
    if (/^\d$/.test(event.key)) (0, $03a9e6848100b442$export$6f57813fe9f31bf9).input(event.key);
    else if (/^(\+|-|\*|\/)$/.test(event.key)) {
        const value = Number.parseFloat($d69556644bb6dc7a$var$result.innerText);
        (0, $03a9e6848100b442$export$6f57813fe9f31bf9).operator(value, event.key);
    }
}


//# sourceMappingURL=index.4410576b.js.map
