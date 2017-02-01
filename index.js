'use strict';

const repl = require('repl');
const color = require('./colors');

let context = repl.start({}).context;
// Let's use just `log`
context.log = console.log;

let toc = `

	${color.green}Table of Contents${color.reset}

		1. Wellcome Message
		2. Table of Contents
		3. null
		4. undefined
		5. String
		6. Number
		7. Boolean
		8. Array
		9. Object
		10. Regular Expressions
		11. Functions
`;

let hello = `
			${color.green}Welcome to Javascript.${color.reset}

	n(); // next topic
	p(); // previous topic
	go(x); // go to x topic
	toc(); // display Table of Content
`;

let nullval = `
			${color.green} null ${color.reset}

	primitive value that represents the intentional absence of any object value
	Basically: variable is defined, it's present. But, there's no value for it.
`;

let undefinedval = `
			${color.green} undefined ${color.reset}

	The variable dos NOT exist. It's not defined in current scope.
`;

let stringval = `
			${color.green} string ${color.reset}

	String is a primitive value and you can represent a string with:
	
	var hello = \`hello\`;
	var hi = 'hi';
	var bye = "bye";
`;

let content = {
	1: hello,
	2: toc,
	3: nullval,
	4: undefinedval,
	5: stringval,
};

let position = 0;

context.n = function() {
	print(content[current()]);
	return '';
};

context.p = function() {
	print(content[current('p')]);
	return '';
};

context.toc = function() {
	position = 1;
	print(content[current()]);
	return '';
};

context.go = function(num) {
	print(content[num]);
	return '';
};

function print(data) {
	console.log('\x1B[2J\u001b[0;0H');

	if (data) {
		console.log(data);
	} else {
		console.log('Content is undefined');
	}

	let width = process.stdout.columns - 4;
	process.stdout.write('\n' + ` `.repeat(width));
}

function current(direction) {
	if (position <= 0) {
		position = 1;
	} else if (position >= Object.keys(content).length) {
		position = 1;
	} else {
		position = direction === 'p' ? position - 1 : position + 1;
	}

	return position;
}

context.n();
console.log('\n');