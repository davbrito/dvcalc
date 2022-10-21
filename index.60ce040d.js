(function () {

const $933923e164b0c663$var$numbers = document.querySelectorAll("button[data-number]");
const $933923e164b0c663$var$operators = document.querySelectorAll("button[data-operator]");
const $933923e164b0c663$var$calculate = document.querySelector("button[data-calculate]");
const $933923e164b0c663$var$clear = document.querySelector("button[data-clear]");
const $933923e164b0c663$var$dot = document.querySelector("button[data-dot]");
const $933923e164b0c663$var$output = document.querySelector("output");
const $933923e164b0c663$var$state = {
    output: "0",
    operands: []
};
$933923e164b0c663$var$calculate.addEventListener("click", $933923e164b0c663$var$handleCalculate);
$933923e164b0c663$var$clear.addEventListener("click", $933923e164b0c663$var$handleClear);
$933923e164b0c663$var$dot.addEventListener("click", $933923e164b0c663$var$handleDot);
$933923e164b0c663$var$numbers.forEach((button)=>{
    button.addEventListener("click", $933923e164b0c663$var$handleNumber);
});
$933923e164b0c663$var$operators.forEach((button)=>{
    button.addEventListener("click", $933923e164b0c663$var$handleOperator);
});
function $933923e164b0c663$var$updateOutput() {
    $933923e164b0c663$var$output.innerText = $933923e164b0c663$var$state.output;
}
function $933923e164b0c663$var$handleNumber(event) {
    const value = event.target.dataset.number;
    if ($933923e164b0c663$var$state.output === "0") $933923e164b0c663$var$state.output = value;
    else $933923e164b0c663$var$state.output += value;
    $933923e164b0c663$var$updateOutput();
}
function $933923e164b0c663$var$handleOperator(event) {
    const operator = event.target.dataset.operator;
    $933923e164b0c663$var$state.operands.push({
        value: Number.parseFloat($933923e164b0c663$var$output.innerText),
        operator: operator
    });
    $933923e164b0c663$var$state.output = "0";
    $933923e164b0c663$var$updateOutput();
}
function $933923e164b0c663$var$handleCalculate() {
    $933923e164b0c663$var$state.operands.push({
        value: Number.parseFloat($933923e164b0c663$var$state.output),
        operator: null
    });
    const result = $933923e164b0c663$var$state.operands.reduce((left, right)=>{
        return {
            value: $933923e164b0c663$var$operate(left.operator, left.value, right.value),
            operator: right.operator
        };
    });
    $933923e164b0c663$var$state.output = result.value;
    $933923e164b0c663$var$state.operands = [];
    $933923e164b0c663$var$updateOutput();
}
function $933923e164b0c663$var$handleClear() {
    $933923e164b0c663$var$state.output = "0";
    $933923e164b0c663$var$state.operands = [];
    $933923e164b0c663$var$updateOutput();
}
function $933923e164b0c663$var$handleDot() {
    if (!$933923e164b0c663$var$state.output.includes(".")) $933923e164b0c663$var$state.output += ".";
    $933923e164b0c663$var$updateOutput();
}
function $933923e164b0c663$var$operate(operator, leftOperand, rightOperand) {
    return ({
        "+": (a, b)=>a + b,
        "-": (a, b)=>a - b,
        "*": (a, b)=>a * b,
        "/": (a, b)=>a / b
    })[operator](leftOperand, rightOperand);
}

})();
//# sourceMappingURL=index.60ce040d.js.map
