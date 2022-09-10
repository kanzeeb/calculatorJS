class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }

clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
}

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
}

addNumber(number) {
    if(this.currentOperand.includes('.') && number === '.') return 
    this.currentOperand = this.currentOperand.toString() + number.toString();
}

operationTest(operation) {
    if(this.currentOperand === '') return;
    if(this.previousOperand !== '') {
        this.resolve();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
}

resolve() {
    let math 
    const prevNumber = parseFloat(this.previousOperand);
    const currentNumber = parseFloat(this.currentOperand);
    if(isNaN(prevNumber) || isNaN(currentNumber)) return;
    if(this.operation == '+')
        math = (prevNumber + currentNumber).toFixed(4)
    else if(this.operation == '-')
        math = (prevNumber - currentNumber).toFixed(4) 
    else if(this.operation == '*')
        math = (prevNumber * currentNumber).toFixed(4)
    else if(this.operation == '÷')
        math = (prevNumber / currentNumber).toFixed(4)
    else return

    this.currentOperand = math;
    this.operation = undefined;
    this.previousOperand = '';
}

currentDisplay() {    
    this.currentTextElement.innerText = this.currentOperand; 
    if(this.operation != null) {
        this.previousTextElement.innerText = `${this.previousOperand} ${this.operation}`
    }

}
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const resultButton = document.querySelector('[data-result]');
const dataClearButton = document.querySelector('[data-clear]');
const dataDeleteButton = document.querySelector('[data-delete]');
const previousTextElement = document.querySelector('[data-previous-operand]');
const currentTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.currentDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationTest(button.innerText);
        calculator.currentDisplay();
    })
})

resultButton.addEventListener('click', button => {
    calculator.resolve();
    calculator.currentDisplay();
})

dataDeleteButton.addEventListener('click' , button => {
    calculator.delete();
    calculator.currentDisplay();
})

dataClearButton.addEventListener('click' , button => {
    calculator.clear();
    calculator.currentDisplay();
})