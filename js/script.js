// Import necessary functions from calculations.js
import { add, subtract, multiply, divide, power, squareRoot, sum, cosine, sine, tangent, naturalLog, logarithm, exponent } from './calculations.js';

let inputField = document.getElementById('display');
let calcButton = document.getElementById("Calculate");
let clearDisplayButton = document.getElementById("ClearDisplay");
let historyBox = document.getElementById("HistoryList");
let solutionBox = document.getElementById("SolutionBox");

function calculateExpression(expression) {
    // Replace textual representation with function calls and constant values
    expression = expression.replace(/sin\(/g, 'sine(');
    expression = expression.replace(/cos\(/g, 'cosine(');
    expression = expression.replace(/tan\(/g, 'tangent(');
    expression = expression.replace(/ln\(/g, 'naturalLog(');
    expression = expression.replace(/log\(/g, 'logarithm(10,'); // Assuming base 10 for log
    expression = expression.replace(/\be\b/g, '2.71828'); // Replace 'e' with its constant value, ensuring it's a standalone 'e'

    // Evaluate the expression
    let result;
    try {
        result = eval(expression); 
    } catch (error) {
        result = "Invalid Expression";
    }
    return result;
}


calcButton.addEventListener('click', function () {
    let finalInput = inputField.value;
    finalInput = finalInput.replace("²", "**2");
    finalInput = finalInput.replace("³", "**3");
    finalInput = finalInput.replace("ⁿ", "**"); // Assuming user enters the power after ⁿ
    finalInput = finalInput.replace("√", "squareRoot"); // Using squareRoot function for root calculations

    // Add more replacements as necessary based on the symbols used in your UI

    if (finalInput !== "") {
        let result = calculateExpression(finalInput);
        solutionBox.textContent = result;
        solutionBox.classList.remove('hidden');

        let newListElement = document.createElement('li');
        newListElement.classList.add("history");
        let spanElem = document.createElement('span');
        spanElem.classList.add('finalInput');
        spanElem.textContent = finalInput + " = " + result;
        newListElement.appendChild(spanElem);
        historyBox.insertBefore(newListElement, historyBox.firstChild);

        inputField.value = '';
    }
});

clearDisplayButton.addEventListener("click", function () {
    inputField.value = '';
    solutionBox.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', function () {
    let funcButtons = document.querySelectorAll('button[name]');
    inputField.focus();

    inputField.addEventListener('input', function () {
        var sanitizedValue = inputField.value.replace(/[^-0-9xy=+*/()tansicolgeΣ²³ⁿ√]/g, '');
        inputField.value = sanitizedValue;
    });

    inputField.addEventListener('keydown', function (event) {
        if (event.key === "Escape" || event.keyCode === 27) {
            inputField.value = '';
        }
    });

    funcButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let graphFunction = button.getAttribute("name");
            insertCharacterNextToCursor(graphFunction);
        });
    });

    function insertCharacterNextToCursor(char) {
        let cursorPosition = inputField.selectionStart;
        let inputValue = inputField.value;
        let newValue = inputValue.slice(0, cursorPosition) + char + inputValue.slice(cursorPosition);
        inputField.value = newValue;
        inputField.setSelectionRange(cursorPosition + char.length, cursorPosition + char.length);
    }
});
