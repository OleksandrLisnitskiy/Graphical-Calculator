// Import necessary functions from maths.js
import { add, subtract, multiply, divide, power, squareRoot, sum, cosine, sine, tangent, naturalLog, logarithm, exponent } from './maths.js';

// Function to plot a graph for a given mathematical function
function plotFunction(func, range, elementId) {
    let xValues = [];
    let yValues = [];

    for (let x = range.min; x <= range.max; x += range.step) {
        xValues.push(x);
        yValues.push(func(x));
    }

    let data = [{
        x: xValues,
        y: yValues,
        type: 'scatter'
    }];

    let layout = {
        title: 'Graph of the Function',
        xaxis: { title: 'x' },
        yaxis: { title: 'f(x)' }
    };

    Plotly.newPlot(elementId, data, layout);
}

// usage
document.addEventListener('DOMContentLoaded', function () {
    // Plotting various functions
    plotFunction(x => power(x, 2), {min: -10, max: 10, step: 0.1}, 'powerPlot');
    plotFunction(squareRoot, {min: 0, max: 10, step: 0.1}, 'squareRootPlot');
    plotFunction(cosine, {min: -10, max: 10, step: 0.1}, 'cosinePlot');
    plotFunction(sine, {min: -10, max: 10, step: 0.1}, 'sinePlot');
    plotFunction(tangent, {min: -10, max: 10, step: 0.1}, 'tangentPlot');
    plotFunction(naturalLog, {min: 0.1, max: 10, step: 0.1}, 'naturalLogPlot');
    plotFunction(x => logarithm(10, x), {min: 1, max: 10, step: 0.1}, 'logarithmPlot');
    plotFunction(exponent, {min: -10, max: 10, step: 0.1}, 'exponentPlot');
});
