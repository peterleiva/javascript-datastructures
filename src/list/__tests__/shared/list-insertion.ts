import { List } from "list";
import { ComparableFn } from "list/list-adt.interface";

// const readArg = (type: ComparableFn<unknown> | number) => {
// 	if (typeof type === 'number') {

// 	}
// }

function listInsertion(
	message: string,
	arg: ComparableFn<unknown> & number
): void {
	describe(`It behaves like list insertion ${message}`, () => {
		let list: List<unknown>;

		beforeEach(() => (list = new List()));

		describe("Data in argument", () => {
			describe("Single data", () => {
				const data = 1;

				it("Returns a single object", () => {
					expect(list.insert(arg, data)).toBe(data);
				});

				it("Leaves the list with single item when is empty", () => {
					list.insert(arg, data);
					expect([...list]).toStrictEqual([1]);
				});

				it("Increase length by 1", () => {
					list.insert(arg, data);
					expect(list).toHaveLength(1);
				});

				describe("With already stored items", () => {
					beforeEach(() => list.insert(0, 2));

					it("Insert data at position 0", () => {
						list.insert(0, 2);

						if (typeof arg === "number") {
							list.insert(0, data);
						} else {
							list.insert(
								jest.fn(() => true),
								data
							);
						}

						expect([...list]).toStrictEqual([1, 2]);
					});

					it("Insert data at the end", () => {
						if (typeof arg === "number") {
							list.insert(1, data);
						} else {
							list.insert(
								jest.fn((data: unknown) => (data as number) >= 2),
								data
							);
						}

						expect([...list]).toStrictEqual([2, 1]);
					});

					it("Insert data at the middle", () => {});
				});
			});

			describe("Multiple data", () => {
				it.todo("Returns a array with inserted data");
				it.todo("Insert data at the beginning");
				it.todo("Insert data at the end");
				it.todo("Insert data in the middle");
			});
		});

		describe("No data in argument", () => {
			it.todo("Leaves the list unmodified");
			it.todo("Returns null");
		});
	});
}

export default listInsertion;
