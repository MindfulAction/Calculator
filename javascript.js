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

let operate = (num1, operator, num2) => {
    if (operator == "+") {return add(num1, num2)};
    if (operator == "-") {return subtract(num1, num2)};
    if (operator == "*") {return multiply(num1, num2)};
    if (operator == "/") {return divide(num1, num2)};
}

let ifNumberClicked = (event) => {
    //Change the display text content to match the value of the button pressed
    display.textContent = `${event.target.textContent}`;
    if (operatorClicked != undefined) {
        //Update the currentNumberPressed to equal the textContent of the button pressed parsed as a number
        currentNumberClicked = Number(event.target.textContent)
        operate(lastNumberClicked, operatorClicked, currentNumberClicked);
        display.textContent = answer;
    } else {
        //Update the lastNumberPressed to equal the textContent of the button pressed parsed as a number
        lastNumberClicked = Number(event.target.textContent)
    }

}

let ifOperatorClicked = (event) => {
    operatorClicked = event.target.id;
    display.textContent = operatorClicked;
}

//////////////////////////////////////////////////////////
//Create var for buttonPressed that will store the last number that was pressed
let lastNumberClicked;
let operatorClicked;
let currentNumberClicked;
let answer;
//Create var display that selects the calculator display
let display = document.querySelector("#display");

let numButtons = document.querySelectorAll(".num");
numButtons.forEach(button => {
    button.addEventListener("click", ifNumberClicked)
})

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", ifOperatorClicked)
})