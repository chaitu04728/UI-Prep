"use client";
import { useState } from "react";

const methodsData = {
  Array: [
    {
      name: "map",
      def: "Creates a new array by applying a function to each element",
      example: `const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// Result: [2, 4, 6, 8]`,
    },
    {
      name: "filter",
      def: "Creates a new array with elements that pass a test",
      example: `const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
// Result: [2, 4]`,
    },
    {
      name: "reduce",
      def: "Reduces array to single value by applying function",
      example: `const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0);
// Result: 10`,
    },
    {
      name: "forEach",
      def: "Executes a function for each array element",
      example: `const fruits = ['apple', 'banana'];
fruits.forEach(fruit => console.log(fruit));`,
    },
    {
      name: "find",
      def: "Returns first element that satisfies condition",
      example: `const users = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
const user = users.find(u => u.id === 2);
// Result: {id: 2, name: 'Bob'}`,
    },
    {
      name: "findIndex",
      def: "Returns index of first element that satisfies condition",
      example: `const numbers = [5, 12, 8, 130, 44];
const index = numbers.findIndex(n => n > 10);
// Result: 1`,
    },
    {
      name: "some",
      def: "Tests if at least one element passes condition",
      example: `const numbers = [1, 2, 3, 4];
const hasEven = numbers.some(n => n % 2 === 0);
// Result: true`,
    },
    {
      name: "every",
      def: "Tests if all elements pass condition",
      example: `const numbers = [2, 4, 6];
const allEven = numbers.every(n => n % 2 === 0);
// Result: true`,
    },
    {
      name: "includes",
      def: "Checks if array contains a value",
      example: `const fruits = ['apple', 'banana', 'mango'];
const hasBanana = fruits.includes('banana');
// Result: true`,
    },
    {
      name: "flat",
      def: "Flattens nested arrays by specified depth",
      example: `const nested = [1, [2, [3, 4]]];
const flattened = nested.flat(2);
// Result: [1, 2, 3, 4]`,
    },
    {
      name: "flatMap",
      def: "Maps then flattens the result by one level",
      example: `const arr = [1, 2, 3];
const result = arr.flatMap(x => [x, x * 2]);
// Result: [1, 2, 2, 4, 3, 6]`,
    },
    {
      name: "slice",
      def: "Returns shallow copy of array portion",
      example: `const fruits = ['apple', 'banana', 'mango', 'orange'];
const citrus = fruits.slice(2, 4);
// Result: ['mango', 'orange']`,
    },
    {
      name: "splice",
      def: "Changes array by removing/replacing/adding elements",
      example: `const fruits = ['apple', 'banana', 'mango'];
fruits.splice(1, 1, 'orange');
// Result: ['apple', 'orange', 'mango']`,
    },
    {
      name: "push / pop",
      def: "push: adds to end, pop: removes from end",
      example: `const stack = [1, 2];
stack.push(3); // [1, 2, 3]
stack.pop();   // [1, 2]`,
    },
    {
      name: "shift / unshift",
      def: "shift: removes from start, unshift: adds to start",
      example: `const arr = [2, 3];
arr.unshift(1); // [1, 2, 3]
arr.shift();    // [2, 3]`,
    },
    {
      name: "concat",
      def: "Merges two or more arrays",
      example: `const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2);
// Result: [1, 2, 3, 4]`,
    },
    {
      name: "join",
      def: "Joins array elements into a string",
      example: `const words = ['Hello', 'World'];
const sentence = words.join(' ');
// Result: 'Hello World'`,
    },
    {
      name: "reverse",
      def: "Reverses array in place",
      example: `const arr = [1, 2, 3];
arr.reverse();
// Result: [3, 2, 1]`,
    },
    {
      name: "sort",
      def: "Sorts array in place",
      example: `const numbers = [3, 1, 4, 1, 5];
numbers.sort((a, b) => a - b);
// Result: [1, 1, 3, 4, 5]`,
    },
    {
      name: "fill",
      def: "Fills array elements with static value",
      example: `const arr = [1, 2, 3, 4];
arr.fill(0, 1, 3);
// Result: [1, 0, 0, 4]`,
    },
    {
      name: "indexOf",
      def: "Returns first index of value, or -1",
      example: `const arr = ['a', 'b', 'c', 'b'];
const index = arr.indexOf('b');
// Result: 1`,
    },
    {
      name: "lastIndexOf",
      def: "Returns last index of value, or -1",
      example: `const arr = ['a', 'b', 'c', 'b'];
const index = arr.lastIndexOf('b');
// Result: 3`,
    },
    {
      name: "at",
      def: "Returns element at index (supports negative)",
      example: `const arr = [1, 2, 3, 4];
const last = arr.at(-1);
// Result: 4`,
    },
    {
      name: "Array.from",
      def: "Creates array from array-like or iterable",
      example: `const str = 'hello';
const chars = Array.from(str);
// Result: ['h', 'e', 'l', 'l', 'o']`,
    },
    {
      name: "Array.isArray",
      def: "Checks if value is an array",
      example: `Array.isArray([1, 2, 3]); // true
Array.isArray('hello');   // false`,
    },
    {
      name: "Array.of",
      def: "Creates array from arguments",
      example: `const arr = Array.of(1, 2, 3);
// Result: [1, 2, 3]`,
    },
  ],
  String: [
    {
      name: "slice",
      def: "Extracts part of string",
      example: `const str = 'Hello World';
const part = str.slice(0, 5);
// Result: 'Hello'`,
    },
    {
      name: "substring",
      def: "Extracts characters between two indices",
      example: `const str = 'Hello World';
const part = str.substring(6, 11);
// Result: 'World'`,
    },
    {
      name: "split",
      def: "Splits string into array",
      example: `const str = 'a,b,c';
const arr = str.split(',');
// Result: ['a', 'b', 'c']`,
    },
    {
      name: "trim / trimStart / trimEnd",
      def: "Removes whitespace from string",
      example: `const str = '  hello  ';
str.trim();      // 'hello'
str.trimStart(); // 'hello  '
str.trimEnd();   // '  hello'`,
    },
    {
      name: "replace / replaceAll",
      def: "Replaces substring(s)",
      example: `const str = 'hello world';
str.replace('world', 'there'); // 'hello there'
'aaa'.replaceAll('a', 'b');    // 'bbb'`,
    },
    {
      name: "includes",
      def: "Checks if string contains substring",
      example: `const str = 'Hello World';
str.includes('World'); // true`,
    },
    {
      name: "startsWith / endsWith",
      def: "Checks if string starts/ends with substring",
      example: `const str = 'Hello World';
str.startsWith('Hello'); // true
str.endsWith('World');   // true`,
    },
    {
      name: "indexOf / lastIndexOf",
      def: "Returns index of substring or -1",
      example: `const str = 'hello world';
str.indexOf('o');     // 4
str.lastIndexOf('o'); // 7`,
    },
    {
      name: "toUpperCase / toLowerCase",
      def: "Converts string case",
      example: `const str = 'Hello';
str.toUpperCase(); // 'HELLO'
str.toLowerCase(); // 'hello'`,
    },
    {
      name: "padStart / padEnd",
      def: "Pads string to target length",
      example: `const str = '5';
str.padStart(3, '0'); // '005'
str.padEnd(3, '0');   // '500'`,
    },
    {
      name: "repeat",
      def: "Repeats string n times",
      example: `const str = 'ha';
str.repeat(3); // 'hahaha'`,
    },
    {
      name: "charAt / charCodeAt",
      def: "Gets character or character code at index",
      example: `const str = 'Hello';
str.charAt(0);     // 'H'
str.charCodeAt(0); // 72`,
    },
    {
      name: "match / matchAll",
      def: "Matches string against regex",
      example: `const str = 'test1 test2';
str.match(/\\d/g); // ['1', '2']`,
    },
    {
      name: "search",
      def: "Searches for regex match, returns index",
      example: `const str = 'hello world';
str.search(/world/); // 6`,
    },
    {
      name: "at",
      def: "Returns character at index (supports negative)",
      example: `const str = 'hello';
str.at(-1); // 'o'`,
    },
    {
      name: "template literals",
      def: "String interpolation with backticks",
      example: `const name = 'Alice';
const greeting = \`Hello, \${name}!\`;
// Result: 'Hello, Alice!'`,
    },
  ],
  Object: [
    {
      name: "Object.keys",
      def: "Returns array of object's keys",
      example: `const obj = {a: 1, b: 2};
Object.keys(obj);
// Result: ['a', 'b']`,
    },
    {
      name: "Object.values",
      def: "Returns array of object's values",
      example: `const obj = {a: 1, b: 2};
Object.values(obj);
// Result: [1, 2]`,
    },
    {
      name: "Object.entries",
      def: "Returns array of [key, value] pairs",
      example: `const obj = {a: 1, b: 2};
Object.entries(obj);
// Result: [['a', 1], ['b', 2]]`,
    },
    {
      name: "Object.assign",
      def: "Copies properties from source to target",
      example: `const target = {a: 1};
const source = {b: 2};
Object.assign(target, source);
// Result: {a: 1, b: 2}`,
    },
    {
      name: "Object.freeze",
      def: "Freezes object (immutable)",
      example: `const obj = {a: 1};
Object.freeze(obj);
obj.a = 2; // Fails silently
// obj is still {a: 1}`,
    },
    {
      name: "Object.seal",
      def: "Seals object (can't add/remove properties)",
      example: `const obj = {a: 1};
Object.seal(obj);
obj.a = 2;  // Works
obj.b = 3;  // Fails`,
    },
    {
      name: "Object.create",
      def: "Creates object with specified prototype",
      example: `const proto = {greet() { return 'Hi'; }};
const obj = Object.create(proto);
obj.greet(); // 'Hi'`,
    },
    {
      name: "Object.hasOwn",
      def: "Checks if object has own property",
      example: `const obj = {a: 1};
Object.hasOwn(obj, 'a'); // true
Object.hasOwn(obj, 'toString'); // false`,
    },
    {
      name: "Object.fromEntries",
      def: "Creates object from [key, value] pairs",
      example: `const entries = [['a', 1], ['b', 2]];
const obj = Object.fromEntries(entries);
// Result: {a: 1, b: 2}`,
    },
    {
      name: "Object.is",
      def: "Compares two values for equality",
      example: `Object.is(NaN, NaN);  // true
Object.is(0, -0);     // false
Object.is({}, {});    // false`,
    },
  ],
  Number: [
    {
      name: "toFixed",
      def: "Formats number to fixed decimal places",
      example: `const num = 3.14159;
num.toFixed(2); // '3.14'`,
    },
    {
      name: "toString",
      def: "Converts number to string",
      example: `const num = 255;
num.toString();   // '255'
num.toString(16); // 'ff' (hex)`,
    },
    {
      name: "parseInt / parseFloat",
      def: "Parses string to number",
      example: `parseInt('42');      // 42
parseFloat('3.14'); // 3.14
parseInt('FF', 16); // 255`,
    },
    {
      name: "Number.isNaN",
      def: "Checks if value is NaN",
      example: `Number.isNaN(NaN);    // true
Number.isNaN('hello'); // false`,
    },
    {
      name: "Number.isFinite",
      def: "Checks if value is finite number",
      example: `Number.isFinite(42);       // true
Number.isFinite(Infinity); // false`,
    },
    {
      name: "Number.isInteger",
      def: "Checks if value is integer",
      example: `Number.isInteger(42);   // true
Number.isInteger(3.14); // false`,
    },
  ],
  Math: [
    {
      name: "Math.max / Math.min",
      def: "Returns maximum/minimum value",
      example: `Math.max(1, 5, 3);  // 5
Math.min(1, 5, 3);  // 1
Math.max(...[1,2,3]); // 3`,
    },
    {
      name: "Math.floor / ceil / round",
      def: "Rounds number down/up/nearest",
      example: `Math.floor(3.7); // 3
Math.ceil(3.2);  // 4
Math.round(3.5); // 4`,
    },
    {
      name: "Math.abs",
      def: "Returns absolute value",
      example: `Math.abs(-5);  // 5
Math.abs(3);   // 3`,
    },
    {
      name: "Math.sqrt / Math.pow",
      def: "Square root and power",
      example: `Math.sqrt(16);     // 4
Math.pow(2, 3);    // 8
2 ** 3;            // 8 (same)`,
    },
    {
      name: "Math.random",
      def: "Returns random number [0, 1)",
      example: `Math.random(); // 0.547...
Math.floor(Math.random() * 10); // 0-9`,
    },
    {
      name: "Math.trunc",
      def: "Removes decimal part",
      example: `Math.trunc(3.7);  // 3
Math.trunc(-3.7); // -3`,
    },
  ],
  Promise: [
    {
      name: "Promise.all",
      def: "Waits for all promises to resolve",
      example: `const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
Promise.all([p1, p2]).then(console.log);
// [1, 2]`,
    },
    {
      name: "Promise.allSettled",
      def: "Waits for all promises to settle",
      example: `const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
Promise.allSettled([p1, p2]);
// [{status:'fulfilled',value:1}, {status:'rejected',reason:'error'}]`,
    },
    {
      name: "Promise.race",
      def: "Returns first settled promise",
      example: `const slow = new Promise(r => setTimeout(() => r('slow'), 100));
const fast = Promise.resolve('fast');
Promise.race([slow, fast]); // 'fast'`,
    },
    {
      name: "Promise.any",
      def: "Returns first fulfilled promise",
      example: `const p1 = Promise.reject('err');
const p2 = Promise.resolve('ok');
Promise.any([p1, p2]); // 'ok'`,
    },
    {
      name: ".then / .catch / .finally",
      def: "Handles promise results",
      example: `fetch('/api/data')
  .then(res => res.json())
  .catch(err => console.error(err))
  .finally(() => console.log('Done'));`,
    },
  ],
  JSON: [
    {
      name: "JSON.stringify",
      def: "Converts JavaScript value to JSON string",
      example: `const obj = {name: 'Alice', age: 30};
JSON.stringify(obj);
// '{"name":"Alice","age":30}'`,
    },
    {
      name: "JSON.parse",
      def: "Parses JSON string to JavaScript value",
      example: `const json = '{"name":"Alice"}';
const obj = JSON.parse(json);
// {name: 'Alice'}`,
    },
  ],
  Date: [
    {
      name: "new Date()",
      def: "Creates date object",
      example: `const now = new Date();
const specific = new Date('2024-01-01');`,
    },
    {
      name: "Date.now",
      def: "Returns current timestamp (ms)",
      example: `const timestamp = Date.now();
// 1704067200000`,
    },
    {
      name: "getFullYear / getMonth / getDate",
      def: "Gets date components",
      example: `const date = new Date('2024-03-15');
date.getFullYear(); // 2024
date.getMonth();    // 2 (0-indexed)
date.getDate();     // 15`,
    },
    {
      name: "toISOString",
      def: "Converts date to ISO string",
      example: `const date = new Date('2024-01-01');
date.toISOString();
// '2024-01-01T00:00:00.000Z'`,
    },
  ],
  "Map & Set": [
    {
      name: "Map",
      def: "Key-value pairs with any key type",
      example: `const map = new Map();
map.set('key', 'value');
map.get('key');  // 'value'
map.has('key');  // true
map.delete('key');
map.size;        // 0`,
    },
    {
      name: "Set",
      def: "Collection of unique values",
      example: `const set = new Set([1, 2, 2, 3]);
set.size;      // 3
set.has(2);    // true
set.add(4);
set.delete(1);
[...set];      // [2, 3, 4]`,
    },
  ],
  Console: [
    {
      name: "console.log / warn / error",
      def: "Logs messages to console",
      example: `console.log('Info');
console.warn('Warning');
console.error('Error');`,
    },
    {
      name: "console.table",
      def: "Displays data as table",
      example: `const users = [{name:'Alice',age:30}, {name:'Bob',age:25}];
console.table(users);`,
    },
    {
      name: "console.time / timeEnd",
      def: "Measures execution time",
      example: `console.time('loop');
for(let i = 0; i < 1000; i++) {}
console.timeEnd('loop');`,
    },
  ],
};

