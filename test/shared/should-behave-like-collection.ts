import { shouldBehaveLike } from "should-behave-like";
import type { Collection } from "types";

interface CollectionConstructor {
	new (...items: unknown[]): Collection;
}
export function shouldBehaveLikeCollection(
	Collection: CollectionConstructor
): void {
	shouldBehaveLike("collection", () => {
		describe("#length", () => {
			it("is zero for new collection", () => {
				const collection = new Collection();
				expect(collection).toHaveLength(0);
			});

			it("Returns 1 after creating with argument", () => {
				const collection = new Collection(1);
				expect(collection).toHaveLength(1);
			});

			it("is the number of pushes", () => {
				const collection = new Collection(1, "abc", 3);
				expect(collection).toHaveLength(3);
			});
		});

		describe("#clear", () => {
			it("returns collection", () => {
				const c = new Collection(1, 2, 3);
				expect(c.clear()).toBe(c);
			});

			it("removes all elements", () => {
				const c = new Collection(1, 2, 3);
				c.clear();

				expect(c).toHaveLength(0);
			});
		});
	});
}
