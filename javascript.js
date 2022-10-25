//Need to fix multiple button presses and clean code

let add = (num1, num2) => {
    return answer = num1 + num2;
}

let subtract = (num1, num2) => {
    return answer = num1 - num2;
}

let multiply = (num1, num2) => {
    return answer = num1 * num2;
}

let divide = (num1, num2) => {
    return answer = num1 / num2;
}

let operate = (num1, operation, num2) => {
    if (operation == "+") {return add(num1, num2)};
    if (operation == "-") {return subtract(num1, num2)};
    if (operation == "*") {return multiply(num1, num2)};
    if (operation == "/") {return divide(num1, num2)};
}

//Each time a number is pressed add it to the display
//When an operator is pressed store the value of the display as either lastNumber or currentNumber
//When a number is pressed immediately after an operator, reset the display and add the number to the display

let updateNumbers = (event) => {
    //************/ if (lastButtonPressed === "number") {
    //     //Change the display text content to equal a concatenated string of the lastNumber clicked and this number clicked
    //     display.textContent = lastNumber + `${event.target.textContent}`;
    // } else {
    //     //Change the display text content to match the value of the button pressed
    //     display.textContent = `${event.target.textContent}`;
    //**************/ }
    if (display.textContent == 0) {
        display.textContent = `${event.target.textContent}`;
    }
    if (lastButtonPressed === "number") {
        display.textContent += `${event.target.textContent}`;
    }

    //If an operator has been clicked previously then we need to update currentNumber
    if (operator != undefined) {
        //Update the currentNumberPressed to equal the textContent of the button pressed parsed as a number
        currentNumber = Number(event.target.textContent)
        //If answer has a value, then update lastNumber to equal answer (in case an operation has already been executed)
        if (answer != undefined) {
            lastNumber = answer;
        }
    } else {
        //Update the lastNumberPressed to equal the textContent of the button pressed parsed as a number
        lastNumber = Number(event.target.textContent)
    } 
    //If an operator was highlighted before the updateNumbers function was called, then we need to remove the highlight from that operator button
    if (operatorHighlighted != undefined) {
        removeHighlightFromOperatorButton();
    }
    //Set lastButtonPressed to be equal to "number"
    lastButtonPressed = "number";

}

let updateOperator = (event) => {
    //If operator is not undefined, then we call clickedEquals to act as if the equals button was clicked
    if (operator != undefined) {
        clickedEquals();
    }
    //Set value of operator equal to the id of the event target 
    operator = event.target.id;
    //Add operator class to the operator button clicked so it is highlighted on page
    event.target.classList.add("highlightOperator"); 
    //Store the operator button that is highlighted in var operatorHighlighted
    operatorHighlighted = event.target;
    //Update lastNumber to equal the current displayed number
    lastNumber = Number(display.textContent);
    lastButtonPressed = "operator";
}

let clickedEquals = () => {
    //Set answer equal to the value returned from the operate function
    answer = operate(lastNumber, operator, currentNumber);
    //Update display to show the answer
    display.textContent = answer;
}

let removeHighlightFromOperatorButton = () => {
    operatorHighlighted.classList.toggle("highlightOperator");
}

//////////////////////////////////////////////////////////
//Create var for lastNumber that will store the last number that was pressed and initialize to 0
let lastNumber = 0;
//Create var operator and init to undef -> this will be used to keep track of what function the operate function will call
let operator;
//Create var currentNumber and init to undef -> this will be passed as an arguement to the function that the operate function calls
let currentNumber;
//Create var answer and init to undef -> this will be passed as an arguement to the function that the operate function calls if the operate function has already
    //been called in this sequence
let answer;
//Create var operatorHighlighted and init to undef -> will be used to keep track of which operator button should be highlighted on page
let operatorHighlighted;
//Create var lastButtonPressed and init to undef 
let lastButtonPressed;
//Create an undefined array digits that will be used to keep track of what number to display 
let digits = [];
//Create var display that selects the calculator display -> we will use this to update the display to show the last button pressed or the answer to the operation
let display = document.querySelector("#display");

let numButtons = document.querySelectorAll(".num");
numButtons.forEach(button => {
    button.addEventListener("click", updateNumbers)
})

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", updateOperator)
})

let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", clickedEquals);