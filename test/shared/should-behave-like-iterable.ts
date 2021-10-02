import { Iterable } from "iterable";
import { shouldBehaveLike } from "should-behave-like";

export function shouldBehaveLikeIterable<T>(collection: Iterable<T>): void {
	shouldBehaveLike("iterable", () => {
		it("keys returns indices from collection", () => {
			expect([...collection.keys()]).toMatchSnapshot();
		});

		it("values returns values of collection", () => {
			expect([...collection.values()]).toMatchSnapshot();
		});

		it("entries return tuple of index and values", () => {
			expect([...collection.entries()]).toMatchSnapshot();
		});

		it("must be iterator", () => {
			expect(collection[Symbol.iterator]).toBeInstanceOf(Function);
			expect([...collection]).toMatchSnapshot();
		});
	});
}
