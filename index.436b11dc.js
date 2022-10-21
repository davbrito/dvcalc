
const $b9dff960cd1c7100$var$numbers = document.querySelectorAll("button[data-number]");
const $b9dff960cd1c7100$var$operators = document.querySelectorAll("button[data-operator]");
const $b9dff960cd1c7100$var$calculate = document.querySelector("button[data-calculate]");
const $b9dff960cd1c7100$var$clear = document.querySelector("button[data-clear]");
const $b9dff960cd1c7100$var$dot = document.querySelector("button[data-dot]");
const $b9dff960cd1c7100$var$output = document.querySelector("output");
const $b9dff960cd1c7100$var$state = {
    output: "0",
    operands: []
};
$b9dff960cd1c7100$var$calculate.addEventListener("click", $b9dff960cd1c7100$var$handleCalculate);
$b9dff960cd1c7100$var$clear.addEventListener("click", $b9dff960cd1c7100$var$handleClear);
$b9dff960cd1c7100$var$dot.addEventListener("click", $b9dff960cd1c7100$var$handleDot);
$b9dff960cd1c7100$var$numbers.forEach((button)=>{
    button.addEventListener("click", $b9dff960cd1c7100$var$handleNumber);
});
$b9dff960cd1c7100$var$operators.forEach((button)=>{
    button.addEventListener("click", $b9dff960cd1c7100$var$handleOperator);
});
function $b9dff960cd1c7100$var$updateOutput() {
    $b9dff960cd1c7100$var$output.innerText = $b9dff960cd1c7100$var$state.output;
}
function $b9dff960cd1c7100$var$handleNumber(event) {
    const value = event.target.dataset.number;
    if ($b9dff960cd1c7100$var$state.output === "0") $b9dff960cd1c7100$var$state.output = value;
    else $b9dff960cd1c7100$var$state.output += value;
    $b9dff960cd1c7100$var$updateOutput();
}
function $b9dff960cd1c7100$var$handleOperator(event) {
    const operator = event.target.dataset.operator;
    $b9dff960cd1c7100$var$state.operands.push({
        value: Number.parseFloat($b9dff960cd1c7100$var$output.innerText),
        operator: operator
    });
    $b9dff960cd1c7100$var$state.output = "0";
    $b9dff960cd1c7100$var$updateOutput();
}
function $b9dff960cd1c7100$var$handleCalculate() {
    $b9dff960cd1c7100$var$state.operands.push({
        value: Number.parseFloat($b9dff960cd1c7100$var$state.output),
        operator: null
    });
    const result = $b9dff960cd1c7100$var$state.operands.reduce((left, right)=>{
        return {
            value: $b9dff960cd1c7100$var$operate(left.operator, left.value, right.value),
            operator: right.operator
        };
    });
    $b9dff960cd1c7100$var$state.output = result.value;
    $b9dff960cd1c7100$var$state.operands = [];
    $b9dff960cd1c7100$var$updateOutput();
}
function $b9dff960cd1c7100$var$handleClear() {
    $b9dff960cd1c7100$var$state.output = "0";
    $b9dff960cd1c7100$var$state.operands = [];
    $b9dff960cd1c7100$var$updateOutput();
}
function $b9dff960cd1c7100$var$handleDot() {
    if (!$b9dff960cd1c7100$var$state.output.includes(".")) $b9dff960cd1c7100$var$state.output += ".";
    $b9dff960cd1c7100$var$updateOutput();
}
function $b9dff960cd1c7100$var$operate(operator, leftOperand, rightOperand) {
    return ({
        "+": (a, b)=>a + b,
        "-": (a, b)=>a - b,
        "*": (a, b)=>a * b,
        "/": (a, b)=>a / b
    })[operator](leftOperand, rightOperand);
}


//# sourceMappingURL=index.436b11dc.js.map
