import { Stack } from "linear";
import { Underflow } from "linear/errors";
import { shouldBehaveLikeCollection } from "shared";
import { shouldBehaveLike } from "should-behave-like";

interface StackConstructor<T> {
	new (...items: T[]): Stack<T>;
}

export function shouldBehaveLikeStack(Stack: StackConstructor<unknown>): void {
	let stack: Stack<unknown>;

	beforeEach(() => (stack = new Stack()));

	shouldBehaveLike("stack", () => {
		shouldBehaveLikeCollection(Stack);

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

			it("size remains the same", () => {
				stack.push(1);
				stack.push(2);
				expect(stack.size()).toBe(2);
			});

			it("throws StackUnderflow for empty stack", () => {
				expect(() => stack.top()).toThrow(Underflow);
			});
		});

		describe("#push", () => {
			const item = 1;
			beforeEach(() => stack.push(item));

			it("size is equal to 1 for empty stack", () => {
				expect(stack.size()).toBe(1);
			});

			it("increase size by 1", () => {
				stack.push(2);
				expect(stack.size()).toBe(2);
			});

			it("empty is false", () => {
				expect(stack.empty()).toBe(false);
			});

			it("ordered iteration is LIFO", () => {
				stack.push(2);
				expect([...stack]).toEqual([2, item]);
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
				expect(stack.empty()).toBe(true);
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
