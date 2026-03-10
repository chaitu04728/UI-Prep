import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Concepts | Next.js Explorer",
  description: "Complete JS reference: hoisting, closures, promises, event loop, HOF, and 30+ more concepts.",
};

interface Concept {
  id: string;
  category: string;
  badgeClass: string;
  title: string;
  desc: string;
  code: string;
  note: string;
}

const concepts: Concept[] = [
  // ─── CORE ──────────────────────────────────────────────────────────────────
  {
    id: "hoisting",
    category: "Core",
    badgeClass: "badge-orange",
    title: "Hoisting",
    desc: "Declarations are moved to the top of their scope at compile time. var is hoisted AND initialized to undefined. Function declarations are fully hoisted. let/const are hoisted but NOT initialized — accessing them before the declaration throws a ReferenceError (TDZ).",
    code: `console.log(x);    // undefined  — var hoisted + initialized
// console.log(y);  // ReferenceError — TDZ (let not initialized)
var x = 5;
let y = 10;

greet();           // "Hello" — function declaration fully hoisted
function greet() { console.log("Hello"); }

const arrow = () => {};   // variable hoisted, value is NOT`,
    note: "Key distinction: var is hoisted AND initialized (undefined). let/const are hoisted but NOT initialized — that's the TDZ window. Arrow functions and class expressions follow the same rule as const.",
  },
  {
    id: "closures",
    category: "Core",
    badgeClass: "badge-orange",
    title: "Closures",
    desc: "A closure is a function that remembers variables from its outer scope even after the outer function has returned. The inner function retains a live reference to the outer scope, not a snapshot copy.",
    code: `function makeCounter() {
  let count = 0;            // lives in the closure
  return {
    inc:   () => ++count,
    dec:   () => --count,
    value: () => count,
  };
}
const c = makeCounter();
c.inc();   // 1
c.inc();   // 2
c.dec();   // 1

// Classic interview trap — var vs let in a loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);  // 3 3 3 — one shared 'i'
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);  // 0 1 2 — new binding per iteration
}`,
    note: "Closures power data encapsulation, the module pattern, memoization, and partial application. The var-in-loop trap is the most common closure interview question — always know why let fixes it.",
  },
  {
    id: "tdz",
    category: "Core",
    badgeClass: "badge-orange",
    title: "Temporal Dead Zone (TDZ)",
    desc: "The TDZ is the window between entering a block scope and when the let/const declaration is evaluated. Any access in this period throws a ReferenceError — even typeof, unlike with undeclared variables.",
    code: `{
  // TDZ starts here for 'x'
  console.log(typeof x);  // ReferenceError — even typeof throws!
  console.log(x);         // ReferenceError

  let x = 5;              // TDZ ends — x is initialized
  console.log(x);         // 5
}

// Default params also have TDZ
function test(a = b, b = 2) {}
test();  // ReferenceError: b is not defined`,
    note: "TDZ applies to let, const, and class declarations. Remember: hoisting lifts the binding but not the value. TDZ is the gap between those two events.",
  },
  {
    id: "scope",
    category: "Core",
    badgeClass: "badge-orange",
    title: "Scope",
    desc: "Scope determines where variables are accessible. JavaScript uses lexical scope — determined by where code is written, not where it's called. Types: Global, Function (var), Block (let/const inside {}).",
    code: `const global = "global";

function outer() {
  const outerVar = "outer";

  function inner() {
    const innerVar = "inner";
    console.log(global, outerVar, innerVar); // all accessible
  }
  // console.log(innerVar); // ReferenceError — not in scope
  inner();
}

// var leaks through block boundaries
{
  let blockLet = "block";
  var blockVar = "leaked!";  // var ignores block scope
}
// console.log(blockLet);  // ReferenceError
console.log(blockVar);      // "leaked!" — var is function/global scoped`,
    note: "Scope chain: variable lookup walks outward through enclosing scopes until found or global. var is function-scoped and ignores {} blocks — a common bug source. Use let/const for predictable block scoping.",
  },
  {
    id: "this",
    category: "Core",
    badgeClass: "badge-orange",
    title: "this Keyword",
    desc: "this refers to the current execution context. Its value depends on HOW a function is called, not where it's defined — except arrow functions, which capture this lexically from the surrounding scope.",
    code: `// Method call — this = the object
const obj = {
  name: "Alice",
  greet()       { return this.name; },         // "Alice"
  arrow: () =>  { return this?.name; },         // undefined (lexical this)
};

// Explicit binding: call / apply / bind
function greet(greeting) {
  return greeting + ", " + this.name;
}
greet.call({ name: "Bob" }, "Hi");     // "Hi, Bob"
greet.apply({ name: "Bob" }, ["Hi"]);  // "Hi, Bob"
const bound = greet.bind({ name: "Bob" });
bound("Hey");                          // "Hey, Bob"

// new binding — this = newly created object
function Person(name) { this.name = name; }
const p = new Person("Carol");         // p.name === "Carol"`,
    note: "Binding priority: new > explicit (bind/call/apply) > implicit (method call) > default (window or undefined in strict mode). Arrow functions are exempt — they always use lexical this and cannot be rebound.",
  },
  {
    id: "prototype",
    category: "Core",
    badgeClass: "badge-orange",
    title: "Prototype Chain",
    desc: "Every JS object has an internal [[Prototype]] link to another object. Property lookup walks up this chain until found or null is reached. This is JavaScript's native inheritance mechanism — classes are syntactic sugar on top.",
    code: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return this.name + " makes a sound";
};

const dog = new Animal("Rex");
dog.speak();                        // "Rex makes a sound" — on prototype
dog.hasOwnProperty("name");         // true — own property
dog.hasOwnProperty("speak");        // false — inherited from Animal.prototype

// Every object links up to Object.prototype
Object.getPrototypeOf(dog) === Animal.prototype;  // true
Object.getPrototypeOf(Animal.prototype) === Object.prototype; // true
Object.getPrototypeOf(Object.prototype); // null — chain ends

// ES6 class = same prototype mechanics, cleaner syntax
class Cat extends Animal {
  speak() { return super.speak() + " (meow)"; }
}`,
    note: "Every function has a .prototype object. new sets the object's [[Prototype]] to that .prototype. instanceof walks the prototype chain. Object.create(proto) creates an object with a specified prototype.",
  },
  {
    id: "execution-context",
    category: "Core",
    badgeClass: "badge-orange",
    title: "Execution Context",
    desc: "An Execution Context (EC) is the environment where JS code runs. It contains a Variable Environment (bindings), Scope Chain (access to outer ECs), and a this binding. A new EC is created for each function call and pushed onto the Call Stack.",
    code: `// Global EC is created first (Variable Env + Scope Chain + this=window)
const x = 10;

function foo() {
  // foo EC pushed onto call stack
  const y = 20;

  function bar() {
    // bar EC pushed onto call stack
    console.log(x + y);   // 30 — access outer ECs via scope chain
    // bar EC popped
  }
  bar();
  // foo EC popped
}
foo();
// Back in Global EC

// Two PHASES of each EC:
// 1. Creation  — hoisting (var→undefined, functions fully declared)
// 2. Execution — code runs line by line`,
    note: "The Creation Phase is where hoisting happens — explaining why var is undefined rather than a ReferenceError. The Scope Chain is built during creation, locking in lexical scope.",
  },

  // ─── ASYNC ─────────────────────────────────────────────────────────────────
  {
    id: "call-stack",
    category: "Async",
    badgeClass: "badge-blue",
    title: "Call Stack",
    desc: "A LIFO (Last In, First Out) data structure tracking currently executing functions. Pushing = function call, popping = function return. Stack overflow occurs when the stack exceeds its size limit — typically from infinite recursion.",
    code: `function c() { console.log("c"); }
function b() { c(); }
function a() { b(); }
a();
// Stack progression:
//   push a → push b → push c
//   pop  c → pop  b → pop  a

// Stack overflow
function infinite() { infinite(); }
// infinite();  // RangeError: Maximum call stack size exceeded

// Async functions (setTimeout, fetch) run OUTSIDE the call stack via Web APIs.
// Their callbacks are queued and run only when the stack is empty.`,
    note: "The call stack is single-threaded and synchronous. Async Web APIs (setTimeout, fetch, I/O) complete outside the stack and push callbacks into the task queue. The event loop moves them in when the stack is empty.",
  },
  {
    id: "event-loop",
    category: "Async",
    badgeClass: "badge-blue",
    title: "Event Loop",
    desc: "The mechanism that allows single-threaded JS to handle asynchronous work. Each iteration: run all synchronous code, drain the entire microtask queue (Promises), then execute ONE macrotask (setTimeout/I/O), repeat.",
    code: `console.log("1 — sync start");

setTimeout(() => console.log("5 — macrotask"), 0);

Promise.resolve()
  .then(() => console.log("3 — microtask 1"))
  .then(() => console.log("4 — microtask 2"));

queueMicrotask(() => console.log("3b — microtask 3"));

console.log("2 — sync end");

// Output order: 1 → 2 → 3 → 3b → 4 → 5
//
// Rule: after each task, ALL microtasks drain before the next macrotask runs.`,
    note: "Microtask queue (Promises, queueMicrotask, MutationObserver) always runs to completion before any macrotask (setTimeout, setInterval, I/O). Stacking microtasks can starve the UI render (also a macrotask).",
  },
  {
    id: "callbacks",
    category: "Async",
    badgeClass: "badge-blue",
    title: "Callbacks",
    desc: "A function passed as an argument to be invoked when an async operation completes. The original async pattern in JS. Problem: nesting multiple async ops produces deeply indented 'callback hell' (pyramid of doom).",
    code: `// Simple callback
setTimeout(() => console.log("done"), 1000);

// Node.js error-first convention (err, data)
fs.readFile("file.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data.toString());
});

// Callback hell — hard to read, no error propagation
getData((data) => {
  processData(data, (processed) => {
    saveData(processed, (saved) => {
      sendEmail(saved, (result) => {
        // 4 levels deep — imagine 10
      });
    });
  });
});`,
    note: "Callbacks are still used for event listeners (addEventListener), setTimeout/setInterval, and many Node.js APIs. Promises and async/await were introduced specifically to solve callback hell.",
  },
  {
    id: "promises",
    category: "Async",
    badgeClass: "badge-blue",
    title: "Promises",
    desc: "Represents an eventual value. States: pending → fulfilled (resolve) or rejected (reject). Chainable via .then()/.catch()/.finally(). Promise callbacks are always async — .then() always runs after the current synchronous code, even for already-resolved Promises.",
    code: `const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("data"), 1000);
});

p.then(v  => console.log(v))
 .catch(e  => console.error(e))
 .finally(() => console.log("always runs"));

// Combinators
Promise.all([p1, p2, p3])      // wait for ALL — rejects on first failure
Promise.allSettled([p1, p2])   // wait for ALL — never rejects
Promise.race([p1, p2])         // first to settle (resolve OR reject) wins
Promise.any([p1, p2])          // first to FULFILL wins (ignores rejects)

// Instantly resolved / rejected
Promise.resolve("value");
Promise.reject(new Error("oops"));`,
    note: "Promise.all is fail-fast. Promise.allSettled is fail-safe — use it when you need all results regardless of outcome. Promise.any is the inverse of Promise.all (needs at least one success).",
  },
  {
    id: "async-await",
    category: "Async",
    badgeClass: "badge-blue",
    title: "async / await",
    desc: "Syntactic sugar over Promises. An async function always returns a Promise. await pauses execution of that function until the Promise settles. Makes async code read as sequential, with try/catch for errors.",
    code: `async function fetchUser(id) {
  try {
    const res = await fetch("/api/users/" + id);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    console.error("Failed:", err.message);
    throw err;  // re-throw so caller can handle
  }
}

// ❌ Sequential (slow — each waits for the previous)
const user  = await fetchUser(1);
const posts = await fetchPosts(1);

// ✅ Parallel — both requests fire simultaneously
const [user2, posts2] = await Promise.all([fetchUser(1), fetchPosts(1)]);

// await in forEach does NOT work as expected — use for...of or Promise.all
for (const id of ids) {
  await fetchUser(id);   // sequential but correct
}`,
    note: "Never use await inside .forEach() — it doesn't pause the loop. Use for...of for sequential async, or Promise.all(ids.map(fetchUser)) for parallel.",
  },
  {
    id: "fetch-api",
    category: "Async",
    badgeClass: "badge-blue",
    title: "Fetch API",
    desc: "Native browser API for HTTP requests. Returns a Promise that resolves to a Response object. Requires two awaits: one for the network response, one for body parsing. Does NOT reject on HTTP errors (4xx/5xx) — only on network failure.",
    code: `// GET
const res = await fetch("https://api.example.com/users/1");
if (!res.ok) throw new Error("HTTP " + res.status);  // must check manually!
const user = await res.json();

// POST with JSON body
const res2 = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" }),
});

// Cancel with AbortController (timeout / navigation)
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);
const res3 = await fetch("/api/data", { signal: controller.signal });
clearTimeout(timeout);

// Next.js extended fetch (ISR)
fetch("/api/data", { next: { revalidate: 60 } });`,
    note: "fetch() does NOT reject on 4xx/5xx — always check res.ok. In Next.js, the fetch cache options ({ cache: 'no-store' } for SSR, { next: { revalidate } } for ISR) are an extension over native fetch.",
  },
  {
    id: "microtask-queue",
    category: "Async",
    badgeClass: "badge-blue",
    title: "Microtask Queue",
    desc: "Microtasks are processed after each synchronous task but BEFORE the next macrotask. Sources: Promise callbacks (.then/.catch), queueMicrotask(), MutationObserver. The entire microtask queue drains in one sweep — even new microtasks added during processing run in the same round.",
    code: `console.log("sync 1");

setTimeout(() => console.log("macro 1"), 0);
setTimeout(() => console.log("macro 2"), 0);

Promise.resolve().then(() => {
  console.log("micro 1");
  // This new microtask runs BEFORE macro 1
  Promise.resolve().then(() => console.log("micro 2 (nested)"));
});

queueMicrotask(() => console.log("micro 3"));

console.log("sync 2");

// Output:
// sync 1 → sync 2 → micro 1 → micro 2 (nested) → micro 3 → macro 1 → macro 2`,
    note: "Microtasks added DURING microtask processing join the current round — the queue runs until fully empty before ANY macrotask. Chaining infinite .then()s will starve setTimeout and UI re-renders.",
  },

  // ─── FUNCTIONS ─────────────────────────────────────────────────────────────
  {
    id: "hof",
    category: "Functions",
    badgeClass: "badge-purple",
    title: "Higher-Order Functions (HOF)",
    desc: "Functions that accept other functions as arguments OR return functions. The foundation of functional programming in JS. Built-in HOFs: map, filter, reduce, sort, forEach, find. Enables composition, abstraction, and reuse.",
    code: `// Takes a function as argument
function repeat(n, fn) {
  for (let i = 0; i < n; i++) fn(i);
}
repeat(3, console.log);  // 0, 1, 2

// Returns a function
function multiplier(factor) {
  return (n) => n * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
double(5);  // 10

// Function composition (right-to-left)
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
// Function pipeline    (left-to-right)
const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);

const process = pipe(
  x => x * 2,         // 10
  x => x + 1,         // 11
  x => x.toString()   // "11"
);
process(5);  // "11"`,
    note: "compose is right-to-left (math notation), pipe is left-to-right (data flow). Memorise both — common FP interview question. All array iteration methods (map, filter, reduce) are HOFs.",
  },
  {
    id: "currying",
    category: "Functions",
    badgeClass: "badge-purple",
    title: "Currying",
    desc: "Transforms a function taking N arguments into a chain of N single-argument functions. Enables partial application — pre-filling some arguments to create a more specific function. Common in functional programming libraries (Ramda, lodash/fp).",
    code: `// Manual currying
const add = a => b => c => a + b + c;
add(1)(2)(3);   // 6

const add5 = add(5);   // partial application — one arg locked in
add5(3)(2);            // 10

// Generic curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}

const curriedAdd = curry((a, b, c) => a + b + c);
curriedAdd(1)(2)(3);    // 6
curriedAdd(1, 2)(3);    // 6 — also works
curriedAdd(1)(2, 3);    // 6

// Practical use with array methods
const multiply = curry((factor, n) => n * factor);
[1, 2, 3].map(multiply(2));  // [2, 4, 6]`,
    note: "Currying vs Partial Application: currying always returns single-arg functions. Partial application fixes N arguments at once. Lodash's _.curry supports both calling styles.",
  },
  {
    id: "memoization",
    category: "Functions",
    badgeClass: "badge-purple",
    title: "Memoization",
    desc: "Caches the return value of a function for given arguments. On repeated calls with the same inputs, returns the cached result instead of recomputing. Trade-off: speed vs memory. Only suitable for pure functions.",
    code: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Without memoization: O(2^n) — catastrophically slow for large n
// With memoization:    O(n)
const fib = memoize(function (n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
});
fib(40);  // instant — tree of sub-problems cached

// React equivalents:
// React.memo(Component)         — memoize the rendered output
// useMemo(() => compute(), [])  — memoize a value
// useCallback(() => fn(), [])   — memoize a function reference`,
    note: "Memoization is only safe for PURE functions. Using JSON.stringify as a key fails for functions, Symbols, and circular refs — use a WeakMap-based approach for object arguments in production.",
  },
  {
    id: "iife",
    category: "Functions",
    badgeClass: "badge-purple",
    title: "IIFE (Immediately Invoked Function Expression)",
    desc: "A function that runs immediately after it's defined, without an explicit call. Creates a private scope, preventing variable pollution of the global namespace. Widely used before ES6 modules.",
    code: `// Classic IIFE
(function () {
  const secret = "I am scoped — not global";
  console.log(secret);
})();

// Arrow IIFE
(() => {
  const x = 10;
  console.log(x);
})();

// IIFE with parameters — safe alias for globals
(function (win, doc) {
  win.addEventListener("load", () => console.log("loaded"));
})(window, document);

// Module pattern via IIFE — exposes public API, hides private state
const counter = (function () {
  let count = 0;
  return {
    inc:   () => ++count,
    reset: () => (count = 0),
    get:   () => count,
  };
})();

counter.inc();      // 1
counter.get();      // 1
// count — ReferenceError — private`,
    note: "IIFEs are mostly replaced by ES6 modules and block scoping. Still seen in bundler output (UMD format), polyfills, and legacy code. Understanding them helps when reading minified/transpiled code.",
  },
  {
    id: "debounce-throttle",
    category: "Functions",
    badgeClass: "badge-purple",
    title: "Debounce & Throttle",
    desc: "Rate-limiting patterns for expensive or high-frequency operations. Debounce: delays execution until N ms after the LAST call (waits for silence). Throttle: allows at most one execution per N ms (steady heartbeat).",
    code: `// DEBOUNCE — fires only after user stops for 'ms'
function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
const onSearch = debounce((query) => fetchResults(query), 300);
input.addEventListener("input", e => onSearch(e.target.value));

// THROTTLE — fires at most once every 'ms'
function throttle(fn, ms) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
const onScroll = throttle(() => updateNavPosition(), 100);
window.addEventListener("scroll", onScroll);`,
    note: "Debounce = wait for silence (search inputs, resize end). Throttle = periodic heartbeat (scroll, mouse move, game loop). In React, use lodash.debounce / useDebouncedCallback (use-debounce package).",
  },
  {
    id: "pure-functions",
    category: "Functions",
    badgeClass: "badge-purple",
    title: "Pure Functions",
    desc: "A function is pure if: (1) same inputs always produce the same output, and (2) it has no side effects — no mutation of external state, no I/O, no randomness. Enables predictability, easy testing, and memoization.",
    code: `// ✅ Pure — deterministic, no side effects
const add  = (a, b) => a + b;
const double = arr => arr.map(x => x * 2);  // returns NEW array

// ❌ Impure — modifies external state
let total = 0;
const addToTotal = n => { total += n; };  // side effect

// ❌ Impure — non-deterministic
const rand = () => Math.random();
const now  = () => Date.now();

// ❌ Impure — mutates input
function pushItem(arr, item) {
  arr.push(item);            // mutates original array!
}
// ✅ Pure equivalent
const withItem = (arr, item) => [...arr, item];

// Array method purity cheatsheet:
// Pure:   map, filter, reduce, slice, concat, find, some, every
// Impure: push, pop, shift, splice, sort, reverse  (mutate in place)`,
    note: "Functional programming favors pure functions for predictability. slice() is pure; splice() mutates — a common interview gotcha. React's state updates must be pure (return new objects/arrays, never mutate).",
  },

  // ─── ARRAY METHODS ─────────────────────────────────────────────────────────
  {
    id: "map",
    category: "Array Methods",
    badgeClass: "badge-green",
    title: "Array.map()",
    desc: "Creates a NEW array by applying a transformation function to every element. Never mutates the original. Always returns an array of the SAME length. Use for transforming data, not for side effects.",
    code: `const nums = [1, 2, 3, 4, 5];

nums.map(x => x * 2);           // [2, 4, 6, 8, 10]
nums.map((x, i) => x + i);      // [1, 3, 5, 7, 9]

// Transform array of objects
const users = [{ name: "Alice", age: 25 }, { name: "Bob", age: 30 }];
users.map(u => u.name);                      // ["Alice", "Bob"]
users.map(u => ({ ...u, senior: u.age > 28 })); // add field — spread to avoid mutation

// Chaining
[1, -2, 3, -4]
  .filter(x => x > 0)    // [1, 3]
  .map(x => x * 10);     // [10, 30]

// ❌ Do NOT use map for side effects
users.map(u => console.log(u.name));  // wrong — use forEach instead`,
    note: "map returns a new array of the SAME length. If you discard the return value, use forEach. Never use map for side effects — that communicates wrong intent and wastes an array allocation.",
  },
  {
    id: "filter",
    category: "Array Methods",
    badgeClass: "badge-green",
    title: "Array.filter()",
    desc: "Creates a NEW array containing only elements for which the callback returns truthy. Never mutates the original. The returned array may be shorter (or empty). Use for removing/selecting elements.",
    code: `const nums = [1, 2, 3, 4, 5, 6];

nums.filter(x => x % 2 === 0);       // [2, 4, 6] — even only
nums.filter(x => x > 3);             // [4, 5, 6]

// Filter objects
const users = [
  { name: "Alice", active: true  },
  { name: "Bob",   active: false },
  { name: "Carol", active: true  },
];
users.filter(u => u.active);                   // [Alice, Carol]
users.filter(u => u.name.startsWith("A"));     // [Alice]

// Remove falsy values
[0, 1, "", "hi", null, true].filter(Boolean);  // [1, "hi", true]

// Remove duplicates (primitives)
const uniq = [...new Set([1, 2, 2, 3, 3])];   // [1, 2, 3]

// filter vs find
nums.filter(x => x > 3);  // [4, 5, 6] — ALL matches (array)
nums.find(x => x > 3);    // 4          — FIRST match (or undefined)`,
    note: "filter returns an array; find returns the first match or undefined; findIndex returns the index or -1. For large arrays doing filter+map, consider a single-pass reduce to avoid creating an intermediate array.",
  },
  {
    id: "reduce",
    category: "Array Methods",
    badgeClass: "badge-green",
    title: "Array.reduce()",
    desc: "Reduces an array to a single value using an accumulator. The most flexible array method — can implement map, filter, groupBy, and more. Always provide an initial value to handle empty arrays and make the types explicit.",
    code: `const nums = [1, 2, 3, 4, 5];

// Sum / product
nums.reduce((acc, x) => acc + x, 0);          // 15
nums.reduce((acc, x) => acc * x, 1);          // 120

// Build an object from an array
["a", "b", "c"].reduce((obj, key, i) => {
  obj[key] = i;
  return obj;
}, {});  // { a: 0, b: 1, c: 2 }

// Group by — most common interview question
const people = [
  { name: "Alice", dept: "Eng" },
  { name: "Bob",   dept: "HR"  },
  { name: "Carol", dept: "Eng" },
];
people.reduce((groups, person) => {
  (groups[person.dept] ??= []).push(person);
  return groups;
}, {});
// { Eng: [Alice, Carol], HR: [Bob] }

// Implement map using reduce
const double = arr => arr.reduce((acc, x) => [...acc, x * 2], []);`,
    note: "ALWAYS provide an initial value (second argument) — without it, reduce uses the first element as accumulator, skipping it at index 0, and throws on empty arrays. reduceRight processes right-to-left.",
  },
  {
    id: "array-others",
    category: "Array Methods",
    badgeClass: "badge-green",
    title: "forEach / find / some / every / flat",
    desc: "Essential array methods beyond map/filter/reduce. forEach for iteration with side effects, find/findIndex for searching, some/every for boolean checks (short-circuit), flat/flatMap for nested arrays.",
    code: `const arr = [1, 2, 3, 4, 5];

// forEach — iterate for side effects (returns undefined, can't break)
arr.forEach((x, i) => console.log(i, x));

// find / findIndex — first match or undefined / -1
arr.find(x => x > 3);          // 4
arr.findIndex(x => x > 3);     // 3

// some / every — short-circuit boolean checks
arr.some(x => x > 4);          // true  (at least one)
arr.every(x => x > 0);         // true  (all)
arr.every(x => x > 2);         // false (3 fails)

// flat / flatMap
[[1, 2], [3, [4, 5]]].flat();            // [1, 2, 3, [4, 5]] depth=1
[[1, 2], [3, [4, 5]]].flat(Infinity);   // [1, 2, 3, 4, 5]
[1, 2, 3].flatMap(x => [x, x * 2]);    // [1, 2, 2, 4, 3, 6]

// includes / indexOf
arr.includes(3);   // true
arr.indexOf(3);    // 2

// Array.from — create from iterable or array-like
Array.from({ length: 3 }, (_, i) => i);  // [0, 1, 2]
Array.from("abc");                        // ["a", "b", "c"]`,
    note: "forEach cannot break early — use for...of with break, or some()/every() for short-circuiting. flatMap is equivalent to .map().flat(1) but performs a single pass — more efficient.",
  },

  // ─── ES6+ ──────────────────────────────────────────────────────────────────
  {
    id: "var-let-const",
    category: "ES6+",
    badgeClass: "badge-yellow",
    title: "var / let / const",
    desc: "Three variable declaration keywords with different scoping and hoisting rules. var: function-scoped, hoisted+initialized. let: block-scoped, TDZ, reassignable. const: block-scoped, TDZ, not reassignable (but the value it points to can still mutate).",
    code: `// Scoping
function demo() {
  if (true) {
    var  v = "var";    // function-scoped — leaks to the function
    let  l = "let";    // block-scoped — stays inside if {}
    const c = "const"; // block-scoped — stays inside if {}
  }
  console.log(v);      // "var"
  // console.log(l);   // ReferenceError
}

// Re-declaration
var a = 1; var a = 2;   // OK — var allows re-declaration
let b = 1; // let b = 2; // SyntaxError — cannot re-declare

// const binding is immutable, not the value
const obj = { x: 1 };
obj.x = 99;    // ✅ mutating the object — allowed
// obj = {};   // ❌ TypeError — rebinding the const variable

// Hoisting
console.log(v2);  // undefined (var hoisted + initialized)
// console.log(l2); // ReferenceError (TDZ)
var v2 = 1;
let l2 = 2;`,
    note: "Rule of thumb: default to const, use let when you need to reassign, never use var in modern code. var's function scoping and hoisting are ongoing sources of subtle bugs.",
  },
  {
    id: "destructuring",
    category: "ES6+",
    badgeClass: "badge-yellow",
    title: "Destructuring",
    desc: "Extract values from arrays or objects into variables using a pattern-matching syntax. Supports default values, renaming, rest, and nesting. Used heavily in React (props, useState, hooks pattern).",
    code: `// Object destructuring
const { name, age, city = "NYC" } = { name: "Alice", age: 25 };

// Rename while destructuring
const { name: fullName, age: years } = { name: "Alice", age: 25 };

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// Swap variables (no temp variable needed)
let a = 1, b = 2;
[a, b] = [b, a];   // a=2, b=1

// Nested
const { address: { city: city2, zip } } = { address: { city: "NYC", zip: "10001" } };

// Function parameters with defaults
function greet({ name, role = "user" } = {}) {
  return name + " (" + role + ")";
}
greet({ name: "Bob" });           // "Bob (user)"
greet();                          // no error — default {}

// Combined with rest
const { x, ...others } = { x: 1, y: 2, z: 3 };
// others = { y: 2, z: 3 }`,
    note: "Always provide a default empty object/array for destructured parameters (= {}) to avoid TypeError when the caller passes nothing. Avoid deeply nested destructuring — it hurts readability.",
  },
  {
    id: "spread-rest",
    category: "ES6+",
    badgeClass: "badge-yellow",
    title: "Spread & Rest (...)",
    desc: "The same ... syntax with opposite purposes. Spread expands an iterable into individual elements — in calls or literals. Rest collects remaining items into an array — in parameters or destructuring. Both enable immutable data patterns.",
    code: `// SPREAD — expand into elements
const a = [1, 2, 3];
const merged = [...a, ...[4, 5, 6]];       // [1,2,3,4,5,6]
const copy   = [...a];                     // shallow copy

// Object spread
const user = { name: "Alice", age: 25 };
const updated  = { ...user, age: 26 };    // { name:"Alice", age:26 }
const extended = { ...user, role: "admin" };

// Spread into function call
Math.max(...[1, 5, 3, 9, 2]);  // 9

// REST — collect remaining into array
function sum(first, ...rest) {
  return rest.reduce((acc, n) => acc + n, first);
}
sum(1, 2, 3, 4);  // 10

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4];     // head=1, tail=[2,3,4]
const { x, ...others } = { x: 1, y: 2, z: 3 };  // others={y:2,z:3}`,
    note: "Spread creates SHALLOW copies — nested objects are still references. For deep cloning use structuredClone() (modern) or JSON.parse(JSON.stringify()) with its limitations. Rest parameter must always be last.",
  },
  {
    id: "classes",
    category: "ES6+",
    badgeClass: "badge-yellow",
    title: "Classes",
    desc: "Syntactic sugar over prototype-based inheritance. Classes support constructors, static members, private fields (#), getters/setters, and extends. Under the hood they still use prototypes — but the syntax is much cleaner.",
    code: `class Animal {
  #name;                          // private field — truly private
  static count = 0;               // static class field

  constructor(name) {
    this.#name = name;
    Animal.count++;
  }

  get name()     { return this.#name; }         // getter
  set name(val)  { this.#name = val;  }         // setter

  speak()        { return this.#name + " speaks"; }
  static create(name) { return new Animal(name); }
}

class Dog extends Animal {
  #breed;

  constructor(name, breed) {
    super(name);             // must call super() before using this
    this.#breed = breed;
  }

  speak() { return super.speak() + " (woof!)"; }
  info()  { return this.name + " [" + this.#breed + "]"; }
}

const d = new Dog("Rex", "Labrador");
d.speak();      // "Rex speaks (woof!)"
Animal.count;   // 1`,
    note: "Private fields (#) are enforced by the engine — not just a naming convention. Classes are NOT hoisted like function declarations. The extends + super pattern replaces manual prototype manipulation.",
  },
  {
    id: "modules",
    category: "ES6+",
    badgeClass: "badge-yellow",
    title: "Modules (import / export)",
    desc: "ES6 Modules provide file-level scope, static imports/exports, and enable tree-shaking. Each module is a singleton — evaluated once and cached. Named exports (can have many) vs default export (one per file).",
    code: `// math.js — named exports
export const PI = 3.14159;
export const add = (a, b) => a + b;
export function multiply(a, b) { return a * b; }

// math.js — default export (one per file)
export default class Calculator { /* ... */ }

// app.js — importing
import Calculator, { PI, add } from "./math.js";    // default + named
import * as MathUtils from "./math.js";              // namespace import
MathUtils.add(1, 2);

// Re-export (barrel files)
export { add, multiply } from "./math.js";

// Dynamic import — lazy loading / code splitting
const { default: Calc } = await import("./math.js");

// index.js barrel pattern (common in component libraries)
export { Button }   from "./Button";
export { Input  }   from "./Input";
// consumers: import { Button, Input } from "./components";`,
    note: "Prefer named exports over default — IDEs can auto-rename them and it's explicit at the import site. Dynamic import() enables code splitting in bundlers. Modules run in strict mode by default.",
  },
  {
    id: "generators",
    category: "ES6+",
    badgeClass: "badge-yellow",
    title: "Generators & Iterators",
    desc: "Generator functions (function*) can pause execution at yield and resume later. They return an iterator — an object with a .next() method. Enable lazy sequences, infinite data streams, and are the foundation async/await is built on.",
    code: `function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) yield i;
}

const gen = range(1, 5);
gen.next();          // { value: 1, done: false }
gen.next();          // { value: 2, done: false }
[...range(1, 5)];    // [1, 2, 3, 4, 5]
for (const n of range(0, 10, 2)) console.log(n); // 0,2,4,6,8,10

// Infinite sequence — lazy, compute only what's needed
function* naturals() {
  let n = 1;
  while (true) yield n++;
}
const take = (n, it) => Array.from({ length: n }, () => it.next().value);
take(5, naturals());  // [1, 2, 3, 4, 5]

// Two-way communication via next(value)
function* accumulator() {
  let total = 0;
  while (true) {
    const n = yield total;   // yield sends out, receives next value
    total += n;
  }
}
const acc = accumulator();
acc.next();     // start — { value: 0, done: false }
acc.next(10);   //        { value: 10, done: false }
acc.next(5);    //        { value: 15, done: false }`,
    note: "Generators are the foundation of async/await — Babel transpiles async/await to generators + Promises. Symbol.iterator makes objects iterable; for...of calls .next() under the hood.",
  },

  // ─── PATTERNS ──────────────────────────────────────────────────────────────
  {
    id: "hoc",
    category: "Patterns",
    badgeClass: "badge-cyan",
    title: "Higher-Order Components (HOC)",
    desc: "A React pattern where a function takes a component and returns an enhanced version. Used for cross-cutting concerns: auth guards, logging, analytics, feature flags. Mostly replaced by custom hooks in modern React, but still seen in HOC-heavy codebases.",
    code: `// withAuth — redirects unauthenticated users
function withAuth(Component) {
  return function AuthGuard(props) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Redirect to="/login" />;
    return <Component {...props} />;
  };
}

// withLoading — shows spinner while loading
function withLoading(Component) {
  return function Wrapped({ isLoading, ...props }) {
    if (isLoading) return <Spinner />;
    return <Component {...props} />;
  };
}

// Compose multiple HOCs (right-to-left)
const enhance = compose(withAuth, withLoading, withErrorBoundary);
const ProtectedPage = enhance(DashboardPage);

// Modern equivalent — custom hook (preferred)
function useDashboard(id) {
  const { user }   = useAuth();
  const { data }   = useFetchData(id);
  const { report } = useErrorCapture();
  return { user, data, report };
}`,
    note: "HOC wrapper hell (10 nested wrappers in devtools) was a major pain point. Custom hooks solve the same problems with better composition and no extra DOM nodes. Redux's connect() is a classic HOC.",
  },
  {
    id: "observer",
    category: "Patterns",
    badgeClass: "badge-cyan",
    title: "Observer Pattern",
    desc: "Defines a one-to-many dependency: when a subject (publisher) changes state, all registered observers (subscribers) are notified automatically. Foundation of DOM events, RxJS Observables, Redux, and Node.js EventEmitter.",
    code: `class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) this.#events.set(event, []);
    this.#events.get(event).push(listener);
    // Return unsubscribe function — ALWAYS do this to prevent leaks
    return () => this.off(event, listener);
  }

  off(event, listener) {
    const listeners = this.#events.get(event) ?? [];
    this.#events.set(event, listeners.filter(l => l !== listener));
  }

  emit(event, ...args) {
    this.#events.get(event)?.forEach(fn => fn(...args));
  }

  once(event, listener) {
    const wrapper = (...args) => { listener(...args); this.off(event, wrapper); };
    return this.on(event, wrapper);
  }
}

const bus = new EventEmitter();
const unsub = bus.on("login", user => console.log("Logged in:", user.name));
bus.emit("login", { name: "Alice" });  // "Logged in: Alice"
unsub();  // cleanup — prevent memory leak`,
    note: "Always return and call the unsubscribe function when the observer is no longer needed — the #1 cause of memory leaks in event-driven code. React useEffect cleanup is this pattern in action.",
  },
  {
    id: "module-pattern",
    category: "Patterns",
    badgeClass: "badge-cyan",
    title: "Module Pattern",
    desc: "Uses closures (via IIFE) to create private state inaccessible from outside, exposing only a curated public API. The Revealing Module Pattern variant names all public methods explicitly at the bottom for clarity.",
    code: `// Module Pattern — private state + public API
const UserStore = (() => {
  // private — completely inaccessible from outside
  let users = [];
  let nextId = 1;

  function validate(user) {
    if (!user.name) throw new Error("Name required");
  }

  // Revealing Module Pattern — explicitly return the public API
  return {
    add(user) {
      validate(user);
      const entry = { ...user, id: nextId++ };
      users.push(entry);
      return entry;
    },
    remove(id) {
      users = users.filter(u => u.id !== id);
    },
    getAll() { return [...users]; },   // return a copy — prevent external mutation
    find(id) { return users.find(u => u.id === id); },
  };
})();

UserStore.add({ name: "Alice" });   // { name: "Alice", id: 1 }
UserStore.getAll();                  // [{ name: "Alice", id: 1 }]
// users — ReferenceError — private variable`,
    note: "The Revealing Module Pattern lists all public APIs at the return block, making the surface area immediately visible. In modern code, ES6 modules + private class fields achieve the same result more cleanly.",
  },
  {
    id: "singleton",
    category: "Patterns",
    badgeClass: "badge-cyan",
    title: "Singleton",
    desc: "Ensures a class has exactly ONE instance and provides a global access point to it. Used for shared resources: DB connections, caches, config, logger. Important: ES6 modules are singletons by default.",
    code: `// Class-based Singleton with private constructor enforcement
class Database {
  static #instance = null;
  #connection;

  constructor(url) {
    if (Database.#instance) return Database.#instance;  // return existing
    this.#connection = createConnection(url);            // expensive setup
    Database.#instance = this;
  }

  static getInstance(url) {
    return (Database.#instance ??= new Database(url));
  }

  query(sql) { return this.#connection.query(sql); }
}

const db1 = Database.getInstance("postgres://host/db");
const db2 = Database.getInstance("postgres://host/db");
db1 === db2;  // true — same instance

// ES6 Module Singleton (simplest — modules are cached by default)
// config.js
let config = { env: "production", timeout: 5000 };
export const getConfig = () => config;
export const setConfig = updates => { config = { ...config, ...updates }; };
// Any module importing config.js shares the same object`,
    note: "ES6 modules are singletons out of the box — the module code runs once and the exported values are shared. For most use cases a plain module export is simpler than the class-based Singleton.",
  },
];

