"use strict";

var firstColumn = function firstColumn(_x4) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
        var y = _x4;
        _again = false;
        var acc = _arguments.length <= 1 || _arguments[1] === undefined ? 1 : _arguments[1];

        if (y == 1) {
            return acc;
        }
        _arguments = [_x4 = y - 1, acc + (y - 1)];
        _again = true;
        acc = undefined;
        continue _function;
    }
};

var indexFromCoords = function indexFromCoords(_x5, _x6) {
    var _arguments2 = arguments;
    var _again2 = true;

    _function2: while (_again2) {
        var x = _x5,
            y = _x6;
        _again2 = false;
        var acc = _arguments2.length <= 2 || _arguments2[2] === undefined ? 0 : _arguments2[2];

        if (x == 1) {
            return acc + firstColumn(y);
        }
        _arguments2 = [_x5 = x - 1, _x6 = y, acc + (x + y - 1)];
        _again2 = true;
        acc = undefined;
        continue _function2;
    }
};

var codeSeries = function codeSeries(_x7) {
    var _arguments3 = arguments;
    var _again3 = true;

    _function3: while (_again3) {
        var index = _x7;
        _again3 = false;
        var acc = _arguments3.length <= 1 || _arguments3[1] === undefined ? 20151125 : _arguments3[1];

        if (index == 1) {
            return acc;
        }
        _arguments3 = [_x7 = index - 1, acc * 252533 % 33554393];
        _again3 = true;
        acc = undefined;
        continue _function3;
    }
};

var solution = function solution(x, y) {
    return codeSeries(indexFromCoords(x, y));
};

// console.log(firstColumn(5));
// 11
// console.log(indexFromCoords(3, 4));
// 18
// console.log(codeSeries(4));
// 16080970
console.log(solution(3019, 3010));
