import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "TypeScript Concepts | Next.js Explorer",
  description:
    "Complete TypeScript reference: types, interfaces, generics, utility types, type guards, and 20+ more concepts.",
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
  // ─── BASIC TYPES ───────────────────────────────────────────────────────────
  {
    id: "basic-types",
    category: "Basics",
    badgeClass: "badge-blue",
    title: "Basic Types",
    desc: "TypeScript provides primitive types: string, number, boolean, null, undefined, symbol, bigint. Also arrays, tuples, and any.",
    code: `// Primitives
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Tuples - fixed length and types
let tuple: [string, number] = ["Alice", 30];

// any - turns off type checking (avoid!)
let anything: any = "string";
anything = 42;  // No error`,
    note: "Avoid 'any' when possible. Use 'unknown' for truly dynamic values, or narrow with type guards. Tuples are useful for fixed-structure data like coordinates [x, y].",
  },
  {
    id: "interfaces",
    category: "Basics",
    badgeClass: "badge-blue",
    title: "Interfaces",
    desc: "Interfaces define the shape of objects. They support optional properties, readonly properties, and can be extended. Preferred for object shapes and classes.",
    code: `interface User {
  id: number;
  name: string;
  email?: string;           // optional
  readonly created: Date;   // immutable
}

const user: User = {
  id: 1,
  name: "Alice",
  created: new Date()
};

// user.created = new Date();  // Error: readonly

// Extending interfaces
interface Admin extends User {
  role: string;
  permissions: string[];
}

// Index signatures for dynamic keys
interface StringMap {
  [key: string]: string;
}`,
    note: "Interfaces can be declared multiple times and TypeScript will merge them. Use interfaces for public API contracts and object shapes.",
  },
  {
    id: "type-aliases",
    category: "Basics",
    badgeClass: "badge-blue",
    title: "Type Aliases",
    desc: "Type aliases create custom type names. Unlike interfaces, they work for unions, intersections, primitives, and tuples. Can't be extended or merged.",
    code: `// Union types
type Status = "pending" | "success" | "error";

// Intersection types
type Person = { name: string };
type Employee = { employeeId: number };
type Worker = Person & Employee;

const worker: Worker = {
  name: "Bob",
  employeeId: 123
};

// Function types
type MathOp = (a: number, b: number) => number;
const add: MathOp = (a, b) => a + b;

// Complex types
type ApiResponse<T> = {
  data: T;
  error?: string;
  status: number;
};`,
    note: "Use type aliases for unions, intersections, and primitives. Use interfaces for object shapes and when you need declaration merging.",
  },
  {
    id: "generics",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "Generics",
    desc: "Generics allow you to write reusable, type-safe code that works with multiple types. Use <T> syntax to create type parameters.",
    code: `// Generic function
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // T = string
identity(42);               // T inferred as number

// Generic interface
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

// Constraints - T must have 'length'
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

logLength("hello");        // OK
logLength([1, 2, 3]);      // OK
// logLength(123);         // Error: no length property

// Multiple type parameters
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}`,
    note: "Generics are essential for creating reusable components and utilities. Use constraints to enforce specific capabilities on generic types.",
  },
  {
    id: "union-intersection",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "Union & Intersection Types",
    desc: "Unions (|) represent values that can be one of several types. Intersections (&) combine multiple types into one.",
    code: `// Union - can be string OR number
type ID = string | number;

function printId(id: ID) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

// Discriminated unions (tagged unions)
type Success = { status: "success"; data: string };
type Error = { status: "error"; error: string };
type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data);  // TypeScript knows it's Success
  } else {
    console.log(result.error); // TypeScript knows it's Error
  }
}

// Intersection - must satisfy ALL types
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const person: Person = { name: "Alice", age: 30 };`,
    note: "Discriminated unions are powerful for modeling state machines and API responses. Use a common literal property (like 'status') to discriminate between types.",
  },
  {
    id: "type-guards",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "Type Guards",
    desc: "Type guards narrow down types in conditional blocks. Built-in: typeof, instanceof, in. Custom guards use 'is' predicates.",
    code: `// typeof guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// instanceof guard
class Dog { bark() {} }
class Cat { meow() {} }

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// in operator guard
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

// Custom type guard with 'is'
function isNumber(value: any): value is number {
  return typeof value === "number" && !isNaN(value);
}`,
    note: "Type guards are essential for working with union types safely. Custom type guards with 'is' predicates give you full control over narrowing.",
  },
  {
    id: "utility-types",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "Utility Types",
    desc: "TypeScript provides built-in utility types to transform existing types: Partial, Required, Readonly, Pick, Omit, Record, and more.",
    code: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - all properties optional
type PartialUser = Partial<User>;
const update: PartialUser = { name: "Alice" };

// Required - all properties required
type RequiredUser = Required<Partial<User>>;

// Readonly - all properties immutable
type ReadonlyUser = Readonly<User>;

// Pick - select specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - exclude specific properties
type UserWithoutEmail = Omit<User, "email">;

// Record - create object type with specific keys
type Roles = "admin" | "user" | "guest";
type Permissions = Record<Roles, string[]>;

const perms: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// ReturnType - extract return type of function
function getUser() { return { id: 1, name: "Alice" }; }
type User2 = ReturnType<typeof getUser>;`,
    note: "Utility types save you from manually redefining types. They're especially useful for forms, API updates, and derived types.",
  },
  {
    id: "enums",
    category: "Basics",
    badgeClass: "badge-blue",
    title: "Enums",
    desc: "Enums define a set of named constants. Numeric enums auto-increment, string enums require explicit values. Prefer const enums for tree-shaking.",
    code: `// Numeric enum (auto-increment from 0)
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right   // 3
}

