// Notes from Douglas Crockford's "Javascript: The Good Parts"


//    ________                __               ___
//   / ____/ /_  ____ _____  / /____  _____   <  /
//  / /   / __ \/ __ `/ __ \/ __/ _ \/ ___/   / (_)
// / /___/ / / / /_/ / /_/ / /_/  __/ /      / /
// \________/_/\__,_/ .___/\__/\_____/      /_(_) __
//   / ____/___  __/// ____/ /  / __ \____ ______/ /______
//  / / __/ __ \/ __ \/ __  /  / /_/ / __ `/ ___/ __/ ___/
// / /_/ / /_/ / /_/ / /_/ /  / ____/ /_/ / /  / /_(__  )
// \____/\____/\____/\__,_/  /_/    \__,_/_/   \__/____/


// Crockford is going to define methods like this...
Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};


//    ________                __               ___
//   / ____/ /_  ____ _____  / /____  _____   |__ \ _
//  / /   / __ \/ __ `/ __ \/ __/ _ \/ ___/   __/ /(_)
// / /___/ / / / /_/ / /_/ / /_/  __/ /      / __/_
// \________/_/\__,_/ .___/\__/\___/_/      /____(_)
//   / ____/_______/_/____ ___  ____ ___  ____ ______
//  / / __/ ___/ __ `/ __ `__ \/ __ `__ \/ __ `/ ___/
// / /_/ / /  / /_/ / / / / / / / / / / / /_/ / /
// \____/_/   \__,_/_/ /_/ /_/_/ /_/ /_/\__,_/_/


//    __        __       __
//   / /  ___ _/ /  ___ / /__
//  / /__/ _ `/ _ \/ -_) (_-<
// /____/\_,_/_.__/\__/_/___/

// JS supports break labels?
foo_label:
for (var i = 0; i < 10; ++i) {
	for (var j = 0; j < 10; ++j) {
		if (i === 3 && j === 8) {
			break foo_label;
		}
	}
}
console.log(i, j);

// More information found here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label


//    ________                __               _____
//   / ____/ /_  ____ _____  / /____  _____   |__  /_
//  / /   / __ \/ __ `/ __ \/ __/ _ \/ ___/    /_ <(_)
// / /___/ / / / /_/ / /_/ / /_/  __/ /      ___/ /
// \____/_/ /_/\__,_/ .___/\__/\___/_/      /____(_)
//    ____  __     /_/          __
//   / __ \/ /_    (_)__  _____/ /______
//  / / / / __ \  / / _ \/ ___/ __/ ___/
// / /_/ / /_/ / / /  __/ /__/ /_(__  )
// \____/_.___/_/ /\___/\___/\__/____/
//           /___/


//    ___           __       __
//   / _ \_______  / /____  / /___ _____  ___ ___
//  / ___/ __/ _ \/ __/ _ \/ __/ // / _ \/ -_|_-<
// /_/  /_/  \___/\__/\___/\__/\_, / .__/\__/___/
//                            /___/_/

// Updates to a prototype propogate to children automatically.
// The following is an example...

var Rabbit = {
	name: 'Scooter',
	color: 'black'
};

// Objects are always passed by reference.
var Bunny = Rabbit;

// Crockford's simplified method of specifying an object's
// prototype.
if (typeof Object.Create !== 'function') {
	Object.Create = function (proto) {
		var Parent = function () {};
		Parent.prototype = proto;
		return new Parent();
	}
}

var Scoot = Object.Create(Rabbit);
console.log(Scoot.name + ' is ' + Scoot.color);

// Here's the automatic update...
Rabbit.description = 'he is dorable'; // Updating prototype.
console.log('...and ' + Scoot.description); // Changes seen in child.


//    ________                __               __ __
//   / ____/ /_  ____ _____  / /____  _____   / // / _
//  / /   / __ \/ __ `/ __ \/ __/ _ \/ ___/  / // /_(_)
// / /___/ / / / /_/ / /_/ / /_/  __/ /     /__  __/
// \__________/\__,_/ .___/\_______/_/        /_/ (_)
//    / ____/_  ___///  _____/ /_(_)___  ____  _____
//   / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
//  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
// /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/


