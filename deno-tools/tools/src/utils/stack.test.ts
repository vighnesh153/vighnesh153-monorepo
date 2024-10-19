import { assertEquals, assertNotStrictEquals, assertThrows } from "@std/assert";
import { Stack } from "./stack.ts";

Deno.test("stack.toArray", () => {
  const stack = new Stack(1, 2, 3, 4);
  assertEquals(stack.toArray(), [1, 2, 3, 4]);
});

Deno.test("stack.push", () => {
  const stack = new Stack(1);
  stack.push(2, 3);
  assertEquals(stack.toArray(), [1, 2, 3]);
});

Deno.test("stack.pop removes element from stack", () => {
  const stack = new Stack(1, 2, 3, 4, 5, 6);
  stack.pop();
  assertEquals(stack.toArray(), [1, 2, 3, 4, 5]);
});

Deno.test("stack.pop returns element", () => {
  const stack = new Stack(1, 2, 3, 4);
  const poppedElement = stack.pop();
  assertEquals(poppedElement, 4);
});

Deno.test("stack.pop throws when empty", () => {
  const stack = new Stack();
  assertThrows(() => stack.pop(), "Stack is empty");
});

Deno.test("stack.peek returns element", () => {
  const stack = new Stack(1, 2, 3);
  const peekedElement = stack.peek();
  assertEquals(peekedElement, 3);
});

Deno.test("stack.peek doesn't mutate stack", () => {
  const stack = new Stack(1, 2, 3);
  stack.peek();
  assertEquals(stack.toArray(), [1, 2, 3]);
});

Deno.test("stack.peek throws when empty", () => {
  const stack = new Stack();
  assertThrows(() => stack.peek(), "Stack is empty");
});

Deno.test("stack.size is 0 if stack is empty", () => {
  const stack = new Stack();
  assertEquals(stack.size, 0);
});

Deno.test("stack.stack returns correct size", () => {
  const stack = new Stack(1, 2, 3, 4);
  assertEquals(stack.size, 4);
});

Deno.test("stack.reverse", () => {
  const stack = new Stack(1, 2, 3, 4);
  const reversedStack = stack.reverse();
  assertEquals(reversedStack.toArray(), [4, 3, 2, 1]);
});

Deno.test("stack.reverse shouldn't mutate original stack", () => {
  const stack = new Stack(1, 2, 3, 4);
  stack.reverse();
  assertEquals(stack.toArray(), [1, 2, 3, 4]);
});

Deno.test("stack.clone", () => {
  const stack = new Stack(1, 2, 3, 4);
  const clonedStack = stack.clone();

  // reference inequality
  assertNotStrictEquals(clonedStack, stack);
  // content equality
  assertEquals(clonedStack.toArray(), [1, 2, 3, 4]);
});

Deno.test("stack.clone custom callback", () => {
  const stack = new Stack({ a: 1 });
  const clonedStack = stack.clone((e) => ({ ...e }));

  // reference inequality
  assertNotStrictEquals(clonedStack.peek(), stack.peek());
  // content equality
  assertEquals(clonedStack.peek(), stack.peek());
});

Deno.test("stack.map", () => {
  const stack = new Stack(1, 2, 3);
  const squaresStack = stack.map((e) => e * e);
  assertEquals(squaresStack.toArray(), [1, 4, 9]);
});

Deno.test("stack.clone no mapper", () => {
  const stack = new Stack(1, 2, 3);
  const newStack = stack.map();
  assertEquals(newStack.toArray(), [1, 2, 3]);
});

Deno.test("stack.filter", () => {
  const stack = new Stack(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  const evens = stack.filter((e) => e % 2 === 0);
  assertEquals(evens.toArray(), [2, 4, 6, 8, 10]);
});

Deno.test("stack.filter no predicate", () => {
  const stack = new Stack(1, 2, 3);
  const filteredStack = stack.filter();
  assertEquals(filteredStack.toArray(), [1, 2, 3]);
});
