// Notes from Douglas Crockford's "Javascript: The Good Parts"


//    ________                __               ___
//   / ____/ /_  ____ _____  / /____  _____   |__ \ _
//  / /   / __ \/ __ `/ __ \/ __/ _ \/ ___/   __/ /(_)
// / /___/ / / / /_/ / /_/ / /_/  __/ /      / __/_
// \________/_/\__,_/ .___/\__/\___/_/      /____(_)
//   / ____/_______/_/____ ___  ____ ___  ____ ______
//  / / __/ ___/ __ `/ __ `__ \/ __ `__ \/ __ `/ ___/
// / /_/ / /  / /_/ / / / / / / / / / / / /_/ / /
// \____/_/   \__,_/_/ /_/ /_/_/ /_/ /_/\__,_/_/



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


// Updated prototypes propogate to children automatically.
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