//    ___             __       ____                       __  _
//   / _ | ___  ___  / /_ __  /  _/__ _  _____  _______ _/ /_(_)__  ___
//  / __ |/ _ \/ _ \/ / // / _/ // _ \ |/ / _ \/ __/ _ `/ __/ / _ \/ _ \
// /_/ |_/ .__/ .__/_/\_, / /___/_//_/___/\___/\__/\_,_/\__/_/\___/_//_/
//      /_/  /_/     /___/

// The Apply Invocation Pattern
// The following is an example...

// Assume some function, "add"
var add = function (a, b) {
	return a + b;
};

// Any function can be invoked using the "apply" method. This method
// takes a context (assigns "this") and an argument array.

// By passing null, we indicate a global context.
var seven = add.apply(null, [3, 4]);

// Now assume a function, "introduce"...
var introduce = function () {
	console.log("Hello, my name is " + this.name);
};

// ...and two objects with name attributes.
var someone = { name: 'Frank' };
var someone_else = { name: 'Arnold' };

// Apply!
introduce.apply(someone); // --> Frank
introduce.apply(someone_else); // --> Arnold


//   _____                  _
//  / ___/_ ____________ __(_)__  ___ _
// / /__/ // / __/ __/ // / / _ \/ _ `/
// \___/\_,_/_/ /_/  \_, /_/_//_/\_, /
//                  /___/       /___/

// Currying in Javascript
// The following is an example...

// We can add curry support to JS.
Function.method('curry', function () {
	var slice = Array.prototype.slice;
	var args = slice.apply(arguments);
	var that = this;
	return function () {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});

// Remember our "add" function. See line 121.
// Let's curry it and create an "inc" function, which just
// increments a Number parameter.
var inc = add.curry(1);

// The above line creates a new modified add function called
// "inc" which accepts one argument, and implicitly sends a
// second argument, 1, to the add function.

console.log(add(4,5)); // --> 9
console.log(inc(12)); // --> 13


//    __  ___               _          __  _
//   /  |/  /__ __ _  ___  (_)__ ___ _/ /_(_)__  ___
//  / /|_/ / -_)  ' \/ _ \/ /_ // _ `/ __/ / _ \/ _ \
// /_/  /_/\__/_/_/_/\___/_//__/\_,_/\__/_/\___/_//_/


// Here's a fibonacci example...

// Use a closure to hide the "memo" array
var fibonacci = (function () {
	var memo = [0, 1];
	var fib = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fib(n-1) + fib(n-2);
			memo[n] = result;
		}
		return result;
	};
	return fib;
}());

// Notice that as we compute fibonacci values, each ith
// computation does not require us to compute the first
// i-1 fibonacci values. We remember, or memoize, values
// already computed. This drastically decreases the work
// load compared to a non-memoized recusive fib function.

for (var i = 0; i < 10; ++i) {
	console.log(fibonacci(i));
}


// Generalized memoization of formulas...

var memoizer = function (memo, formula) {
	var recur = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
};

// Notice "fib" is the recur function used above.
var another_fib = memoizer([0, 1], function (fib, n) {
	return fib(n-1) + fib(n-2);
});

// This should look familiar.
for (var i = 0; i < 10; ++i) {
	console.log(another_fib(i));
}


//    ________                __               ______
//   / ____/ /_  ____ _____  / /____  _____   / ____/
//  / /   / __ \/ __ `/ __ \/ __/ _ \/ ___/  /___ \(_)
// / /___/ / / / /_/ / /_/ / /_/  __/ /     ____/ /
// \____/_/ /_/\__,_/ .___/\__/\___/_/     /_____(_)
//     ____      __/_/           _ __
//    /  _/___  / /_  ___  _____(_) /_____ _____  ________
//    / // __ \/ __ \/ _ \/ ___/ / __/ __ `/ __ \/ ___/ _ \
//  _/ // / / / / / /  __/ /  / / /_/ /_/ / / / / /__/  __/
// /___/_/ /_/_/ /_/\___/_/  /_/\__/\__,_/_/ /_/\___/\___/


