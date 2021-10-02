import List from "../list";
import { IndexOutOfRangeException } from "../errors";
import { Underflow } from "../../errors";

describe("List", () => {
	let list: List<unknown>;

	beforeEach(() => {
		list = new List();
	});

	describe(".keys", () => {
		it("Get empty array when list is empty", () => {
			expect([...list.keys()]).toEqual([]);
		});

		it("Get list of index of stored items", () => {
			list.append(1, 2, 3);
			expect([...list.keys()]).toEqual([0, 1, 2]);
		});

		it("Iterate over indexes", () => {
			let index = 0;
			list.append(1, 2, 3);
			for (const i of list.keys()) {
				expect(i).toBe(index);
				index++;
			}
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

	describe(".values", () => {
		it("Get empty array when list is empty", () => {
			expect([...list.values()]).toEqual([]);
		});

		it("Get list of items", () => {
			list.append(1, 2, 3);
			expect([...list.values()]).toEqual([1, 2, 3]);
		});

		it("Iterate over values", () => {
			let index = 0;
			list.append(1, 2, 3);
			for (const value of list.values()) {
				expect(value).toBe(list.get(index));
				index++;
			}
		});
	});

	describe(".entries", () => {
		it("Get empty array when list is empty", () => {
			expect([...list.entries()]).toEqual([]);
		});

		it("Get list of same stored items", () => {
			list.append(1, 2, 3);

			expect([...list.entries()]).toEqual([
				[0, 1],
				[1, 2],
				[2, 3],
			]);
		});

		it("Iterate over entries of list", () => {
			let i = 0;
			list.append(1, 2, 3);

			for (const [index, item] of list.entries()) {
				expect([index, item]).toEqual([i, list.get(index)]);
				i++;
			}
		});
	});

	describe(".get", () => {
		it("throws IndexOutOfRangeException when list is empty", () => {
			expect(() => list.get(0)).toThrow(IndexOutOfRangeException);
		});

		describe("With stored items", () => {
			beforeEach(() => {
				list.append(1);
			});

			it("throws IndexOutOfRangeException when index is equal the length", () => {
				expect(() => list.get(list.length)).toThrow(IndexOutOfRangeException);
			});

			it("throws IndexOutOfRangeException when index is negative", () => {
				expect(() => list.get(-1)).toThrow(IndexOutOfRangeException);
			});

			it("Get the correct item when is between bound", () => {
				expect(list.get(0)).toBe(1);
			});
		});
	});

	describe(".remove", () => {
		describe("Empty list", () => {
			it("Throw IndexOutOfRangeException", () => {
				expect(() => list.remove(0)).toThrow(IndexOutOfRangeException);
			});
		});

		describe("single element", () => {
			beforeEach(() => {
				list.append(1);
			});

			it("Remove all elements", () => {
				list.remove(0);
				expect([...list]).toEqual([]);
			});

			it("Get 0 length", () => {
				list.remove(0);
				expect(list).toHaveLength(0);
			});
		});

		describe("More than 1 element", () => {
			beforeEach(() => {
				list.append(1).append(2);
			});

			it("Decrease length by 1", () => {
				list.remove(0);
				expect(list).toHaveLength(1);
			});

			it("Get the element removed", () => {
				list.append(3);
				expect(list.remove(2)).toBe(3);
			});

			it("Remove tail element", () => {
				list.remove(1);
				expect([...list]).toEqual([1]);
			});

			it("Remove head element", () => {
				list.remove(0);
				expect([...list]).toEqual([2]);
			});

			it("Remove the between head and tail", () => {
				list.append(3);
				list.remove(1);
				expect([...list]).toEqual([1, 3]);
			});
		});
	});

	describe(".tail", () => {
		it("Get null when list is empty", () => {
			expect(list.tail()).toBeNull();
		});

		it("Get single element stored", () => {
			list.append(1);
			expect(list.tail()).toBe(1);
		});

		it("Get the last element", () => {
			list.append(1, 2, 3, 4);
			expect(list.tail()).toBe(list.get(list.length - 1));
		});

		it("Do not modify the list", () => {
			list.append(1, 2);
			list.tail();
			expect([...list]).toStrictEqual([1, 2]);
		});
	});

	describe(".push", () => {
		it("Increase length by 1", () => {
			list.push(1);
			expect(list).toHaveLength(1);
		});

		it("Store a single data in the list", () => {
			list.push(1);
			expect([...list]).toStrictEqual([1]);
		});

		it("Insert at the end if already has elements", () => {
			list.push(1);
			list.push(2);
			expect([...list]).toStrictEqual([1, 2]);
		});
	});

	describe(".contains", () => {
		describe("Returns false When", () => {
			it("List is empty", () => {
				expect(list.contains(10)).toBe(false);
			});

			it("Don't stored the item", () => {
				list.push(1);
				expect(list.contains(10)).toBe(false);
			});

			it("Don't have the same type", () => {
				list.push(1);
				expect(list.contains("1")).toBe(false);
			});
		});

		describe("Returns true when", () => {
			it("Is at the start", () => {
				list.append(1, 2, 3);
				expect(list.contains(1)).toBe(true);
			});

			it("Item is at the end", () => {
				list.append(1, 2, 3);
				expect(list.contains(3)).toBe(true);
			});

			it("Has more than 1 instance stored", () => {
				list.append(1, "2", 3, "2");
				expect(list.contains("2")).toBe(true);
			});
		});
	});

	describe(".size", () => {
		it("Is 0 when list is empty", () => {
			expect(list.size()).toBe(0);
		});

		it("Is equals length", () => {
			list.append(1, 2);
			expect(list.length === list.size()).toBe(true);
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

	describe(".clear", () => {
		it("get length = 0", () => {
			list.append(1, 2, 3);
			list.clear();

			expect(list).toHaveLength(0);
		});

		it("Remove all elements", () => {
			list.append(1, 2, 3);
			list.clear();
			expect([...list]).toEqual([]);
		});
	});

	describe(".pop", () => {
		it("Throws EmptyListException when list is empty", () => {
			expect(() => list.pop()).toThrow(Underflow);
		});

		it("Leaves list empty when has single element", () => {
			list.push(1);
			list.pop();

			expect(list.empty()).toBe(true);
		});

		it("Decrease element by 1", () => {
			list.append(1, 2);
			list.pop();
			expect(list).toHaveLength(1);
		});

		it("Returns the last element", () => {
			list.append(1, 2);

			expect(list.pop()).toBe(2);
		});

		it("Remove the last element from the list", () => {
			list.append(1, "2");
			list.pop();
			expect([...list]).toStrictEqual([1]);
		});
	});

	describe(".dequeue", () => {
		it("Throws EmptyListException when empty", () => {
			expect(() => list.dequeue()).toThrow(Underflow);
		});

		it("Decrease length by 1", () => {
			list.append(1, 2);
			list.dequeue();
			expect(list).toHaveLength(1);
		});

		it("Returns the first item of the list", () => {
			list.append(1, "2");
			expect(list.dequeue()).toBe("2");
		});

		it("Leaves list empty when has a single item", () => {
			list.push(1);
			list.dequeue();
			expect(list.empty()).toBe(true);
		});

		it("Leaves list without first item", () => {
			list.push(3);
			list.push(2);
			list.push(1);
			list.dequeue();
			expect([...list]).toStrictEqual([2, 3]);
		});
	});

	describe(".at", () => {
		it("Throws Underflow when list is empty", () => {
			expect(() => list.at(10)).toThrow(Underflow);
		});

		it("Throws Exception when index n", () => {
			list.push(1);
			expect(() => list.at(1)).toThrow(IndexOutOfRangeException);
		});

		it("Throws IndexOutOfRangeException when index is -(n + 1)", () => {
			list.push(1);

			expect(() => list.at(-2)).toThrow(IndexOutOfRangeException);
		});

		it("Get the first item when index = 0", () => {
			list.push(1);

			expect(list.at(0)).toBe(1);
		});

		it("Get the last item when index is the n - 1", () => {
			list.append(1, 2);
			expect(list.at(list.length - 1)).toBe(2);
		});

		it("Get last item when index = -1", () => {
			list.append(1, 2);
			expect(list.at(-1)).toBe(2);
		});

		it("Get last item when index = -n", () => {
			list.append(1, 4);
			expect(list.at(-list.length)).toBe(1);
		});

		it("Get the correct item from the index", () => {
			list.append(1, 2, 3);
			expect(list.at(2)).toBe(3);
		});
	});
});
