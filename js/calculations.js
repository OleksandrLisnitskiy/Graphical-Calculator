// maths.js

// basic operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error: Division by Zero' : a / b; }

// functions and equasions
function power(base, exponent) { return Math.pow(base, exponent); }
function squareRoot(x) { return Math.sqrt(x); }
function sum(array) { return array.reduce((a, b) => a + b, 0); }
function cosine(x) { return Math.cos(x); }
function sine(x) { return Math.sin(x); }
function tangent(x) { return Math.tan(x); }
function naturalLog(x) { return Math.log(x); }
function logarithm(base, x) { return Math.log(x) / Math.log(base); }
function exponent(x) { return Math.exp(x); }

// Solves a linear equation ax + b = 0
function solveLinearEquation(a, b) {
    if (a === 0) {
        return 'No solution' // or undefined, if you prefer
    }
    return -b / a;
}

// Solves a quadratic equation ax^2 + bx + c = 0
function solveQuadraticEquation(a, b, c) {
    const discriminant = b*b - 4*a*c;
    if (discriminant < 0) {
        return 'No real solutions';
    }
    const x1 = (-b + Math.sqrt(discriminant)) / (2*a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2*a);
    return [x1, x2];
}

// Solves a cubic equation ax^3 + bx^2 + cx + d = 0
// This is a simplified version using Cardano's method.
function solveCubicEquation(a, b, c, d) {
    // Implement cubic equation solution
    // The solution can be quite complex and might need a numerical method
    // Return the roots as an array
}

export { add, subtract, multiply, divide, power, squareRoot, sum, cosine, sine, tangent, naturalLog, logarithm, exponent, solveLinearEquation, solveQuadraticEquation, solveCubicEquation };