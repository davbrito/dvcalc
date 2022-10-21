(function () {
let $8be15738f290fa57$var$$state = {
    output: "0",
    operands: []
};
const $8be15738f290fa57$var$listeners = new Set();
function $8be15738f290fa57$var$assertOperator(value) {
    if (![
        "+",
        "-",
        "/",
        "*"
    ].includes(value)) throw new Error("invalid operator: " + value);
}
function $8be15738f290fa57$var$runListeners(state) {
    $8be15738f290fa57$var$listeners.forEach((listener)=>listener(state));
}
function $8be15738f290fa57$var$operate(operator, leftOperand, rightOperand) {
    return ({
        "+": (a, b)=>a + b,
        "-": (a, b)=>a - b,
        "*": (a, b)=>a * b,
        "/": (a, b)=>a / b
    })[operator](leftOperand, rightOperand);
}
const $8be15738f290fa57$export$6f57813fe9f31bf9 = {
    subscribe (listener) {
        $8be15738f290fa57$var$listeners.add(listener);
        return ()=>{
            $8be15738f290fa57$var$listeners.delete(listener);
        };
    },
    getState () {
        return Object.freeze($8be15738f290fa57$var$$state);
    },
    ...$8be15738f290fa57$var$makeUpdaters({
        operator (state, value, operator) {
            $8be15738f290fa57$var$assertOperator(operator);
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
                const value = $8be15738f290fa57$var$operate(left.operator, left.value, right.value);
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
function $8be15738f290fa57$var$makeUpdaters(updaters) {
    return Object.fromEntries(Object.entries(updaters).map(([key, value])=>{
        return [
            key,
            (...args)=>{
                if (!value) return;
                const oldState = $8be15738f290fa57$var$$state;
                const newState = value(oldState, ...args);
                if (oldState !== newState) {
                    $8be15738f290fa57$var$$state = Object.freeze(newState);
                    $8be15738f290fa57$var$runListeners($8be15738f290fa57$var$$state);
                }
            }, 
        ];
    }));
}



function $56f8c318710251e7$export$f5708dca728d7177(value, message) {
    if (!value) {
        const error = new Error(message);
        error.name = "InvariantViolation";
        throw error;
    }
}


function $bc8f58a6aa3a7a47$var$select(selector) {
    const el = document.querySelector(selector);
    (0, $56f8c318710251e7$export$f5708dca728d7177)(el, `the selector ${selector} didn't match any element`);
    return el;
}
const $bc8f58a6aa3a7a47$var$numbers = document.querySelectorAll("button[data-number]");
const $bc8f58a6aa3a7a47$var$operators = document.querySelectorAll("button[data-operator]");
const $bc8f58a6aa3a7a47$var$calculate = $bc8f58a6aa3a7a47$var$select("button[data-calculate]");
const $bc8f58a6aa3a7a47$var$clear = $bc8f58a6aa3a7a47$var$select("button[data-clear]");
const $bc8f58a6aa3a7a47$var$dot = $bc8f58a6aa3a7a47$var$select("button[data-dot]");
const $bc8f58a6aa3a7a47$var$result = $bc8f58a6aa3a7a47$var$select("#result");
const $bc8f58a6aa3a7a47$var$operation = $bc8f58a6aa3a7a47$var$select("#operation");
const $bc8f58a6aa3a7a47$var$outputWrapper = $bc8f58a6aa3a7a47$var$select("#output-wrapper");
$bc8f58a6aa3a7a47$var$calculate.addEventListener("click", $bc8f58a6aa3a7a47$var$handleCalculate);
$bc8f58a6aa3a7a47$var$clear.addEventListener("click", $bc8f58a6aa3a7a47$var$handleClear);
$bc8f58a6aa3a7a47$var$dot.addEventListener("click", $bc8f58a6aa3a7a47$var$handleDot);
window.addEventListener("keydown", $bc8f58a6aa3a7a47$var$handleKeydown);
$bc8f58a6aa3a7a47$var$outputWrapper.addEventListener("wheel", (event)=>{
    event.preventDefault();
    $bc8f58a6aa3a7a47$var$outputWrapper.scrollLeft += event.deltaY * (event.ctrlKey ? -1 : 1);
}, {
    passive: false
});
$bc8f58a6aa3a7a47$var$numbers.forEach((button)=>{
    button.addEventListener("click", $bc8f58a6aa3a7a47$var$handleNumber);
});
$bc8f58a6aa3a7a47$var$operators.forEach((button)=>{
    button.addEventListener("click", $bc8f58a6aa3a7a47$var$handleOperator);
});
function $bc8f58a6aa3a7a47$var$update(state) {
    $bc8f58a6aa3a7a47$var$result.innerText = state.output;
    $bc8f58a6aa3a7a47$var$operation.innerText = state.operands.reduce((acc, curr)=>{
        return [
            acc,
            curr.value,
            curr.operator
        ].filter((item)=>item != null).join(" ");
    }, "") + " " + state.output;
}
$bc8f58a6aa3a7a47$var$update((0, $8be15738f290fa57$export$6f57813fe9f31bf9).getState());
(0, $8be15738f290fa57$export$6f57813fe9f31bf9).subscribe($bc8f58a6aa3a7a47$var$update);
function $bc8f58a6aa3a7a47$var$handleNumber(event) {
    const value = event.currentTarget.dataset.number;
    if (value === undefined) throw new Error("invariant error: button does not have a number value");
    (0, $8be15738f290fa57$export$6f57813fe9f31bf9).input(value);
}
function $bc8f58a6aa3a7a47$var$handleOperator(event) {
    const operator = event.target.dataset.operator;
    if (operator === undefined) throw new Error("invariant error: button does not have an operator");
    const value = Number.parseFloat($bc8f58a6aa3a7a47$var$result.innerText);
    (0, $8be15738f290fa57$export$6f57813fe9f31bf9).operator(value, operator);
}
function $bc8f58a6aa3a7a47$var$handleCalculate() {
    (0, $8be15738f290fa57$export$6f57813fe9f31bf9).calculate();
}
function $bc8f58a6aa3a7a47$var$handleClear() {
    (0, $8be15738f290fa57$export$6f57813fe9f31bf9).clear();
}
function $bc8f58a6aa3a7a47$var$handleDot() {
    (0, $8be15738f290fa57$export$6f57813fe9f31bf9).dot();
}
function $bc8f58a6aa3a7a47$var$handleKeydown(event) {
    if (/^\d$/.test(event.key)) (0, $8be15738f290fa57$export$6f57813fe9f31bf9).input(event.key);
    else if (/^(\+|-|\*|\/)$/.test(event.key)) {
        const value = Number.parseFloat($bc8f58a6aa3a7a47$var$result.innerText);
        (0, $8be15738f290fa57$export$6f57813fe9f31bf9).operator(value, event.key);
    }
}

})();
//# sourceMappingURL=index.6b9a4b4a.js.map
