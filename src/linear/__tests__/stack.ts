import Stack, { StackUnderflow } from "../stack";

describe("Stack", () => {
	let stack: Stack<unknown>;

	beforeEach(() => (stack = new Stack()));

	describe("Methods", () => {
		describe("Initiating", () => {
			it("push in order of arguments", () => {
				const items = [1, 2, 3, 4];
				const stack = new Stack(...items);
				expect([...stack]).toEqual(items.reverse());
			});
		});

		describe("Iterating", () => {
			it("Gets no items for empty stack", () => {
				expect([...stack]).toEqual([]);
			});

			it("Ordered by LIFO", () => {
				stack.push(1);
				stack.push(2);
				expect([...stack]).toEqual([2, 1]);
			});
		});

		describe("#top", () => {
			it("throws StackUnderflow for empty stack", () => {
				expect(() => stack.top()).toThrow(StackUnderflow);
			});

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
		});

		describe("#pop", () => {
			it("throws StackUnderflow for empty stack", () => {
				expect(() => stack.pop()).toThrow(StackUnderflow);
			});

			it("return last item pushed", () => {
				stack.push(1);
				stack.push(2);

				expect(stack.pop()).toBe(2);
			});

			it("decrease size by 1", () => {
				stack.push(1);
				stack.push(2);
				stack.pop();
				expect(stack.size()).toBe(1);
			});

			it("empty is true for single item", () => {
				stack.push(1);
				stack.pop();
				expect(stack.empty()).toBe(true);
			});

			it("returns single item stored", () => {
				stack.push(1);
				expect(stack.pop()).toBe(1);
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

		describe("#length", () => {
			it("is zero for new stack", () => {
				expect(stack).toHaveLength(0);
			});

			it("is 1 after push", () => {
				stack.push(1);
				expect(stack).toHaveLength(1);
			});

			it("is the number of pushes", () => {
				stack.push(1);
				stack.push("asd");
				stack.push(40);

				expect(stack).toHaveLength(3);
			});
		});
	});
});