let dir: Direction = Direction.Up;

// String enum (must specify all values)
enum Status {
  Pending = "PENDING",
  Success = "SUCCESS",
  Error = "ERROR"
}

// Const enum (no runtime code, inlined at compile time)
const enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

let red: Color = Color.Red;  // Inlined as "#FF0000"

// Heterogeneous enum (mixed - avoid!)
enum Mixed {
  No = 0,
  Yes = "YES"
}`,
    note: "Prefer string enums for clarity and debuggability. Use const enums for better tree-shaking. Avoid heterogeneous enums.",
  },
  {
    id: "literal-types",
    category: "Basics",
    badgeClass: "badge-blue",
    title: "Literal Types",
    desc: "Literal types represent exact values instead of general types. Combine with unions to create precise type definitions.",
    code: `// String literals
type Alignment = "left" | "center" | "right";
let align: Alignment = "center";  // OK
// align = "top";  // Error: not in union

// Numeric literals
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3;

// Boolean literals (less common)
type AlwaysTrue = true;
let mustBeTrue: AlwaysTrue = true;
// mustBeTrue = false;  // Error

// Template literal types (TS 4.1+)
type EventName = "click" | "focus" | "blur";
type EventHandler = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus" | "onBlur"

// Combining literals with interfaces
interface Config {
  mode: "development" | "production";
  port: 3000 | 8080;
}`,
    note: "Literal types are perfect for configuration objects, API responses, and state machines. Template literal types unlock powerful string manipulation at the type level.",
  },
  {
    id: "never-unknown",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "never & unknown",
    desc: "'never' represents values that never occur (unreachable code). 'unknown' is a type-safe alternative to 'any' - must narrow before use.",
    code: `// never - for exhaustive checks
type Shape = { kind: "circle" } | { kind: "square" };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return 0;
    case "square": return 0;
    default:
      // If you add a new shape and forget to handle it,
      // this will be a compile error
      const _exhaustive: never = shape;
      throw new Error("Unhandled shape");
  }
}

// unknown - type-safe any
function processValue(value: unknown) {
  // Can't use value directly
  // console.log(value.toString());  // Error

  // Must narrow first
  if (typeof value === "string") {
    console.log(value.toUpperCase());  // OK
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));     // OK
  }
}

// never for functions that never return
function throwError(msg: string): never {
  throw new Error(msg);
}`,
    note: "Use 'never' for exhaustive checks in switch statements. Use 'unknown' instead of 'any' when you need to handle arbitrary values safely.",
  },
  {
    id: "mapped-types",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "Mapped Types",
    desc: "Mapped types transform properties of existing types. Loop over keys and apply transformations. Foundation of utility types.",
    code: `// Make all properties optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties readonly
type Readonly<T> = {
  [K in keyof T]: readonly T[K];
};

// Custom mapped type - add 'get' prefix
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }

// Conditional mapped types
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Filter properties by type
type StringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};`,
    note: "Mapped types are incredibly powerful for code generation and type transformations. Master them to build advanced type utilities.",
  },
  {
    id: "conditional-types",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "Conditional Types",
    desc: "Conditional types select types based on conditions. Use 'extends' keyword with ternary syntax: T extends U ? X : Y.",
    code: `// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;   // true
type B = IsString<number>;   // false

// Extract non-nullable types
type NonNullable<T> = T extends null | undefined ? never : T;

type C = NonNullable<string | null>;  // string

// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() { return { id: 1, name: "Alice" }; }
type User = ReturnType<typeof getUser>;  // { id: number; name: string }

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StrOrNumArray = ToArray<string | number>;
// string[] | number[] (not (string | number)[])

