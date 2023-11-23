let display = document.getElementById('display');

function appendToDisplay(value) {
    display.textContent += value;
}

function clearDisplay() {
    display.textContent = '';
}

function evaluate() {
    try {
        display.textContent = eval(display.textContent);
    } catch (error) {
        display.textContent = 'Error';
    }
}
