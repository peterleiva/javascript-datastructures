import { shouldBehaveLike } from "should-behave-like";
import { setupCollection, CollectionFactory } from "factory";

export function shouldBehaveLikeCollection(factory: CollectionFactory): void {
	shouldBehaveLike("collection", () => {
		describe("#length", () => {
			it("is zero for empty collection", () => {
				const collection = setupCollection(factory, 0);
				expect(collection).toHaveLength(0);
				expect(collection.size()).toBe(0);
			});

			it("equal to data stored size", () => {
				const collection = setupCollection(factory, 10);
				expect(collection).toHaveLength(10);
				expect(collection.size()).toBe(10);
			});
		});

		describe("#clear", () => {
			it("returns collection", () => {
				const collection = setupCollection(factory, 2);
				expect(collection.clear()).toHaveLength(0);
				expect(collection.empty()).toBe(true);
			});
		});

		describe("#empty", () => {
			it("true for empty collection", () => {
				const collection = setupCollection(factory, 0);
				expect(collection.empty()).toBe(true);
			});

			it("false for non-empty collection", () => {
				const collection = setupCollection(factory, 2);
				expect(collection.empty()).toBe(false);
			});
		});
	});
}
