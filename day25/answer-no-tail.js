"use strict";

let firstColumn = function firstColumn(y) {
    if (y == 1) {
        return 1;
    }
    return (y - 1) + firstColumn(y - 1);
};

let indexFromCoords = function (x, y) {
    if (x == 1) {
        return firstColumn(y);
    }
    return indexFromCoords(x - 1, y) + (x + y - 1);
};

let codeSeries = function (index) {
    if (index == 1) {
        return 20151125;
    }
    return codeSeries(index - 1) * 252533 % 33554393;
};

let solution = function (x, y) {
    return codeSeries(indexFromCoords(x, y));
};

console.log(firstColumn(5));
console.log(solution(3, 4));
//console.log(solution(3010, 3019));



