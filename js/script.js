import { add, subtract, multiply, divide, power,
     squareRoot, sum, cosine, sine, tangent, naturalLog, logarithm, exponent,
     solveLinearEquation, solveQuadraticEquation, solveCubicEquation } from './calculations.js';

function isLinearEquation(input) {
        // Basic regex for linear equations: ax + b = 0
    const linearPattern = /^[+-]?(\d+)?x\s*[+-]\s*\d+\s*=\s*0$/;
    return linearPattern.test(input);
    }
    
function isQuadraticEquation(input) {
        // Basic regex for quadratic equations: ax^2 + bx + c = 0
    const quadraticPattern = /^[+-]?(\d+)?x\^2\s*[+-]\s*(\d+)?x\s*[+-]\s*\d+\s*=\s*0$/;
    return quadraticPattern.test(input);
    }
    
function isCubicEquation(input) {
        // Basic regex for cubic equations: ax^3 + bx^2 + cx + d = 0
    const cubicPattern = /^[+-]?(\d+)?x\^3\s*[+-]\s*(\d+)?x\^2\s*[+-]\s*(\d+)?x\s*[+-]\s*\d+\s*=\s*0$/;
    return cubicPattern.test(input);
    }
    
function extractCoefficients(input, numCoefficients) {
        // Extract coefficients from input. This is a basic implementation.
        // It should be modified to match the specific format of the equations you're using.
    let coefficients = input.match(/-?\d+/g) || [];
    while (coefficients.length < numCoefficients) {
            coefficients.push('0'); // Add zeros if not all coefficients are present
        }
    return coefficients.map(Number);
    }
    
const superscriptMap = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    '+': '⁺',
    '-': '⁻',
    '=': '⁼',
    '(': '⁽',
    ')': '⁾',
    'x': 'ˣ',
    'y': 'ʸ',
};
const opositSuperscriptMap = {
    '⁰': '0',
    '¹': '1',
    '²': '2',
    '³': '3',
    '⁴': '4',
    '⁵': '5',
    '⁶': '6',
    '⁷': '7',
    '⁸': '8',
    '⁹': '9',
    '⁺': '+',
    '⁻': '-',
    '⁼': '=',
    '⁽': '(',
    '⁾': ')',
    'ˣ': 'x',
    'ʸ': 'y',
};

let inputField = document.getElementById('display');
let calcButton = document.getElementById("Calculate");
let clearDisplayButton = document.getElementById("ClearDisplay");
let historyBox = document.getElementById("HistoryList");
let solutionBox = document.getElementById("SolutionBox");
let graphBox = document.getElementById("DisplayGraph");

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
        } else if (event.shiftKey && event.key === "^") {
            toggleSuperscriptNextToCursor();
            event.preventDefault(); // Prevent the default behavior of the '^' key
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

    function toggleSuperscriptNextToCursor() {
        let selectionStart = inputField.selectionStart;
        let selectionEnd = inputField.selectionEnd;
        let inputValue = inputField.value;
        let selectedText = inputValue.substring(selectionStart, selectionEnd);

        // If there's a selection, replace the selected text with superscript representation
        if (selectedText.length > 0) {
            let superscriptValue = superscriptText(selectedText);
            let newValue = inputValue.substring(0, selectionStart) +
                superscriptValue +
                inputValue.substring(selectionEnd);

            inputField.value = newValue;
            // Move the cursor to the end of the inserted superscript
            inputField.setSelectionRange(selectionStart + superscriptValue.length, selectionStart + superscriptValue.length);
        }
    }

    function superscriptText(text) {
        return text.split('').map(char => superscriptMap[char] || char).join('');
    }

    document.getElementById("clearHistory").addEventListener("click", clearHistoryList);
});

function clearHistoryList() {
    historyBox.textContent = '';
}

calcButton.addEventListener('click', function () {
    let finalInput = inputField.value.trim();

    if (isEquation(finalInput)) {
        let result;

        if (isLinearEquation(finalInput)) {
            let [a, b] = extractCoefficients(finalInput, 2);
            result = solveLinearEquation(a, b);
        } else if (isQuadraticEquation(finalInput)) {
            let [a, b, c] = extractCoefficients(finalInput, 3);
            result = solveQuadraticEquation(a, b, c).join(', ');
        } else if (isCubicEquation(finalInput)) {
            let [a, b, c, d] = extractCoefficients(finalInput, 4);
            result = solveCubicEquation(a, b, c, d).join(', ');
        } else {
            result = 'Unsupported equation type or format';
        }

        solutionBox.textContent = finalInput + " => " + result;
        solutionBox.classList.remove('hidden');
        graphBox.classList.remove('hidden');
    } else {
        finalInput = finalInput.replace("√", "squareRoot");
        if (finalInput !== "") {
            let result = calculateExpression(finalInput);
            solutionBox.textContent = inputField.value + "=" + result;
            solutionBox.classList.remove('hidden');
            graphBox.classList.remove('hidden');

            let newListElement = document.createElement('li');
            newListElement.classList.add("history");
            let spanElem = document.createElement('span');
            spanElem.classList.add('finalInput');
            spanElem.textContent = inputField.value;
            newListElement.appendChild(spanElem);
            newListElement.addEventListener("click", function () {
                inputField.value = newListElement.textContent;
            });

            historyBox.insertBefore(newListElement, historyBox.firstChild);

            inputField.value = '';
        }
    }

    inputField.value = '';
});

clearDisplayButton.addEventListener("click", function () {
    inputField.value = '';
    solutionBox.classList.add('hidden');
    graphBox.classList.add('hidden');
});


// New function to handle equation solving
function solveEquation() {
    let input = inputField.value.trim();

    // Determine the type of equation and solve accordingly
    let result;
    if (isLinearEquation(input)) {
        let [a, b] = extractCoefficients(input, 2);
        result = solveLinearEquation(a, b);
    } else if (isQuadraticEquation(input)) {
        let [a, b, c] = extractCoefficients(input, 3);
        result = solveQuadraticEquation(a, b, c).join(', ');
    } else if (isCubicEquation(input)) {
        let [a, b, c, d] = extractCoefficients(input, 4);
        result = solveCubicEquation(a, b, c, d).join(', ');
    } else {
        result = 'Unsupported equation type or format';
    }

    // Display the result
    solutionBox.textContent = input + " => " + result;
    solutionBox.classList.remove('hidden');
}

function isEquation(input) {
    // Implement logic to determine if the input is an equation
    // Could be a simple check for the presence of an '=' sign
    return input.includes('=');
}