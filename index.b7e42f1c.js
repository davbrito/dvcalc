(function () {
function $5e4f6d966ada45af$export$2e2bcd8739ae039(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}


function $b132f94077943c9f$export$2e2bcd8739ae039(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}


function $abc94d246f1e600c$export$2e2bcd8739ae039(receiver, privateMap) {
    var descriptor = (0, $5e4f6d966ada45af$export$2e2bcd8739ae039)(receiver, privateMap, "get");
    return (0, $b132f94077943c9f$export$2e2bcd8739ae039)(receiver, descriptor);
}


function $bc7d3ca89e2f7ddd$export$2e2bcd8739ae039(obj, privateCollection) {
    if (privateCollection.has(obj)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}


function $dac2b6a1df2fa5a7$export$2e2bcd8739ae039(obj, privateMap, value) {
    (0, $bc7d3ca89e2f7ddd$export$2e2bcd8739ae039)(obj, privateMap);
    privateMap.set(obj, value);
}



function $62c0a8139130adc4$export$2e2bcd8739ae039(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
        descriptor.value = value;
    }
}


function $a0e208bfb24626ef$export$2e2bcd8739ae039(receiver, privateMap, value) {
    var descriptor = (0, $5e4f6d966ada45af$export$2e2bcd8739ae039)(receiver, privateMap, "set");
    (0, $62c0a8139130adc4$export$2e2bcd8739ae039)(receiver, descriptor, value);
    return value;
}


function $cd98f832ecb6dec5$export$2e2bcd8739ae039(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}



function $1b84e8309d71ed2c$export$2e2bcd8739ae039(obj, privateSet) {
    (0, $bc7d3ca89e2f7ddd$export$2e2bcd8739ae039)(obj, privateSet);
    privateSet.add(obj);
}


var $0e936c10659c7ddb$var$_listeners = /*#__PURE__*/ new WeakMap(), $0e936c10659c7ddb$var$_state = /*#__PURE__*/ new WeakMap(), $0e936c10659c7ddb$var$_updaters = /*#__PURE__*/ new WeakMap(), $0e936c10659c7ddb$var$_runListeners = /*#__PURE__*/ new WeakSet(), $0e936c10659c7ddb$var$_makeUpdaters = /*#__PURE__*/ new WeakSet();
class $0e936c10659c7ddb$export$390f32400eaf98c9 {
    subscribe(listener) {
        (0, $abc94d246f1e600c$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_listeners).add(listener);
        return ()=>{
            (0, $abc94d246f1e600c$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_listeners).delete(listener);
        };
    }
    getState() {
        return Object.freeze((0, $abc94d246f1e600c$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_state));
    }
    get updaters() {
        return Object.freeze((0, $abc94d246f1e600c$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_updaters));
    }
    constructor(initialState, updatersMap){
        (0, $1b84e8309d71ed2c$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_runListeners);
        (0, $1b84e8309d71ed2c$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_makeUpdaters);
        (0, $dac2b6a1df2fa5a7$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_listeners, {
            writable: true,
            value: new Set()
        });
        (0, $dac2b6a1df2fa5a7$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_state, {
            writable: true,
            value: void 0
        });
        (0, $dac2b6a1df2fa5a7$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_updaters, {
            writable: true,
            value: void 0
        });
        (0, $a0e208bfb24626ef$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_state, Object.freeze(initialState));
        (0, $a0e208bfb24626ef$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_updaters, (0, $cd98f832ecb6dec5$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_makeUpdaters, $0e936c10659c7ddb$var$makeUpdaters).call(this, updatersMap));
    }
}
function $0e936c10659c7ddb$var$runListeners(snapshot) {
    (0, $abc94d246f1e600c$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_listeners).forEach((listener)=>listener(snapshot));
}
function $0e936c10659c7ddb$var$makeUpdaters(updatersMap) {
    return Object.fromEntries(Object.entries(updatersMap).map(([key, value])=>{
        return [
            key,
            (...args)=>{
                if (!value) return;
                const oldState = (0, $abc94d246f1e600c$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_state);
                const newState = value(oldState, ...args);
                if (oldState !== newState) {
                    const snapshot = (0, $a0e208bfb24626ef$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_state, Object.freeze(newState));
                    (0, $cd98f832ecb6dec5$export$2e2bcd8739ae039)(this, $0e936c10659c7ddb$var$_runListeners, $0e936c10659c7ddb$var$runListeners).call(this, snapshot);
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


function $8be15738f290fa57$var$isValidOperator(value) {
    return [
        "+",
        "-",
        "/",
        "*"
    ].includes(value);
}
const $8be15738f290fa57$var$initialState = {
    output: "0",
    operands: []
};
const $8be15738f290fa57$export$6f57813fe9f31bf9 = new (0, $0e936c10659c7ddb$export$390f32400eaf98c9)($8be15738f290fa57$var$initialState, {
    operator (state, value, operator) {
        (0, $56f8c318710251e7$export$f5708dca728d7177)($8be15738f290fa57$var$isValidOperator(operator), "invalid operator: " + operator);
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
            (0, $56f8c318710251e7$export$f5708dca728d7177)(left.operator, "operator is required");
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
});




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
const { updaters: $bc8f58a6aa3a7a47$var$updaters , getState: $bc8f58a6aa3a7a47$var$getState , subscribe: $bc8f58a6aa3a7a47$var$subscribe  } = (0, $8be15738f290fa57$export$6f57813fe9f31bf9);
$bc8f58a6aa3a7a47$var$update($bc8f58a6aa3a7a47$var$getState());
$bc8f58a6aa3a7a47$var$subscribe($bc8f58a6aa3a7a47$var$update);
function $bc8f58a6aa3a7a47$var$handleNumber(event) {
    const value = event.currentTarget.dataset.number;
    if (value === undefined) throw new Error("invariant error: button does not have a number value");
    $bc8f58a6aa3a7a47$var$updaters.input(value);
}
function $bc8f58a6aa3a7a47$var$handleOperator(event) {
    const operator = event.target.dataset.operator;
    if (operator === undefined) throw new Error("invariant error: button does not have an operator");
    const value = Number.parseFloat($bc8f58a6aa3a7a47$var$result.innerText);
    $bc8f58a6aa3a7a47$var$updaters.operator(value, operator);
}
function $bc8f58a6aa3a7a47$var$handleCalculate() {
    $bc8f58a6aa3a7a47$var$updaters.calculate();
}
function $bc8f58a6aa3a7a47$var$handleClear() {
    $bc8f58a6aa3a7a47$var$updaters.clear();
}
function $bc8f58a6aa3a7a47$var$handleDot() {
    $bc8f58a6aa3a7a47$var$updaters.dot();
}
function $bc8f58a6aa3a7a47$var$handleKeydown(event) {
    if (/^\d$/.test(event.key)) $bc8f58a6aa3a7a47$var$updaters.input(event.key);
    else if (/^(\+|-|\*|\/)$/.test(event.key)) {
        const value = Number.parseFloat($bc8f58a6aa3a7a47$var$result.innerText);
        $bc8f58a6aa3a7a47$var$updaters.operator(value, event.key);
    }
}

})();
//# sourceMappingURL=index.b7e42f1c.js.map
