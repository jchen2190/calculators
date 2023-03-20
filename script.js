const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-clear-all]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }
    deleteNum() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return; 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    // click on ÷ / * / + / -
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let comp;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                comp = prev + current;
                break;
            case '-':
                comp = prev - current;
                break;
            case '*':
                comp = prev * current;
                break;
            case '÷':
                comp = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = comp;
        this.operation = undefined;
        this.previousOperand = '';
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
              `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
    getDisplayNumber(num) {
        const stringNumber = num.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButton.forEach(button => { 
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
})
equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
clearAllButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    calculator.deleteNum();
    calculator.updateDisplay();
})

document.querySelector('.calculator-grid').addEventListener('keydown', respondToKeyPress)

function respondToKeyPress(event) {
    let numKey = /[0-9]/g
    let operKey = /[+\-%]/g

    if (event.key.match(numKey)) {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key.match(operKey)) {
        event.preventDefault();
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    }
    if (event.key === '=' || event.key === 'Enter') {
        event.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        calculator.deleteNum();
        calculator.updateDisplay();
    }
}

// --- restaurant bill calculator ---
let food = document.getElementById('food');
let bev = document.getElementById('bev');
let tipMenu = document.getElementById('tip-menu');
let taxMenu = document.getElementById('tax-menu');
let calcBtn = document.getElementById('calc-btn');
let response = document.getElementById('response');

calcBtn.addEventListener('click', calcBill);

function calcBill(event) {
    event.preventDefault();
    let foodTotal = Number(food.value);
    let bevTotal = Number(bev.value);
    let tipPct = Number(tipMenu.value);
    let taxPct = Number(taxMenu.value);
    let subTotal = foodTotal + bevTotal;
    let taxTotal = subTotal * taxPct / 100;
    let tipTotal = subTotal * tipPct / 100;
    let total = subTotal + taxTotal + tipTotal;

    tipTotal = tipTotal.toFixed(2);
    taxTotal = taxTotal.toFixed(2);
    total = total.toFixed(2);

    let d = new Date();
    let hr = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();

    if(min < 10) min = '0' + min;
    if(sec < 10) sec = '0' + sec;
    let timeIs =`${hr}:${min}:${sec}`;
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let dateIs = `${month+1}/${date}/${year}`;

    let bill = `
    *** THIS CAFE ***
    <br>*** GUEST CHECK ***
    <br>Date: ${dateIs}
    <br>Time: ${timeIs}
    <br>
    <br>Food: $${foodTotal}
    <br>Beverage: $${bevTotal}
    <br>Sub-Total: $${subTotal}
    <br>Tax: ${taxPct} %
    <br>Tax: $${taxTotal}
    <br>Tip: ${tipPct} %
    <br>Tip: $${tipTotal}
    <br>
    <br>*** Please Pay ***
    <br>TOTAL: $${total}
    <br>
    <br>*** THANK YOU ***`;
    response.innerHTML = bill;
}

// --- Apartment Rent Estimator ---
const rentBtn = document.getElementById('rent-btn');
rentBtn.addEventListener('click', calculateRent);
const feedbackTag = document.getElementById('feedback');

function calculateRent(event) {
    event.preventDefault();
    let bdrms = Number(document.getElementById('bdrms').value);
    let baths = Number(document.getElementById('baths').value);
    let rent = bdrms + baths;

    let doormanCB = document.getElementById('doorman');
    let parkingCB = document.getElementById('parking');
    let viewCB = document.getElementById('view');
    let gymCB = document.getElementById('gym');

    if(doormanCB.checked) {
        rent += rent * Number(doormanCB.value); // +10%
    }
    if(viewCB.checked) {
        rent += rent * Number(viewCB.value); // +25%
    }
    if(parkingCB.checked) {
        rent += Number(parkingCB.value); // +350
    }
    if(gymCB.checked) {
        rent += Number(gymCB.value); // +100
    }
    feedbackTag.textContent = `Your estimated rent is $${Math.round(rent)}!`;
}