//NOTE: Need to clean code (add helper functions, make easier to read, etc.)

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

let updateNumbers = () => {
    determineDisplay();
    //If an operator has been clicked previously then we need to update currentNumber
    if (operator != undefined) {
        //Update the currentNumberPressed to equal the textContent of the button pressed parsed as a number
        currentNumber = Number(display.textContent);
        //If answer has a value, then update lastNumber to equal answer (in case an operation has already been executed)
        if (answer != undefined) {
            lastNumber = answer;
        }
    } else {
        //Update the lastNumberPressed to equal the textContent of the button pressed parsed as a number
        lastNumber = Number(display.textContent)
    } 
    //If an operator was highlighted before the updateNumbers function was called, then we need to remove the highlight from that operator button
    if (operatorHighlighted != undefined) {
        removeHighlightFromOperatorButton();
    }
    //Set lastInput to be equal to "number"
    lastInput = "number";

}

let updateOperator = (event) => {
    determineTargetContent();
    //If operator is not undefined, then check value of lastInput
    if (operator != undefined) {
        //If lastInput == "operator", then remove highlight from previous operator element
        if (lastInput == "operator") {
            //Remove highlight from previous operator
            operatorHighlighted.classList.toggle("highlightOperator");
        } else {
            clickedEquals();
        }
    }
    //Set value of operator equal to the value of targetContent
    operator = targetContent;
    if (event instanceof PointerEvent) {
        //Add operator class to the operator button clicked so it is highlighted on page
        event.target.classList.add("highlightOperator"); 
        operatorHighlighted = event.target;
    } else {
        //Find the operator button whose text content matches the event.id (stored in targetContent)
            //Iterate through operatorButtons nl to find match
        let operatorButtonPressed = Array.from(operatorButtons).find(button => button.textContent == targetContent);
        operatorButtonPressed.classList.add("highlightOperator");
        operatorHighlighted = operatorButtonPressed;
    }
    
    //Store the operator button that is highlighted in var operatorHighlighted
    
    //Update lastNumber to equal the current displayed number
    lastNumber = Number(display.textContent);
    lastInput = "operator";
}

let clickedEquals = () => {
    //Set answer equal to the value returned from the operate function
    answer = operate(lastNumber, operator, currentNumber);
    if (answer != undefined) {
        //Update display to show the answer
        display.textContent = answer;
    }
}

let removeHighlightFromOperatorButton = () => {
    operatorHighlighted.classList.toggle("highlightOperator");
    operatorHighlighted = undefined;
}

let clearMemory = () => {
    lastNumber = 0;
    currentNumber = 0;
    answer = 0;
    display.textContent = "0";
    if (Array.from(document.querySelectorAll(".operator")).map(button => button.classList).some(button => button.toString().includes("highlightOperator"))) {
        removeHighlightFromOperatorButton()
    }
}

deleteLastNumberInput = () => {
    
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    lastNumber = Number(display.textContent);
    
    if (display.textContent == "") {
        display.textContent = 0;
    }    
}

let determineTargetContent = () => {
   console.log(event)

    if (event instanceof KeyboardEvent) {
        targetContent = event.key;
        console.log("KE yes")
    } else {
        targetContent = event.target.textContent;
        console.log("Pointer yes")
    }
    console.log(targetContent)
    console.log(event.key)
}

let determineDisplay = () => {
    determineTargetContent();

    if (display.textContent == 0) {
        display.textContent = `${targetContent}`;
    } else if (lastInput === "number") {
        display.textContent += `${targetContent}`;
    } else {
        display.textContent = `${targetContent}`;
    }
}

let inputDecimal = () => {
    if (!display.textContent.includes(".")) {
        determineDisplay();
    }
}

let determineButtonType = (event) => {
    console.log(event)
    
    if (event.key == 0 || event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || 
        event.key == 7 || event.key == 8 || event.key == 9) {
        updateNumbers();
    } else if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/") {
        updateOperator();
    } else if (event.key == "Enter" || event.key == "=") {
        clickedEquals();
    } else if (event.key == ".") {
        inputDecimal();
    } else if (event.key == "Backspace") {
        deleteLastNumberInput();
    } else if (event.key == "Delete") {
        clearMemory();
    }
}
    


//////////////////////////////////////////////////////////
let targetContent;
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
//Create var lastInput and init to undef 
let lastInput;
//Create an undefined array digits that will be used to keep track of what number to display 
let digits = [];
//Create var display that selects the calculator display -> we will use this to update the display to show the last button pressed or the answer to the operation
let display = document.querySelector("#display");

//Create nodelist for number buttons and add event listener to each
let numButtons = document.querySelectorAll(".num");
numButtons.forEach(button => {
    button.addEventListener("click", updateNumbers)
})

//Create nodelist for operator buttons and add event listener to each
let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", updateOperator)
})

//Create nodelist for equals button and add event listener 
let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", clickedEquals);

//Create var that stores the "CLEAR" button element
let clear = document.querySelector("#clear");
clear.addEventListener("click", clearMemory)

//Create var that stores "Del" button element
let del = document.querySelector("#delete");
del.addEventListener("click", deleteLastNumberInput)

//Create var that stores "decimal" button element
let decimal = document.querySelector("#decimal");
decimal.addEventListener("click", inputDecimal)

//Create Nodelist of all buttons
let buttons = document.querySelectorAll("button");

window.addEventListener("keydown", determineButtonType)