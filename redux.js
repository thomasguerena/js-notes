// Notes on the application architecture, Redux.

// Overview:
//
// Inspired by Facebook's Flux architecture, Redux is intended to be used with
// React. Redux could be used with any framework or view library, but I think
// there are obvious design decisions which show preference to React.
//
// Redux uses three key concepts - Actions, Stores, and Reducers - to manage
// application state, predictably.
//
// (Action): an event which manipulates application state. It is important to
//   note that this is the ONLY allowable way to change state using the Redux
//   philosophy. Actions are plain Javascript objects.
//
// (Store): a model consisting of member data which defines a state, and
// a simple API to dispatch actions, subscribe to changes, and fetch the current
// state of the store.
//
// (Reducer): a function which describes how a store, aka the app itself,
//   transitions between states via actions. Reducers must be pure functions.
//   That is, a function whose return value is determined solely by its input
//   and causes no side effects. A reducer takes a state and an action as
//   arguments and returns the resultant state. Redux also assumes that you
//   never mutate your data. Instead, reducers return a new object. This is to
//   allow for useful functionality like "time travel", record/play, and hot
//   reloading. "...as Om demonstrates, even if you lose out on object
//   allocation, you still win by avoiding expensive re-renders and
//   re-calculations, as you know exactly what changed thanks to reducer
//   purity." - reduxjs.org.

// Redux vs Flux:
//
// The greatest difference between Redux and Flux is that Redux "doesn't have a
// Dispatcher or support many stores." This is how I understand these
// statements.
//
// "...doesn't have a dispatcher": This is where my lack of Flux experience
//   stings me. From what I remember, using Flux, actions are sent from models
//   or stores and received by a "dispatcher". The dispatcher would then apply
//   reductions, condensing state manipulations into a single resultant state,
//   and then wait for the current state to finish rendering before dispatching
//   again. In Redux, this waiting an dispatching is done within the store. It
//   sounds like this would fragment the application state (stores could
//   disagree, etc). However, this is why Redux doesn't...
//
// "...support many stores": Redux uses a single store to track the state of the
//   entire application. Immediately, I'm thinking this is too much data to be
//   managing every time the application updates. However, from what I've read,
//   the performance is good and the scalability is fantastic. In fact, the goal
//   of Redux is to provide scalable application state predictability. So,
//   rather than have a lot of models, there is a single store and a "root
//   reducer" which delegates actions to child-reducers in the state tree. As
//   these actions propogate through the state tree, the reducers are
//   calculating the next state, updating views with the resultant state. This
//   is why I think Redux should really be used with React. React is passed the
//   resultant state, and that state is simply rendered or not, depending on the
//   DOM-tree diff.

// Examples:

// "Counter Vanilla" (from Github, redux/examples/counter-vanilla)
//
// Simplest possible store. Application state is an integer which can be
// incremented or decremented.
// Note: In this example, the reducer name is "counter", not "Counter". This
// really bugged me initially, because I felt like I was creating a reducer
// definition which ultimately gets initialized by "Redux.createStore(reducer)".
// That is incorrect. All reducers are simply functions, and
// "Redux.createStore(reducer)" is initializing a store object and setting our
// argument as the root reducer.

function counter (state, action) {
  if (typeof state === 'undefined') {
    return 0; // Initial state.
  }
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state; // handle unrecognized action
  }
}

// Create a Redux store and set our "counter" reducer abover as the root
// reducer. All actions will begin propogation in the counter reducer.
var store = Redux.createStore(counter);

// Here's a bogus render function...
function render (){
  // Imagine instead using the state to render views.
  console.log('Current value: ' + store.getState());
}

// Call "render" every time "store" detects state has changed.
store.subscribe(render);
render(); // Initial render.

// Now imagine two buttons, one for incrementing and one for decrementing
// our integer value which serves as the sole state the application.

incButton.addEventListener('click', function (e) {
  store.dispatch('INCREMENT'); // Received on line 78
});

decButton.addEventListener('click', function (e) {
  store.dispatch('DECREMENT'); // Received on line 79
});


// Breaking Up Reducers:
//
// I obviously don't want all my action handlers in a single reducer. The Redux
// way to handle this is to create reducers which are responsible for only
// portions of the state-tree (sub-state-tree is hard to say).
//
// For example, suppose our application is an RTS computer game. We would likely
// have a map, players, and units per player. Then our root reducer might look
// something like this...

// Assume reducers "map" and "players" and "unit".

function rts (state, action) {
  if (typeof state === 'undefined') {
    return {}; // Initial state.
  }

  return {
    map: map(state.map, action),
    players: players(state.players, action)
  }
}

// ...and subsequently the "players" reducer could propogate actions to unit
// reducers like this...

function players (state, action) {
  if (typeof state === 'undefined') {
    return [];
  }

  return state.map(function (unit) {
    return unit(unit, action);
  });
}


// It's easy to write tests. Just start with a known state, dispatch an action,
// and compare the resultant state to an expected state.
//
// Since states are immutable (characteristic of pure functions), we can use a
// tool called deep-freeze to ensure nothing is accidentally clobbering the
// current state. It allows you to "freeze" objects (recursively) and throws an
// error whenever the object is modified.
