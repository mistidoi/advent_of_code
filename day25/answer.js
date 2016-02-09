"use strict";

// note: this solution requires Babel, as node doesn't yet support tail call optimization.

let firstColumn = function firstColumn(y, acc = 1) {
    if (y == 1) {
        return acc;
    }
    return firstColumn(y - 1, acc + (y - 1));
};

let indexFromCoords = function (x, y, acc = 0) {
    if (x == 1) {
        return acc + firstColumn(y);
    }
    return indexFromCoords(x - 1, y, acc + (x + y - 1));
};

let codeSeries = function (index, acc = 20151125) {
    if (index == 1) {
        return acc;
    }
    return codeSeries(index - 1, acc * 252533 % 33554393);
};

let solution = function (x, y) {
    return codeSeries(indexFromCoords(x, y));
};

// SANITY CHECKS:
// console.log(firstColumn(5));
// 11
// console.log(indexFromCoords(3, 4));
// 18
// console.log(codeSeries(4));
// 16080970

console.log(solution(3019, 3010));