//    ___                  __         __             _          __
//   / _ \___ ___ __ _____/ /__  ____/ /__ ____ ___ (_)______ _/ /
//  / ___(_-</ -_) // / _  / _ \/ __/ / _ `(_-<(_-</ / __/ _ `/ /
// /_/  /___/\__/\_,_/\_,_/\___/\__/_/\_,_/___/___/_/\__/\_,_/_/

// This is less relevant since ES6 supports a "class" keyword that
// does all of this for you, but whatever...

// My modified version of Crockford's method for pseudoclassical inheritance.
Function.prototype.inherits = function (Parent) {
	this.prototype = Object.create(Parent.prototype);
	this.prototype.constructor = this;
	return this;
};

// Here's an example of it in action...

// Mammal class, will serve as parent
var Mammal = function (species) {
	this.species = species || 'unknown';
	this.region = 'unkown';
};

Mammal.prototype.says = function () {
	return this.species + ' some unkown sounds.';
};

// Ocelot class, will serve as child
var Ocelot = function () {
	Mammal.call(this, 'Ocelot');
	this.region = 'South America';
}.inherits(Mammal);

Ocelot.prototype.says = function () {
	return this.species + ' makes alien guttural hissing noises...';
};

console.log(new Mammal().says());
console.log(new Ocelot().says());


// Although I like how consice this method is, there's something
// about seeing a parent constructor (super) before seeing the
// inheritance declaration that bugs me...
// Here's another method with less elegant syntax, but immediately
// shows the reader the parent class.

function inherits (Parent, Child) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
	return Child;
}

var PolarBear = inherits(Mammal, function () {
	Mammal.call(this, 'Polar Bear');
	this.region = 'Arctic Circle';
});

PolarBear.prototype.says = function () {
	return this.species + ' growls!';
};

console.log(new PolarBear().says());


//    ________                __               _____
//   / ____/ /_  ____ _____  / /____  _____   /__  /
//  / /   / __ \/ __ `/ __ \/ __/ _ \/ ___/     / (_)
// / /___/ / / / /_/ / /_/ / /_/  __/ /        / /
// \_______ /_/\__,_/ .___/\_______/_/        /_(_)
//    / __ \___  __///___  __/ /___ ______
//   / /_/ / _ \/ __ `/ / / / / __ `/ ___/
//  / _, _/  __/ /_/ / /_/ / / /_/ / /
// /_/ ||||||_/\__, /\__,_/_/\__,_/_/       _
//    / ____/ /______  ________  __________(_)___  ____  _____
//   / __/ | |/_/ __ \/ ___/ _ \/ ___/ ___/ / __ \/ __ \/ ___/
//  / /____>  </ /_/ / /  /  __(__  |__  ) / /_/ / / / (__  )
// /_____/_/|_/ .___/_/   \___/____/____/_/\____/_/ /_/____/
//           /_/


// In JS, regular expressions are more significantly more efficient
// than other types of pattern matching string operations.


//    ____                     __
//   / __/_ _____ ___ _  ___  / /__ ___
//  / _/ \ \ / _ `/  ' \/ _ \/ / -_|_-<
// /___//_\_\\_,_/_/_/_/ .__/_/\__/___/
//                    /_/


// Parse url...
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = 'http://www.ora.com:80/goodparts?q#fragment';

var result = parse_url.exec(url);

var parts = [
	'url', 'scheme', 'slash', 'host',
	'port', 'path', 'query', 'hash'
];

for (var i = 0; i < parts.length; ++i) {
	console.log(parts[i] + ':\t' + result[i]);
}


// Parse number...
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

