// Import necessary functions from calculations.js
import { add, subtract, multiply, divide, power, squareRoot, sum, cosine, sine, tangent, naturalLog, logarithm, exponent } from './calculations.js';

let inputField = document.getElementById('display');
let calcButton = document.getElementById("Calculate");
let clearDisplayButton = document.getElementById("ClearDisplay");
let historyBox = document.getElementById("HistoryList");
let solutionBox = document.getElementById("SolutionBox");

// Function to parse and calculate the expression
function calculateExpression(expression) {
    // Simple parsing logic - this is a placeholder for a more complex parser
    // You can replace this with a more advanced expression evaluation logic
    let result;
    try {
        result = eval(expression); // Note: using eval is generally not recommended due to security risks
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
