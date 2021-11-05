/* eslint-disable jest/expect-expect */
import { shouldBehaveLike } from "should-behave-like";
import { Traversable, TraversalMethod } from "tree";

type TraversableFactory = {
	(data: number[]): Traversable<number>;
};

export function shouldBehaveLikeTraversable(factory: TraversableFactory): void {
	const data = [12, 7, 74, 92, 59];
	const walker = jest.fn(data => data);

	const traversable = factory(data);

	shouldBehaveLike("traversable", () => {
		let traversed: number[];
		let result: number[];

		beforeEach(() => {
			walker.mockReset();
		});

		test("walk tree pre order", () => {
			result = [12, 7, 74, 59, 92];
			traversed = traversable.traverse(walker, TraversalMethod.PREORDER);
		});

		test("walk tree in order", () => {
			result = data.sort((a, b) => a - b);
			traversed = traversable.traverse(walker, TraversalMethod.INORDER);
		});

		test("walk tree post order", () => {
			result = [7, 59, 92, 74, 12];
			traversed = traversable.traverse(walker, TraversalMethod.POSTORDER);
		});

		afterEach(() => {
			expect(walker).toHaveBeenCalledTimes(result.length);

			for (const [index, item] of result.entries()) {
				expect(walker).toHaveBeenNthCalledWith(index + 1, item);
			}

			expect(traversed).toStrictEqual(result);
		});
	});
}
