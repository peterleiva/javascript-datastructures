import List from "../list";
import { IndexOutOfRange } from "linear/errors";

describe.skip("Removing items from list", () => {
	let list: List<unknown>;

	beforeEach(() => (list = new List()));

	describe("Removing with index", () => {
		describe("Throws IndexOutOfRangeException when", () => {
			it("List is empty", () => {
				expect(() => list.remove(0)).toThrow(IndexOutOfRange);
			});

			it("Index is the length of the list", () => {
				list.push(1);
				expect(() => list.remove(1)).toThrow(IndexOutOfRange);
			});

			it("Index is -1", () => {
				expect(() => list.remove(-1)).toThrow(IndexOutOfRange);
			});
		});

		describe("Delete Successfully", () => {
			beforeEach(() => {
				list.append(1, 2, 3);
			});

			it("Decrease list size", () => {
				list.remove(0);
				expect(list.size()).toBe(2);
			});

			it("Remove the first element", () => {
				list.remove(0);
				expect([...list]).toStrictEqual([2, 3]);
			});

			it("Returns the item deleted", () => {
				expect(list.remove(0)).toBe(1);
			});

			it("Remove the last item", () => {
				list.remove(list.length - 1);
				expect([...list]).toStrictEqual([1, 2]);
			});

			it("Remove middle item", () => {
				list.remove(1);
				expect([...list]).toStrictEqual([1, 3]);
			});

			it("Remove all items", () => {
				list.remove(0);
				list.remove(0);
				list.remove(0);

				expect([...list]).toStrictEqual([]);
			});

			it("Remove successive operations", () => {
				list.remove(2);
				list.remove(0);
				expect([...list]).toStrictEqual([2]);
			});
		});
	});

	describe("Removing with comparator function", () => {
		const alwaysTrueComparable = jest.fn(() => () => true);
		const trueIfOne = jest.fn(data => data === 1);

		describe("Empty list", () => {
			beforeEach(() => {
				list.remove(alwaysTrueComparable);
			});

			it("Returns empty array", () => {
				expect(list.remove(alwaysTrueComparable)).toStrictEqual([]);
			});

			it("Keeps List empty", () => {
				expect([...list]).toStrictEqual([]);
			});

			it("Keeps size equals to 1", () => {
				expect(list.size()).toBe(0);
			});
		});

		describe("Non-empty list", () => {
			beforeEach(() => {
				list.append(1, 2, 3, 4);
			});

			it.only("Remove all list items", () => {
				list.remove(alwaysTrueComparable());
				// expect([...list]).toStrictEqual([]);
			});

			it.todo("Returns empty array after second run");
			it.todo("Returns empty array when doesn't match");
			it.todo("Returns array with all matched items");
			it.todo("Remove all items from the list");
			it.todo("Decrease list size by elements matched");
			it.todo("Remove all sparsed items");
		});
	});

	describe("Removing with comparable data", () => {});
});
