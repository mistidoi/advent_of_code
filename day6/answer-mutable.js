"use strict";


let fs = require('fs');
let _ = require("lodash")

let sparseMatrix = {};

let parseLine = function (line) {
    let parsed_line = /(turn .+|toggle) (\d+),(\d+) through (\d+),(\d+)/.exec(line);
    return parsed_line.slice(1, 6);
};

let lightState = function (lines, functionMap, matrix) {
    return lines.reduce((acc, line) => {

        let parsed_line = parseLine(line);
        let command = parsed_line[0];
        let x1 = +parsed_line[1];
        let y1 = +parsed_line[2];
        let x2 = +parsed_line[3];
        let y2 = +parsed_line[4];

        _.range(x1, x2 + 1).map((x) => {
            _.range(y1, y2 + 1).map((y) => {
                functionMap[command](acc, x, y);
            })
        });

        return acc;
    }, matrix);
};

let solutionOneSemantics = {
    'turn on': (matrix, x, y) => {
        matrix[(x + "|" + y)] = 1;
    },
    'turn off': (matrix, x, y) => {
        if (matrix[(x + "|" + y)] != undefined) {
            delete matrix[(x + "|" + y)];
        }
    },
    'toggle': (matrix, x, y) => {
        if (matrix[(x + "|" + y)]) {
            delete matrix[(x + "|" + y)];
        } else {
            matrix[(x + "|" + y)] = 1;
        }
    }
};


let solutionTwoSematics = {
    'turn on': (matrix, x, y) => {
        matrix[(x + "|" + y)] = (matrix[(x + "|" + y)] || 0) + 1;
    },
    'turn off': (matrix, x, y) => {
        matrix[(x + "|" + y)] = Math.max(((matrix[(x + "|" + y)] || 0) - 1), 0);
    },
    'toggle': (matrix, x, y) => {
        matrix[(x + "|" + y)] = (matrix[(x + "|" + y)] || 0) + 2;
    }
};


fs.readFile('input.txt', 'utf8', function (err, input) {

    let lines = input.trim().split('\n');

    let solution1 = lightState(lines, solutionOneSemantics, sparseMatrix).size

    let solution2 = lightState(lines, solutionTwoSematics, sparseMatrix).reduce((acc, value) => {
        return acc + value;
    }, 0)

    console.log("solution 1:");
    console.log(solution1);
    console.log("solution 2:");
    console.log(solution2);

});
