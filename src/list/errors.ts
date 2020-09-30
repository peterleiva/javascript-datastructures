export class ListOutOfRange extends Error {
	constructor(numberOfItems: number, indexAccessed: number) {
		super();

		this.message = `
		Accessing index out of list range.
		Number of items: ${numberOfItems}
		Index accesed: ${indexAccessed}
		`;
	}
}
