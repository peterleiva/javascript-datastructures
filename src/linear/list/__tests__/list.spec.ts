import { IndexOutOfRange, Underflow } from "linear/errors";
import List from "../list";
import {
	shouldBehaveLikeCollection,
	shouldBehaveLikeIterable,
	shouldBehaveLikeStack,
} from "shared";

describe("List", () => {
	let list: List<unknown>;

	beforeEach(() => {
		list = new List();
	});

	shouldBehaveLikeStack(List);
	shouldBehaveLikeCollection(data => new List(...data));
	shouldBehaveLikeIterable(new List(1, 2, 3));

	describe(".head", () => {
		const items = [10, 20, 30, 40, 50, 60];

		beforeEach(() => {
			list = List.of(items);
		});

		afterEach(() => {
			// eslint-disable-next-line jest/no-standalone-expect
			expect(list).toHaveLength(items.length);
		});

		it("extract the first element of the list when length is missing", () => {
			const head = list.head();

			expect(head).not.toBeInstanceOf(List);
			expect(list.head()).toBe(10);
		});

		it("returns whole list for length = n", () => {
			const heads = list.head(items.length);

			expect(heads).toBeInstanceOf(List);
			expect([...heads]).toEqual(items);
		});

		it("extract n first element of the list", () => {
			expect([...list.head(2)]).toEqual([10, 20]);
		});

		it("extract empty list when length is 0", () => {
			const head = list.head(0);

			expect(head).toBeInstanceOf(List);
			expect(head).toHaveLength(0);
		});

		it.todo("throws ArgumentError when length is negative");
		it("returns list with first element when length = 1", () => {
			const head = list.head(1);

			expect(head).toBeInstanceOf(List);
			expect(head).toHaveLength(1);
			expect(head.top()).toBe(items[0]);
		});
	});

	describe(".last", () => {
		it.todo("extract the last element of the list");
		it.todo("returns whole list for length = n");
		it.todo("extract n last element of the list");
		it.todo("extract empty list when length is 0");
		it.todo("throws ArgumentError when length is negative");
		it.todo("return last element when list length is missing");
		it.todo("returns list with last element when length = 1");
	});

	describe(".insert", () => {
		describe("When Comparable as argument", () => {
			describe("When comparable returns false", () => {
				it.todo("Leaves the list unmodified");
				it.todo("Returns empty array");
			});

			// describe("When comparable returns true", () => {
			// 	// repetir de with index...
			// });
		});

		describe("With index as argument", () => {
			it.todo("Throws IndexOutOfRangeException when index equals list size");
			it.todo("Throws IndexOutOfRangeException when index is negative");
		});
	});

	describe(".get", () => {
		it("throws IndexOutOfRangeException when list is empty", () => {
			expect(() => list.get(0)).toThrow(IndexOutOfRange);
		});

		describe("With stored items", () => {
			beforeEach(() => {
				list.append(1, 2, 3);
			});

			it("throws IndexOutOfRange when index is equal the length", () => {
				expect(() => list.get(list.length)).toThrow(IndexOutOfRange);
			});

			it("throws IndexOutOfRange when index is negative", () => {
				expect(() => list.get(-1)).toThrow(IndexOutOfRange);
			});

			it("Get item at 0", () => {
				expect(list.get(0)).toBe(1);
			});

			it("Get the last item", () => {
				expect(list.get(list.length - 1)).toBe(3);
			});

			it("Get the non-extremity item", () => {
				expect(list.get(1)).toBe(2);
			});
		});
	});

	describe(".tail", () => {
		it("Throws Underflow when list is empty", () => {
			expect(() => list.tail()).toThrow(Underflow);
		});

		it("Returns list of all items but the first", () => {
			const items = [1, 2, 3, 4, 5];
			const tail = list.append(...items).tail();

			expect([...tail]).toStrictEqual([2, 3, 4, 5]);
		});

		it("Get empty list when one item is stored", () => {
			list.push(1);
			expect(list.tail()).toHaveLength(0);
		});

		it("Get the list with last item when length = 2", () => {
			const tail = list.append(1, 2).tail();

			expect(tail).toHaveLength(1);
			expect([...tail]).toStrictEqual([2]);
		});

		it("Do not modify the list", () => {
			list.append(1, 2);
			list.tail();
			expect([...list]).toStrictEqual([1, 2]);
			expect(list).toHaveLength(2);
		});
	});

	describe(".indexOf", () => {
		const list: List<string> = new List();

		beforeAll(() => list.append(..."dccba"));

		it("Returns index of last item", () => {
			expect(list.indexOf("a")).toBe(list.length - 1);
		});

		it("Returns index of first item", () => {
			expect(list.indexOf("d")).toBe(0);
		});

		it("Returns -1 for inexsistent item", () => {
			expect(list.indexOf("jf")).toBe(-1);
		});

		it("Index for the first apparition of the item", () => {
			expect(list.indexOf("c")).toBe(1);
		});
	});

	describe(".shift", () => {
		it("Throws EmptyListException when empty", () => {
			expect(() => list.shift()).toThrow(Underflow);
		});

		it("Decrease length by 1", () => {
			list.append(1, 2);
			list.shift();
			expect(list).toHaveLength(1);
		});

		it("Returns the first item of the list", () => {
			list.append(1, "2");
			expect(list.shift()).toBe(1);
		});

		it("Leaves list empty when has a single item", () => {
			list.push(1);
			list.shift();
			expect(list.empty()).toBe(true);
		});

		it("Leaves list without first item", () => {
			list.append(1, 2, 3);
			list.shift();
			expect([...list]).toStrictEqual([2, 3]);
		});
	});

	describe(".append", () => {
		it("returns the own list reference", () => {
			const l = new List();
			expect(l.append(1)).toBe(l);
		});

		it("mutates list", () => {
			const l = new List(1, 2, 3);
			l.append(4, 5);
			expect([...l]).toEqual([1, 2, 3, 4, 5]);
		});

		it("adds items ordered by argument order", () => {
			const l = new List();
			l.append(3, 4, 5);
			expect([...l]).toEqual([3, 4, 5]);
		});
	});
});
