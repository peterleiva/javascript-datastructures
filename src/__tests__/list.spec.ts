import { ListOutOfRange } from 'src/list/errors';
import { List } from 'src/list';

describe('List', () => {
	let list: List<unknown>;

	beforeEach(() => {
		list = new List();
	});

	describe('.append', () => {
		describe('with empty list', () => {
			it('insert at the end', () => {
				list.append(1);
				expect([...list]).toEqual([1]);
			});

			it('Length is equal to 1', () => {
				list.append(1);
				expect(list.length).toBe(1);
			});
		});

		describe('With list of argument', () => {
			it('Add in correct order they are called', () => {
				list.append(1, 2);
				expect([...list]).toEqual([1, 2]);
			});

			it('Increase by the length of items added', () => {
				list.append(1, 2, 3);
				expect(list.length).toEqual(3);
			});
		});
		describe('without empty list', () => {
			beforeEach(() => {
				list.append(1, 2);
			});

			it('Insert at the end', () => {
				list.append(3);
				expect([...list]).toEqual([1, 2, 3]);
			});

			it('Length increase by 1', () => {
				list.append(3);
				expect(list.length).toBe(3);
			});
		});
	});

	describe('.prepend', () => {
		describe('With empty list', () => {
			it('Get length is equal to 1', () => {
				list.prepend(1);
				expect(list.length).toBe(1);
			});

			it('Get [1] for stored items', () => {
				list.prepend(1);
				expect([...list]).toEqual([1]);
			});
		});

		describe('Without empty list', () => {
			beforeEach(() => {
				list.prepend(1);
			});

			it('Increse length by 1', () => {
				list.prepend(2);
				expect(list.length).toBe(2);
			});

			it('Insert item at the beginning', () => {
				list.prepend(2);
				expect([...list]).toEqual([2, 1]);
			});
		});

		describe('With list as argument', () => {
			it('Prepend list as order of call', () => {
				list.prepend(1, 2, 3);
				expect([...list]).toEqual([1, 2, 3]);
			});

			it('Insert at beggining for already inserted items', () => {
				list.append(4);
				list.prepend(1, 2, 3);
				expect([...list]).toEqual([1, 2, 3, 4]);
			});

			it('Increase length by added size', () => {
				list.prepend(1, 2, 3);
				expect(list.length).toBe(3);
			});
		});
	});

	describe('.keys', () => {
		it('Get empty array when list is empty', () => {
			expect([...list.keys()]).toEqual([]);
		});

		it('Get list of index of stored items', () => {
			list.append(1, 2, 3);
			expect([...list.keys()]).toEqual([0, 1, 2]);
		});

		it('Iterate over indexes', () => {
			let index = 0;
			list.append(1, 2, 3);
			for (const i of list.keys()) {
				expect(i).toBe(index);
				index++;
			}
		});
	});

	describe('.values', () => {
		it('Get empty array when list is empty', () => {
			expect([...list.values()]).toEqual([]);
		});

		it('Get list of items', () => {
			list.append(1, 2, 3);
			expect([...list.values()]).toEqual([1, 2, 3]);
		});

		it('Iterate over values', () => {
			let index = 0;
			list.append(1, 2, 3);
			for (const value of list.values()) {
				expect(value).toBe(list.get(index));
				index++;
			}
		});
	});

	describe('.entries', () => {
		it('Get empty array when list is empty', () => {
			expect([...list.entries()]).toEqual([]);
		});

		it('Get list of same stored items', () => {
			list.append(1, 2, 3);

			expect([...list.entries()]).toEqual([
				[0, 1],
				[1, 2],
				[2, 3],
			]);
		});

		it('Iterate over entries of list', () => {
			let i = 0;
			list.append(1, 2, 3);

			for (const [index, item] of list.entries()) {
				expect([index, item]).toEqual([i, list.get(index)]);
				i++;
			}
		});
	});

	describe('.get', () => {
		it('throws ListOutOfRange when list is empty', () => {
			expect(() => list.get(0)).toThrowError(ListOutOfRange);
		});

		describe('With stored items', () => {
			beforeEach(() => {
				list.append(1);
			});

			it('throws ListOutOfRange when index is equal the length', () => {
				expect(() => list.get(list.length)).toThrowError(ListOutOfRange);
			});

			it('throws ListOutOfRange when index is negative', () => {
				expect(() => list.get(-1)).toThrowError(ListOutOfRange);
			});

			it('Get the correct item when is between bound', () => {
				expect(list.get(0)).toBe(1);
			});
		});
	});

	describe('.remove', () => {
		describe('Empty list', () => {
			it('Throw ListOutOfRange', () => {
				expect(() => list.remove(0)).toThrowError(ListOutOfRange);
			});
		});

		describe('single element', () => {
			beforeEach(() => {
				list.append(1);
			});

			it('Remove all elements', () => {
				list.remove(0);
				expect([...list]).toEqual([]);
			});

			it('Get 0 length', () => {
				list.remove(0);
				expect(list.length).toBe(0);
			});
		});

		describe('More than 1 element', () => {
			beforeEach(() => {
				list.append(1).append(2);
			});

			it('Decrease length by 1', () => {
				list.remove(0);
				expect(list.length).toBe(1);
			});

			it('Get the element removed', () => {
				list.append(3);
				expect(list.remove(2)).toBe(3);
			});

			it('Remove tail element', () => {
				list.remove(1);
				expect([...list]).toEqual([1]);
			});

			it('Remove head element', () => {
				list.remove(0);
				expect([...list]).toEqual([2]);
			});

			it('Remove the between head and tail', () => {
				list.append(3);
				list.remove(1);
				expect([...list]).toEqual([1, 3]);
			});
		});
	});

	describe('.peek', () => {
		it('Get null when list is empty', () => {
			expect(list.peek()).toBeNull();
		});

		it('Get the first element from the list', () => {
			list.append(1, 2);
			expect(list.peek()).toBe(list.get(0));
		});

		it('Get single element stored', () => {
			list.append(1);
			expect(list.peek()).toBe(1);
		});

		it('Do not remove element', () => {
			list.append(1);
			list.peek();
			expect(list.peek()).toBe(1);
		});
	});

	describe('.tail', () => {
		it('Get null when list is empty', () => {
			expect(list.tail()).toBeNull();
		});

		it('Get single element stored', () => {
			list.append(1);
			expect(list.tail()).toBe(1);
		});

		it('Get the last element added', () => {
			list.append(1, 2, 3, 4);
			expect(list.tail()).toBe(list.get(list.length - 1));
		});

		it('Do not remove element', () => {
			list.append(1, 2);
			list.tail();
			expect(list.length).toBe(2);
		});
	});

	describe('.contains', () => {
		describe('Returns false When', () => {
			it('Has List is empty', () => {
				expect(list.contains(10)).toBe(false);
			});

			it('Has no item being searched', () => {
				list.append(1);
				expect(list.contains(10)).toBe(false);
			});
		});

		describe('Returns true when', () => {
			it('Has item inside list', () => {
				list.append(1, 2, 3);
				expect(list.contains(2)).toBe(true);
			});

			it('Item is at the beginning of list', () => {
				list.append(1, 2, 3);
				expect(list.contains(1)).toBe(true);
			});
			it('Item is at end', () => {
				list.append(1, 2, 3);
				expect(list.contains(3)).toBe(true);
			});

			it('Has more than 1 instance stored', () => {
				list.append(1, 2, 3, 2);
				expect(list.contains(2)).toBe(true);
			});
		});
	});

	describe('.clear', () => {
		it('get length = 0', () => {
			list.append(1, 2, 3);
			list.clear();

			expect(list.length).toBe(0);
		});

		it('Remove all elements', () => {
			list.append(1, 2, 3);
			list.clear();
			expect([...list]).toEqual([]);
		});
	});
});