const categories = ["Core", "Async", "Functions", "Array Methods", "ES6+", "Patterns"];

const categoryMeta: Record<string, { badge: string; icon: string }> = {
  "Core":           { badge: "badge-orange", icon: "🧠" },
  "Async":          { badge: "badge-blue",   icon: "⚡" },
  "Functions":      { badge: "badge-purple", icon: "🔧" },
  "Array Methods":  { badge: "badge-green",  icon: "📦" },
  "ES6+":           { badge: "badge-yellow", icon: "✨" },
  "Patterns":       { badge: "badge-cyan",   icon: "🏗️" },
};

export default function JSPage() {
  const grouped = categories.map((cat) => ({
    name: cat,
    items: concepts.filter((c) => c.category === cat),
  }));

  return (
    <div className="container">
      <div className="page-header">
        <div className="meta">
          <span className="badge badge-yellow">JS</span>
          <span className="badge badge-orange">34 Concepts</span>
          <span className="badge badge-blue">Server Component</span>
        </div>
        <h1>JavaScript Concepts</h1>
        <p>
          Interview-ready reference covering every core JS concept — from hoisting
          and closures to generators and design patterns. Hover the JS button in
          the nav to jump to any section.
        </p>
      </div>

      <div className="tip-box">
        <strong>📌 Interview Pro Tip</strong>
        Be ready to explain the Event Loop, Closures, and Promises with code examples —
        they appear in every senior JS interview. The Prototype Chain and this keyword
        binding rules are close runners-up.
      </div>

      {grouped.map((group) => {
        const meta = categoryMeta[group.name];
        return (
          <section key={group.name}>
            <div className="category-header">
              <span className={`badge ${meta.badge}`}>{meta.icon} {group.name}</span>
              <h2>{group.name}</h2>
              <span style={{ color: "var(--muted)", fontSize: "0.75rem" }}>
                {group.items.length} concepts
              </span>
            </div>

            {group.items.map((concept) => (
              <div
                key={concept.id}
                id={concept.id}
                className="card concept-section"
                style={{ marginBottom: "1.2rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    marginBottom: "0.6rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span className={`badge ${concept.badgeClass}`}>
                    {concept.category}
                  </span>
                  <h2
                    style={{
                      fontSize: "1.05rem",
                      fontFamily: "Syne, sans-serif",
                      margin: 0,
                    }}
                  >
                    {concept.title}
                  </h2>
                </div>

                <p style={{ marginBottom: "0.75rem" }}>{concept.desc}</p>

                <pre className="code-block">{concept.code}</pre>

                <div className="tip-box" style={{ marginBottom: 0 }}>
                  <strong>💡 Interview Note</strong>
                  {concept.note}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
