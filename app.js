/*

Your primary goal is to implement the user stories listed above.
The Minimum Viable Product (MVP) for this lab focuses on basic functionality and does not
cover edge cases, such as pressing an operator button multiple times.
You are encouraged to tackle these advanced cases once you have achieved the MVP.

 * As a user, I want to be able to select numbers so that I can perform operations with them.
 * As a user, I want to be able to add two numbers together.
 * As a user, I want to be able to subtract one number from another.
 * As a user, I want to be able to multiply two numbers together.
 * As a user, I want to be able to divide one number by another.`
 * As a user, I want to be able to see the output of the mathematical operation.
 * As a user, I want to be able to clear all operations and start from 0.

Start with the basics: Begin by implementing simple operations like 1 + 1 or 4 - 2.

Advance to more complex operations: Once you're comfortable,
try handling operations with multi-digit numbers, like 15 - 10 or 23 + 57.

Understand button roles: Remember, each calculator button serves a specific purpose.
Differentiate between number buttons and operator buttons.
Consider how the event handling might vary between them.
*/

/*-------------------------------- Constants --------------------------------*/

const calculator = document.querySelector('#calculator');

/*-------------------------------- Variables --------------------------------*/

let defaultNum = true; // used to determine if user has entered a number or is at zero
let currentNumber = 0;
let calObject = {
    numbers: [],
    operation: [],
};

/*------------------------ Cached Element References ------------------------*/

let displayEL = document.querySelector('.display');
displayOutput();

/*----------------------------- Event Listeners -----------------------------*/

calculator.addEventListener('click', (event) => {
    // shorthand event target
    const target = event.target;
    // check if a number has been clicked
    if (target.classList.contains('number')) {
        // select and display number
        selectNumber(target.innerText);
        displayOutput(target.innerText);
    } else {
        // check if user has selected any value perviously
        if (currentNumber != 0 || calObject.length != 0) {
            switch (target.innerText) {
                // perform the relative operation
                case '*':
                    amendOperation(currentNumber, "*");
                    break;
                case '/':
                    amendOperation(currentNumber, "/");
                    break;
                case '+':
                    amendOperation(currentNumber, "+");
                    break;
                case '-':
                    amendOperation(currentNumber, "-");
                    break;
                case '=':
                    calculateValues();
                    break;
                case 'C':
                    clearCalculator();
                    break;
            }
        }
    }
});

/*-------------------------------- Functions --------------------------------*/

// function to display output to calculator
function displayOutput() {
    // if no values have been added to the array before, display current number
    if (calObject.numbers.length === 0) {
        displayEL.textContent = currentNumber;
    } else {
        // check if user has selected any number
        if (currentNumber != 0 && calObject.length != 0) {
            displayEL.textContent = ""; // reset text to show current values

            // loop through all numbers selected and get the operation selected with those numbers
            // this makes sure that the content is displayed in the order the user has added the values in
            for (let i = 0; i < calObject.numbers.length; i++) {
                // add as string to avoid 
                displayEL.textContent += `${calObject.numbers[i]}${calObject.operation[i]}`
            }
            // add "0" to the display if user has recently clicked on an operation, otherwise add currentNumber
            displayEL.textContent += defaultNum ? "0" : currentNumber;
        }
    }
}

// function to select and store the numbers for calculation
function selectNumber(eventVal) {
    if (currentNumber != 0) {
        currentNumber += eventVal.toString();
    } else {
        // change defaultNum to false when selecting a number for the first time
        defaultNum = false;
        currentNumber = eventVal.toString();
    }
}

// function to store number and operation selected by the user
function amendOperation(num, op) {
    if (num != 0) {
        defaultNum = true; // reset defaultNum to display the correct value
        calObject.operation.push(op);
        calObject.numbers.push(num);
        displayOutput();
        currentNumber = 0;
    }
}

// function to calculate the numbers selected
function calculateValues() {
    // variables
    let result = 0;
    let calString = "";

    // add the number with the operation selected
    calObject.numbers.forEach((num, index) => {
        calString += `${num}${calObject.operation[index]}`;
    })

    calString += currentNumber;

    /*
        using eval function to calculate results
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
    */

    result = eval(calString);

    // clear calculator to reset all values and then assign the result of the calculation
    clearCalculator();
    currentNumber = result;
    displayOutput();
}

// function to clear calculator
function clearCalculator() {
    displayEL.textContent = "0";
    defaultNum = true;
    currentNumber = 0;
    calObject.numbers = [];
    calObject.operation = [];
    displayOutput();
}