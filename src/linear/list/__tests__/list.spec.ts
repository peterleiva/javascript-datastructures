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

		it("keep items on original list", () => {
			expect([...list.head(items.length)]).toStrictEqual(items);

			list.head();
			expect([...list]).toStrictEqual(items);
		});

		describe("missing length", () => {
			it("return null when list is empty", () => {
				const list = new List();
				expect(list.head()).toBeNull();
			});

			it("head returns non-list type", () => {
				expect(list.head()).not.toBeInstanceOf(List);
			});

			it("extract first element", () => {
				expect(list.head()).toBe(items[0]);
			});
		});

		describe("with length argument", () => {
			it("head returns list when length is specified", () => {
				expect(list.head(2)).toBeInstanceOf(List);
			});

			it("extract whole list when length >= n", () => {
				expect([...list.head(items.length + 1)]).toStrictEqual(items);
				expect([...list.head(items.length)]).toStrictEqual(items);
			});

			it("extract elements with length argument", () => {
				expect([...list.head(2)]).toEqual([items[0], items[1]]);
			});

			it("extract empty list when length is 0", () => {
				expect(list.head(0)).toHaveLength(0);
			});

			it("extract list with first item when length = 1", () => {
				expect([...list.head(1)]).toStrictEqual([items[0]]);
			});

			it("throws ArgumentError when length is negative", () => {
				expect(() => list.head(-1)).toThrow(ArgumentError);
			});
		});
	});

	describe(".last", () => {
		let list: List<number>;
		const data = [1, 2, 3, 4];

		beforeEach(() => {
			list = new List(...data);
		});

		it("extract the last element of the list", () => {
			expect(list.last()).toBe(data[data.length - 1]);
		});

		it("extract last n items", () => {
			const tail = list.last(3);
			expect([...tail]).toStrictEqual([2, 3, 4]);
		});

		it("returns whole list for length = n", () => {
			const data = [1, 2, 3];
			expect(list.last(data.length)).toStrictEqual(data);
		});

		it("extract empty list when length is 0", () => {
			expect(list.last(0)).toHaveLength(0);
		});

		it.skip("throws ArgumentError when length is negative", () => {
			expect(list.last(-1)).toThrow(Underflow);
		});

		it("returns list with last element when length = 1", () => {
			const tail = list.last(1);
			expect([...tail]).toStrictEqual([data[data.length - 1]]);
		});
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