parse_number.test('1'); // --------------> true
parse_number.test('number'); // ---------> false
parse_number.test('98.6'); // -----------> true
parse_number.test('132.21.86.100'); // --> false
parse_number.test('123.45E-67'); // -----> true
parse_number.test('123/45D-67'); // -----> false


//    ______
//   / __/ /__ ____ ____
//  / _// / _ `/ _ `(_-<
// /_/ /_/\_,_/\_, /___/
//            /___/


// g => global, can matches multiple times
// i => insensitive, ingore character case
// m => multiline, ^ and $ can match line-ending characters


//   _____
//  / ___/______  __ _____  ___
// / (_ / __/ _ \/ // / _ \(_-<
// \___/_/  \___/\_,_/ .__/___/
//                  /_/


// Capturing a group is a regexp "choice" wrapped in parentheses.
// For example, this choice from the the parse_url regexp:
//     (?:([A-Za-z]+)
// The characters that satisfy that regular expression will be
// "captured", meaning they will be added to a resultant array
// holding each captured group. In the same parse_url example,
// we stored that array as "result", and later displayed it.


//   ____                 __  _ ____
//  / __ \__ _____ ____  / /_(_) _(_)__ _______
// / /_/ / // / _ `/ _ \/ __/ / _/ / -_) __(_-<
// \___\_\_,_/\_,_/_//_/\__/_/_//_/\__/_/ /___/


// You can specify how many times a pattern should match.
// For example:
var thisRegexp = /www/; // ----> "www"
var isTheSameAs = /w{3}/; // --> "www"

// Also, you can specify a valid range for the number of
// times a pattern should match.
// For example:
var betweenFourAndTenWs = /w{4,10}/;

// Or, just a minimum number of matches...
var atLeastSixWs = /w{6,}/;

// Note: Unsure whether {,6} is a valid "no more than 6"
// quantifier. I should play with this.


//     ___                               ___         ___       ___
//    /   |  ____  ____  ___  ____  ____/ (_)  __   /   |     ( _ )
//   / /| | / __ \/ __ \/ _ \/ __ \/ __  / / |/_/  / /| |    / __ \/|
//  / ___ |/ /_/ / /_/ /  __/ / / / /_/ / />  <   / ___ |   / /_/  <
// /_/  |_/ .___/ .___/\___/_/ /_/\__,_/_/_/|_|  /_/  |_|   \____/\/
//     __/_/   /_/                       ___         ____
//    /   |  ____  ____  ___  ____  ____/ (_)  __   / __ )_
//   / /| | / __ \/ __ \/ _ \/ __ \/ __  / / |/_/  / __  (_)
//  / ___ |/ /_/ / /_/ /  __/ / / / /_/ / />  <   / /_/ /
// /_/  |_/ .___/ .___/\___/_/ /_/\__,_/_/_/|_|  /_____(_)
//   ____///_  /_/       ___           ____      __   ____             __
//  /_  __/ /_  ___     /   |_      __/ __/_  __/ /  / __ \____ ______/ /______
//   / / / __ \/ _ \   / /| | | /| / / /_/ / / / /  / /_/ / __ `/ ___/ __/ ___/
//  / / / / / /  __/  / ___ | |/ |/ / __/ /_/ / /  / ____/ /_/ / /  / /_(__  )
// /_/_///_///\___/  /_/ _///__/|__/_/  \//,_///__/_/    \__,_///   \__/____( )
//  /_  __/ /_  ___     / __ )____ _____/ /  / __ \____ ______/ /______     |/
//   / / / __ \/ _ \   / __  / __ `/ __  /  / /_/ / __ `/ ___/ __/ ___/
//  / / / / / /  __/  / /_/ / /_/ / /_/ /  / ____/ /_/ / /  / /_(__  )
// /_/ /_/ /_/\___/  /_____/\__,_/\__,_/  /_/    \__,_/_/   \__/____/


// This section outlines some of Javascripts strange behaviors.
// I won't be writing them down because I either already know them
// well, or they're features infamous enough to know never to use.

// fin