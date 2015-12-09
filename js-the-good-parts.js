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
//


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