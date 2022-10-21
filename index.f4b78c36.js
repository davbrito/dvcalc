function $33d0def40a470f8c$export$2e2bcd8739ae039(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}


function $90250f0c1138d8e5$export$2e2bcd8739ae039(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}


function $f60fad5b20b234d6$export$2e2bcd8739ae039(receiver, privateMap) {
    var descriptor = (0, $33d0def40a470f8c$export$2e2bcd8739ae039)(receiver, privateMap, "get");
    return (0, $90250f0c1138d8e5$export$2e2bcd8739ae039)(receiver, descriptor);
}


function $45afc2b5f744e104$export$2e2bcd8739ae039(obj, privateCollection) {
    if (privateCollection.has(obj)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}


function $c893c3322a57dec7$export$2e2bcd8739ae039(obj, privateMap, value) {
    (0, $45afc2b5f744e104$export$2e2bcd8739ae039)(obj, privateMap);
    privateMap.set(obj, value);
}



function $f0d172d14877e1f2$export$2e2bcd8739ae039(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
        descriptor.value = value;
    }
}


function $59f8bf8018fb608d$export$2e2bcd8739ae039(receiver, privateMap, value) {
    var descriptor = (0, $33d0def40a470f8c$export$2e2bcd8739ae039)(receiver, privateMap, "set");
    (0, $f0d172d14877e1f2$export$2e2bcd8739ae039)(receiver, descriptor, value);
    return value;
}


function $7f5d6e7333d37572$export$2e2bcd8739ae039(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}



function $d51767bdcffbe82b$export$2e2bcd8739ae039(obj, privateSet) {
    (0, $45afc2b5f744e104$export$2e2bcd8739ae039)(obj, privateSet);
    privateSet.add(obj);
}


var $20aab3d10f5eaa82$var$_listeners = /*#__PURE__*/ new WeakMap(), $20aab3d10f5eaa82$var$_state = /*#__PURE__*/ new WeakMap(), $20aab3d10f5eaa82$var$_updaters = /*#__PURE__*/ new WeakMap(), $20aab3d10f5eaa82$var$_runListeners = /*#__PURE__*/ new WeakSet(), $20aab3d10f5eaa82$var$_makeUpdaters = /*#__PURE__*/ new WeakSet();
class $20aab3d10f5eaa82$export$390f32400eaf98c9 {
    subscribe(listener) {
        (0, $f60fad5b20b234d6$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_listeners).add(listener);
        return ()=>{
            (0, $f60fad5b20b234d6$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_listeners).delete(listener);
        };
    }
    getState() {
        return Object.freeze((0, $f60fad5b20b234d6$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_state));
    }
    get updaters() {
        return Object.freeze((0, $f60fad5b20b234d6$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_updaters));
    }
    constructor(initialState, updatersMap){
        (0, $d51767bdcffbe82b$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_runListeners);
        (0, $d51767bdcffbe82b$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_makeUpdaters);
        (0, $c893c3322a57dec7$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_listeners, {
            writable: true,
            value: new Set()
        });
        (0, $c893c3322a57dec7$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_state, {
            writable: true,
            value: void 0
        });
        (0, $c893c3322a57dec7$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_updaters, {
            writable: true,
            value: void 0
        });
        (0, $59f8bf8018fb608d$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_state, Object.freeze(initialState));
        (0, $59f8bf8018fb608d$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_updaters, (0, $7f5d6e7333d37572$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_makeUpdaters, $20aab3d10f5eaa82$var$makeUpdaters).call(this, updatersMap));
    }
}
function $20aab3d10f5eaa82$var$runListeners(snapshot) {
    (0, $f60fad5b20b234d6$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_listeners).forEach((listener)=>listener(snapshot));
}
function $20aab3d10f5eaa82$var$makeUpdaters(updatersMap) {
    return Object.fromEntries(Object.entries(updatersMap).map(([key, value])=>{
        return [
            key,
            (...args)=>{
                if (!value) return;
                const oldState = (0, $f60fad5b20b234d6$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_state);
                const newState = value(oldState, ...args);
                if (oldState !== newState) {
                    const snapshot = (0, $59f8bf8018fb608d$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_state, Object.freeze(newState));
                    (0, $7f5d6e7333d37572$export$2e2bcd8739ae039)(this, $20aab3d10f5eaa82$var$_runListeners, $20aab3d10f5eaa82$var$runListeners).call(this, snapshot);
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


function $03a9e6848100b442$var$isValidOperator(value) {
    return [
        "+",
        "-",
        "/",
        "*"
    ].includes(value);
}
const $03a9e6848100b442$var$initialState = {
    output: "0",
    operands: []
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
const { updaters: $d69556644bb6dc7a$var$updaters , getState: $d69556644bb6dc7a$var$getState , subscribe: $d69556644bb6dc7a$var$subscribe  } = (0, $03a9e6848100b442$export$6f57813fe9f31bf9);
$d69556644bb6dc7a$var$update($d69556644bb6dc7a$var$getState());
$d69556644bb6dc7a$var$subscribe($d69556644bb6dc7a$var$update);
function $d69556644bb6dc7a$var$handleNumber(event) {
    const value = event.currentTarget.dataset.number;
    if (value === undefined) throw new Error("invariant error: button does not have a number value");
    $d69556644bb6dc7a$var$updaters.input(value);
}
function $d69556644bb6dc7a$var$handleOperator(event) {
    const operator = event.target.dataset.operator;
    if (operator === undefined) throw new Error("invariant error: button does not have an operator");
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
    }
}


//# sourceMappingURL=index.f4b78c36.js.map
