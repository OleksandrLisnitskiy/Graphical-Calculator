let display = document.getElementById('display');

function appendToDisplay(value) {
    display.textContent += value;
}

function clearDisplay() {
    display.textContent = '';
}

function evalInput() {
    try {
        display.textContent = eval(display.textContent);
    } catch (error) {
        display.textContent = 'Error';
    }
}

document.addEventListener('keydown', function(event) {
    // Check if the focus is not on an input field (to avoid interference)
    if (document.activeElement.tagName !== 'INPUT') {
        // Get the pressed key code
        const keyCode = event.key;
        // Check if the pressed key is a letter or a number
        if ("0987654321-=+/*.".includes(keyCode)) {
            // Append the pressed key to the search field value
            display.textContent += event.key;
        }
        else if(keyCode == "Backspace"){
            display.textContent = display.textContent.slice(0, display.textContent.length-1);
        }
        else if(keyCode == "Escape"){
            clearDisplay();
        }else if(keyCode == "Enter"){
            evalInput();
        }
    }
});