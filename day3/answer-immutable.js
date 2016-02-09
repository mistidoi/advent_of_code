"use strict";

let fs = require('fs');
let Immutable = require('immutable');

let isEven = (num, index) => { return index % 2 == 0};

fs.readFile('input.txt', 'utf8', function (err, input) {
    let starting_coords = Immutable.List([0, 0]);

    let all_moves = Immutable.List(input.trim().split(''));

    let even_moves = all_moves.filter(isEven);
    let odd_moves = all_moves.filterNot(isEven);

    let move_functions = {
        "^": (coords) => { return Immutable.List([coords.get(0), (coords.get(1) + 1)]);},
        "v": (coords) => { return Immutable.List([coords.get(0), (coords.get(1) - 1)]);},
        ">": (coords) => { return Immutable.List([(coords.get(0) + 1), coords.get(1)]);},
        "<": (coords) => { return Immutable.List([(coords.get(0) - 1), coords.get(1)]);}
    };

    let positions = function (moves) {
        return moves.reduce((acc, move) => {
            return acc.push(move_functions[move](acc.last()));
        }, Immutable.List().push(starting_coords));
    };

    let solution1 = Immutable.Set(positions(all_moves)).size;
    let solution2 = Immutable.Set(positions(even_moves)).concat(positions(odd_moves)).size;

    console.log("solution to part 1:");
    console.log(solution1);
    console.log("solution to part 2:");
    console.log(solution2);

});

