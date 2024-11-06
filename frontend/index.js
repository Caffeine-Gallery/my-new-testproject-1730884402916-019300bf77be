import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let currentValue = '';
let operator = '';
let waitingForSecondOperand = false;

window.appendToDisplay = (value) => {
    if (waitingForSecondOperand) {
        display.value = value;
        waitingForSecondOperand = false;
    } else {
        display.value += value;
    }
    currentValue = display.value;
};

window.setOperation = (op) => {
    if (currentValue !== '') {
        operator = op;
        waitingForSecondOperand = true;
    }
};

window.clearDisplay = () => {
    display.value = '';
    currentValue = '';
    operator = '';
    waitingForSecondOperand = false;
};

window.calculate = async () => {
    if (currentValue !== '' && operator !== '') {
        const parts = display.value.split(operator);
        if (parts.length === 2) {
            const num1 = parseFloat(parts[0]);
            const num2 = parseFloat(parts[1]);
            
            document.getElementById('loading').style.display = 'block';
            
            try {
                let result;
                switch (operator) {
                    case '+':
                        result = await backend.add(num1, num2);
                        break;
                    case '-':
                        result = await backend.subtract(num1, num2);
                        break;
                    case '*':
                        result = await backend.multiply(num1, num2);
                        break;
                    case '/':
                        result = await backend.divide(num1, num2);
                        break;
                }
                display.value = result.toString();
                currentValue = display.value;
                operator = '';
            } catch (error) {
                display.value = 'Error';
            } finally {
                document.getElementById('loading').style.display = 'none';
            }
        }
    }
};
