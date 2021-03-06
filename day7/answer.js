"use strict";


let fs = require('fs');
let _ = require("lodash");


class Or {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
    }

    value() {
        return this.arg1.value() | this.arg2.value();
    }
}

class And {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
    }

    value() {
        return this.arg1.value() & this.arg2.value();
    }
}

class LShift {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
    }

    value() {
        return this.arg1.value() << this.arg2.value();
    }
}

class RShift {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
    }

    value() {
        return this.arg1.value() >> this.arg2.value();
    }
}

class Not {
    constructor(arg1) {
        this.arg1 = arg1;
    }

    value() {
        return 65535 - this.arg1.value();
    }
}

class Connection {
    constructor(address) {
        this.address = address;
    }

    value() {
        let value = addressMap[this.address].value();

        // implement caching in the addressMap.
        if (typeof value == "number") {
            // i.e. if you get a number back eventually, store that numbe
            // in the addressMap.
            addressMap[this.address] = new ValueWrapper(value)
        }
        return addressMap[this.address].value();
    }
}

class ValueWrapper {
    constructor(arg1) {
        this.arg1 = +arg1;
    }

    value() {
        return this.arg1;
    }
}


let addressMap = {};

let commandMap = {
    "OR": Or,
    "AND": And,
    "LSHIFT": LShift,
    "RSHIFT": RShift,
    "NOT": Not
};

let connection = /(.+) -> (.+)/;

let twoArgCommand = /(.+) (.+) (.+)/;

let notCommand = /NOT (.+)/;

let jumper = /(.+)/;


let parseLine = function (line) {

    let tokenizedLine = connection.exec(line);
    let command = tokenizedLine[1];
    let address = tokenizedLine[2];

    if (twoArgCommand.test(command)) {

        let tokenizedCommand = twoArgCommand.exec(command);
        let operator = tokenizedCommand[2];
        let arg1 = tokenizedCommand[1];
        let arg2 = tokenizedCommand[3];

        addressMap[address] = new commandMap[operator](parseArg(arg1), parseArg(arg2))

    } else if (notCommand.test(command)) {
        let parsed_command = notCommand.exec(command);
        addressMap[address] = new Not(parseArg(parsed_command[1]));
    } else if (jumper.test(command)) {
        let parsed_command = jumper.exec(command);
        addressMap[address] = parseArg(parsed_command[1]);
    } else {
        console.log("something went wrong");
    }
};

let parseArg = function (arg) {
    if (/(\d+)/.test(arg)) {
        return new ValueWrapper(arg);
    } else {
        return new Connection(arg);
    }
};


fs.readFile('input.txt', 'utf8', function (err, input) {

    let lines = input.trim().split('\n');

    lines.forEach(function (line) {
        parseLine(line);
    });

    console.log(addressMap);

    let a = addressMap['a'].value();

    console.log('value for a:');
    console.log(a);

    // Reset connections (bust the cache)
    lines.forEach(function (line) {
        parseLine(line);
    });

    console.log('setting b = ' + a);
    addressMap['b'] = new ValueWrapper(a);

    console.log('new value for a:');
    console.log(addressMap['a'].value());


});
