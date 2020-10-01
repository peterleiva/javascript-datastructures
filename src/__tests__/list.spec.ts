import { ListOutOfRange } from 'src/list/errors';
import LinkedList from 'src/list/list';

describe('List', () => {
	let list: LinkedList<unknown>;

	beforeEach(() => {
		list = new LinkedList();
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

		describe('without empty list', () => {
			beforeEach(() => {
				list.append(1).append(2);
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

		describe('Without empty list', () => {
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

			it('Remove the element from the list', () => {
				list.append(3);
				list.remove(1);
				expect([...list]).toEqual([1, 3]);
			});
		});
	});
});