// infer keyword - extract types
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type Result = UnpackPromise<Promise<string>>;  // string`,
    note: "Conditional types unlock type-level programming. The 'infer' keyword lets you extract and capture types. Essential for advanced type utilities.",
  },
  {
    id: "decorators",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "Decorators",
    desc: "Decorators are annotations that modify classes, methods, properties, or parameters. Enable in tsconfig with 'experimentalDecorators'.",
    code: `// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class User {
  name: string = "Alice";
}

// Method decorator
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}

// Property decorator
function readonly(target: any, key: string) {
  Object.defineProperty(target, key, {
    writable: false
  });
}

class Product {
  @readonly
  price: number = 100;
}`,
    note: "Decorators are experimental but widely used in frameworks like Angular and NestJS. Stage 3 decorators are coming to standard JavaScript.",
  },
  {
    id: "modules-namespaces",
    category: "Basics",
    badgeClass: "badge-blue",
    title: "Modules & Namespaces",
    desc: "TypeScript supports ES6 modules (import/export). Namespaces are older TS-specific feature for organizing code. Prefer modules.",
    code: `// ES6 Modules (preferred)
// user.ts
export interface User {
  id: number;
  name: string;
}

export function getUser(id: number): User {
  return { id, name: "Alice" };
}

// main.ts
import { User, getUser } from "./user";

// Default exports
// utils.ts
export default function log(msg: string) {
  console.log(msg);
}

// main.ts
import log from "./utils";

// Namespaces (older, avoid in new code)
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string) {
      return s.includes("@");
    }
  }
}`,
    note: "Always prefer ES6 modules over namespaces. Namespaces were created before ES6 modules existed. Use them only for declaration merging or legacy code.",
  },
  {
    id: "type-assertions",
    category: "Basics",
    badgeClass: "badge-blue",
    title: "Type Assertions",
    desc: "Type assertions tell TypeScript to treat a value as a specific type. Two syntaxes: 'as' and angle brackets. Use sparingly - doesn't change runtime.",
    code: `// as syntax (preferred in JSX)
let value: any = "hello";
let length: number = (value as string).length;

// Angle bracket syntax (doesn't work in JSX)
let length2: number = (<string>value).length;

// Common use case - DOM elements
const input = document.getElementById("email") as HTMLInputElement;
input.value = "test@example.com";

// Non-null assertion (!)
function getValue(key: string): string | undefined {
  return key;
}

let name = getValue("name")!;  // Assert it's not undefined
// Dangerous - use only when you're 100% sure

// Const assertions
let obj = {
  name: "Alice",
  age: 30
} as const;

// obj.name = "Bob";  // Error: readonly

let arr = [1, 2, 3] as const;  // readonly [1, 2, 3]`,
    note: "Type assertions are escape hatches. They don't change runtime behavior. Use const assertions for immutable literals and known values.",
  },
  {
    id: "classes",
    category: "Basics",
    badgeClass: "badge-blue",
    title: "Classes & Access Modifiers",
    desc: "TypeScript classes support access modifiers (public, private, protected), abstract classes, and implements for interfaces.",
    code: `class User {
  public id: number;           // accessible anywhere (default)
  private password: string;    // only within this class
  protected email: string;     // this class + subclasses
  readonly created: Date;      // immutable after initialization

  constructor(id: number, password: string, email: string) {
    this.id = id;
    this.password = password;
    this.email = email;
    this.created = new Date();
  }

  private hashPassword(): string {
    return "hashed_" + this.password;
  }

  login(pwd: string): boolean {
    return this.hashPassword() === "hashed_" + pwd;
  }
}

// Shorthand - parameter properties
class Product {
  constructor(
    public id: number,
    private price: number,
    readonly name: string
  ) {}
}

// Abstract classes
abstract class Animal {
  abstract makeSound(): void;  // must be implemented
  
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound() { console.log("Woof!"); }
}`,
    note: "TypeScript's private/protected are compile-time only. For true privacy, use JavaScript's # private fields. Parameter properties are great for reducing boilerplate.",
  },
  {
    id: "declaration-files",
    category: "Advanced",
    badgeClass: "badge-purple",
    title: "Declaration Files (.d.ts)",
    desc: "Declaration files provide type definitions for JavaScript libraries. Use declare keyword for ambient declarations.",
    code: `// types.d.ts - ambient type declarations
declare module "my-library" {
  export function greet(name: string): string;
  export const version: string;
}

// Global variable declarations
declare const API_URL: string;
declare const VERSION: number;

// Augmenting existing types
// express-custom.d.ts
import "express";

declare module "express" {
  interface Request {
    user?: {
      id: number;
      name: string;
    };
  }
}

// Now req.user is typed
app.get("/", (req, res) => {
  console.log(req.user?.name);  // TypeScript knows about user
});

// Triple-slash directives
/// <reference path="./types.d.ts" />
/// <reference types="node" />`,
    note: "Use @types packages from DefinitelyTyped for popular libraries. Create .d.ts files for custom JavaScript libraries or to augment existing types.",
  },
  {
    id: "tsconfig",
    category: "Configuration",
    badgeClass: "badge-green",
    title: "tsconfig.json",
    desc: "TypeScript configuration file. Controls compiler options, file inclusion/exclusion, and project structure.",
    code: `{
  "compilerOptions": {
    // Language & Environment
    "target": "ES2022",                // JS version to emit
    "lib": ["ES2022", "DOM"],          // Built-in type definitions
    "jsx": "react-jsx",                // JSX compilation
    
    // Modules
    "module": "ESNext",                // Module system
    "moduleResolution": "bundler",     // How TS resolves imports
    "baseUrl": ".",                    // Base for relative imports
    "paths": {                         // Path aliases
      "@/*": ["./src/*"]
    },
    
    // Type Checking
    "strict": true,                    // Enable all strict checks
    "noImplicitAny": true,             // Error on implicit any
    "strictNullChecks": true,          // null/undefined checks
    "strictFunctionTypes": true,       // Function param checks
    "noUnusedLocals": true,            // Warn on unused variables
    "noUnusedParameters": true,        // Warn on unused params
    
    // Emit
    "outDir": "./dist",                // Output directory
    "sourceMap": true,                 // Generate .map files
    "declaration": true,               // Generate .d.ts files
    "removeComments": true,            // Strip comments
    
    // Interop
    "esModuleInterop": true,           // Better CJS/ESM interop
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    
    // Skip Checking
    "skipLibCheck": true               // Skip .d.ts type checking
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
    note: "Start with 'strict: true' for new projects. Use 'paths' for cleaner imports. Enable 'skipLibCheck' to speed up compilation.",
  },
  {
    id: "react-with-ts",
    category: "Integration",
    badgeClass: "badge-green",
    title: "React with TypeScript",
    desc: "Type React components with props, state, events, and hooks. Use FC type or function declarations.",
    code: `import { useState, useEffect } from "react";

// Props interface
interface UserCardProps {
  name: string;
  age: number;
  email?: string;
  onUpdate?: (name: string) => void;
}

// Function component with props
function UserCard({ name, age, email, onUpdate }: UserCardProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("Mounted");
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
    onUpdate?.(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <h1>{name}</h1>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

export default UserCard;`,
    note: "Use React.FC sparingly - it's often better to type props directly. TypeScript infers event types from the element (e.g., onChange on input).",
  },
  {
    id: "best-practices",
    category: "Patterns",
    badgeClass: "badge-orange",
    title: "TypeScript Best Practices",
    desc: "Write maintainable TypeScript: prefer inference, avoid any, use const assertions, and leverage utility types.",
    code: `// ✅ Prefer type inference
const user = { id: 1, name: "Alice" };  // Type inferred

// ❌ Don't over-annotate
const user2: { id: number; name: string } = { id: 1, name: "Alice" };

// ✅ Use unknown instead of any
function parse(json: string): unknown {
  return JSON.parse(json);
}

// ✅ Const assertions for literal types
const routes = {
  home: "/",
  about: "/about"
} as const;

type Routes = typeof routes;  // { readonly home: "/"; readonly about: "/about" }

// ✅ Use discriminated unions for state
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// ✅ Prefer interfaces for objects, types for unions
interface User { name: string; }
type Status = "active" | "inactive";

// ✅ Use branded types for type safety
type UserId = number & { readonly brand: unique symbol };
type ProductId = number & { readonly brand: unique symbol };

function getUser(id: UserId) {}
// getUser(123);  // Error - number is not UserId`,
    note: "Enable 'strict' mode. Avoid 'any' like the plague. Use const assertions and branded types for extra safety. TypeScript is a tool - use it wisely.",
  },
];

export default function TypeScriptPage() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #3178c6 0%, #235a97 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          TypeScript Concepts
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>
          Complete TypeScript reference: types, interfaces, generics, utility
          types, decorators, and{" "}
          <span style={{ color: "var(--blue)", fontWeight: 600 }}>
            20+ more concepts
          </span>
          .
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {concepts.map((concept) => (
          <article
            key={concept.id}
            id={concept.id}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "1.5rem",
              scrollMarginTop: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span
                className={concept.badgeClass}
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {concept.category}
              </span>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                {concept.title}
              </h2>
            </div>

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              {concept.desc}
            </p>

            <CodeBlock language="typescript" code={concept.code} />

            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "var(--surface-elevated)",
                borderLeft: "3px solid var(--blue)",
                borderRadius: "6px",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                <strong style={{ color: "var(--blue)" }}>💡 Key Point:</strong>{" "}
                {concept.note}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
