export default class IndexOutOfRangeException extends Error {
	constructor(numberOfItems: number, indexAccessed: number) {
		super();

		this.message = `
		Accessing index out of list range.
		Number of items: ${numberOfItems}
		Index accessed: ${indexAccessed}
		`;
	}
}
