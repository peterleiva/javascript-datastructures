/**
 * Error given when indexing a Indexable item out of range
 */
export default class IndexOutOfRangeException extends Error {
	/**
	 * Creates error given total number of items and index accessed
	 * @param {number} numberOfItems
	 * @param {number} indexAccessed
	 */
	constructor(numberOfItems: number, indexAccessed: number) {
		super();

		this.message = `
		Accessing index out of list range.
		Number of items: ${numberOfItems}
		Index accessed: ${indexAccessed}
		`;
	}
}
