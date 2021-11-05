import type { StackADT } from "linear/types";
import { Underflow } from "linear/errors";
import { shouldBehaveLike } from "should-behave-like";

interface StackConstructor<T> {
	new (...items: T[]): StackADT<T>;
}

export function shouldBehaveLikeStack(Stack: StackConstructor<unknown>): void {
	let stack: StackADT<unknown>;

	beforeEach(() => (stack = new Stack()));

	shouldBehaveLike("stack", () => {
		describe("#top", () => {
			it("returns single item stored", () => {
				stack.push(1);
				expect(stack.top()).toBe(1);
			});

			it("return last item stored", () => {
				stack.push(1);
				stack.push(2);
				expect(stack.top()).toBe(2);
			});

			it("throws StackUnderflow for empty stack", () => {
				expect(() => stack.top()).toThrow(Underflow);
			});
		});

		describe("#push", () => {
			const item = 1;
			beforeEach(() => stack.push(item));

			it("returns inserted item", () => {
				expect(stack.push(item)).toBe(item);
			});

			it("insert at the top", () => {
				stack.push(2);
				stack.push(item);
				expect(stack.top()).toBe(item);
			});
		});

		describe("#pop", () => {
			it("extract last element pushed", () => {
				stack.push(1);
				stack.push(2);

				expect(stack.pop()).toBe(2);
			});

			it("decrease length by 1", () => {
				stack.push(1);
				stack.push(2);
				stack.pop();
				expect(stack).toHaveLength(1);
			});

			it("empties stack when have single item stored", () => {
				stack.push(1);
				stack.pop();
				expect(stack).toHaveLength(0);
			});

			it("returns single item stored", () => {
				stack.push(1);
				expect(stack.pop()).toBe(1);
			});

			it("throws Underflow for empty stack", () => {
				expect(() => stack.pop()).toThrow(Underflow);
			});
		});
	});
}