export default function InbuiltMethodsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Object.keys(methodsData);

  const filteredData = Object.entries(methodsData).reduce(
    (acc, [category, methods]) => {
      const filtered = methods.filter(
        (method) =>
          method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          method.def.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as Record<string, typeof methodsData.Array>,
  );

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>📚 JavaScript Inbuilt Methods</h1>
      <p>
        Comprehensive reference with definitions and examples for all built-in
        JavaScript methods
      </p>

      <input
        type="text"
        placeholder="Search methods..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          fontSize: "16px",
          border: "2px solid #eaeaea",
          borderRadius: "8px",
        }}
      />

      <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            style={{
              padding: "8px 16px",
              marginRight: "10px",
              marginBottom: "10px",
              background: activeCategory === cat ? "#0070f3" : "#eaeaea",
              color: activeCategory === cat ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: activeCategory === cat ? "bold" : "normal",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {Object.entries(filteredData)
        .filter(([cat]) => !activeCategory || cat === activeCategory)
        .map(([category, methods]) => (
          <div key={category} style={{ marginBottom: "30px" }}>
            <h2
              style={{
                borderBottom: "2px solid #0070f3",
                paddingBottom: "10px",
              }}
            >
              {category}
            </h2>
            {methods.map((method) => (
              <div
                key={method.name}
                style={{
                  background: "#f9f9f9",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #eaeaea",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", color: "#0070f3" }}>
                  {method.name}
                </h3>
                <p style={{ margin: "0 0 10px 0", color: "#666" }}>
                  {method.def}
                </p>
                <pre
                  style={{
                    background: "#1e1e1e",
                    color: "#d4d4d4",
                    padding: "15px",
                    borderRadius: "5px",
                    overflow: "auto",
                    margin: 0,
                  }}
                >
                  <code>{method.example}</code>
                </pre>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
