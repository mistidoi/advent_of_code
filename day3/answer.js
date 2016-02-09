"use strict";

let _ = require('lodash');
let fs = require('fs');

fs.readFile('input.txt', 'utf8', function (err, input) {

    let moves1 = [];
    let moves2 = [];
    let starting_coords = [0, 0];

    let all_moves = input.trim().split('');

    all_moves.forEach((item, index) => {
        index % 2 == 1 ? moves1.push(item) : moves2.push(item);
    });

    let move_functions = {
        "^": (coords) => { return [coords[0], (coords[1] + 1)];},
        "v": (coords) => { return [coords[0], (coords[1] - 1)];},
        ">": (coords) => { return [(coords[0] + 1), coords[1]];},
        "<": (coords) => { return [(coords[0] - 1), coords[1]];}
    };

    let positions = function (moves) {
        return _.reduce(moves, (acc, move) => {
            return [...acc, move_functions[move](_.last(acc))];
        }, [starting_coords]);
    };

    let deepCompare = (a, b) => _.isEqual(a, b);

    let solution1 = _.uniqWith(positions(all_moves), deepCompare).length;
    let solution2 = _.uniqWith([...positions(moves1), ...positions(moves2)], deepCompare).length;

    console.log("solution to part 1:");
    console.log(solution1);
    console.log("solution to part 2:");
    console.log(solution2);

});




var collection_of_numbers = [1,2,3,4,5];

var doubleMe = function (num) {
    return num * 2
};
// map applies a function to all members of the collection
collection_of_numbers.map(doubleMe);

// filter (or select) will return a collection for which a predicate returns true
