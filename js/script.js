let inputField = document.getElementById('display');
function appendToDisplay(value) {
    display.value += value;
}


// function evalInput() {
//     try {
//         display.textContent = eval(display.textContent);
//     } catch (error) {
//         display.textContent = 'Error';
//     }
// }

// document.addEventListener('keydown', function(event) {
//     // Check if the focus is not on an input field (to avoid interference)
//     if (document.activeElement.tagName !== 'INPUT') {
//         // Get the pressed key code
//         const keyCode = event.key;
//
//         if(keyCode === "Escape"){
//             inputField.value = "";
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    let funcButtons = document.querySelectorAll('.func');
    inputField.focus();
    // Function to handle the input and allow only integers
    function handleInput() {
        var inputValue = inputField.value;

        // Remove non-numeric characters except for the minus sign at the beginning
        var sanitizedValue = inputValue.replace(/[^-0-9xy=+*/()]/g, '');

        // Update the input field value
        inputField.value = sanitizedValue;
    }

    inputField.addEventListener('keydown', function(event) {
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
        inputField.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    }

    // Add event listener to all buttons with class "func"
    funcButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // You can customize the character based on your needs
            insertCharacterNextToCursor(button.textContent);
            inputField.focus();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {

});

