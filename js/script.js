let finalInput = "";
let inputField = document.getElementById('display');
let calcButton = document.getElementById("Calculate");
let clearDisplayButton = document.getElementById("ClearDisplay");
let historyBox = document.getElementById("HistoryList");

calcButton.addEventListener('click', function () {
    finalInput = inputField.value;
    finalInput = finalInput.replace("²", "^2");
    finalInput = finalInput.replace("³", "^3");
    finalInput = finalInput.replace("ⁿ", "^n");
    finalInput = finalInput.replace("√", "^0.5");
    // finalInput = finalInput.replace("eⁿ", "e^n");
    if (finalInput !== ""){
        inputField.focus();
        let newListElement = document.createElement('li');
        newListElement.classList.add("history");
        let spanElem = document.createElement('span')
        spanElem.classList.add('finalInput');
        spanElem.textContent = finalInput;
        newListElement.appendChild(spanElem);
        historyBox.insertBefore(newListElement, historyBox.firstChild);
        let solutionBox = document.getElementById("SolutionBox");
        let graphBox = document.getElementById("DisplayGraph");
        inputField.value = '';
        if (solutionBox.classList.contains('hidden')) {
            solutionBox.classList.remove('hidden');
            graphBox.classList.remove('hidden');
            solutionBox.classList.add('visible');
            graphBox.classList.add('visible');
        }
    }


});

clearDisplayButton.addEventListener("click", function () {
    inputField.value = '';
});

document.addEventListener('DOMContentLoaded', function () {
    let funcButtons = document.querySelectorAll('button[name]');
    inputField.focus();

    // Function to handle the input and allow only integers
    function handleInput() {
        var inputValue = inputField.value;

        // Remove non-numeric characters except for the minus sign at the beginning
        var sanitizedValue = inputValue.replace(/[^-0-9xy=+*/()tansicolgeΣ²³ⁿ√]/g, '');

        // Update the input field value
        inputField.value = sanitizedValue;
    }

    inputField.addEventListener('keydown', function (event) {
        // Check if the focus is not on an input field (to avoid interference)

        // Get the pressed key code
        if (event.key === "Escape" || event.keyCode === 27) {
            inputField.value = '';
        }
    });

    // Add event listener to the input field
    inputField.addEventListener('input', handleInput);

    // Function to insert a character next to the cursor
    function insertCharacterNextToCursor(char) {
        let cursorPosition = inputField.selectionStart;
        let inputValue = inputField.value;

        // Insert the character next to the cursor
        let newValue = inputValue.slice(0, cursorPosition) + char + inputValue.slice(cursorPosition);

        // Update the input field value and set the cursor position
        inputField.value = newValue;
        inputField.setSelectionRange(inputValue.length, inputValue.length);
    }

    // Add event listener to all buttons with class "func"
    funcButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // You can customize the character based on your needs
            let graphFunction = button.getAttribute("name");
            insertCharacterNextToCursor(graphFunction);
        });
    });
});
