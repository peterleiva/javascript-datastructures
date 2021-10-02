export interface Collection {
	/**
	 * Alias for {@link Collection.size}
	 * @type {number}
	 */
	length: number;
	/**
	 * Returns the quantity of items stored
	 * @return {number}
	 */
	size(): number;
	/**
	 * return true of false depending whether or not the stack contains any items
	 * @return {boolean}
	 */
	empty(): boolean;
	/**
	 * remove all elements from the collection
	 * @return {this}
	 */
	clear(): this;
}

/**
 * Collection operation
 */
export interface CollectionOperations<Element> {
	/**
	 * Concatenate collections creating a new one
	 * @param {CollectionOperations<Element>} collection
	 * @return {CollectionOperations<Element>}
	 */
	concat(
		collection: CollectionOperations<Element>
	): CollectionOperations<Element>;
	/**
	 * Transform each element in a collection modifying its values according to
	 * callback function
	 *
	 * @param {Function} callback Mapper function to
	 *    transform for each element from the collection
	 * @return {CollectionOperations<Element>}
	 */
	map(callback: (data: Element) => Element): CollectionOperations<Element>;
	/**
	 * @todo define it better
	 */
	reduce(
		callback: (data: Element) => Element,
		initialValue: unknown
	): CollectionOperations<Element>;
	/**
	 * Transform collection to internal javascript array element
	 * @return {T[]}
	 */
	toArray(): Array<Element>;
	/**
	 *  Returns the number of elements stored in the collection
	 */
	length: number;
	/**
	 * alias for .length
	 */
	size(): number;
	/**
	 * Return whether the collection has element stored or not
	 * @return {boolean}
	 */
	isEmpty(): boolean;
	/**
	 * Partition collection following a criterea function
	 * @param {Function} fn partition criterea
	 * @return {[CollectionOperations<Element>, CollectionOperations<Element>]}
	 */
	partition(
		fn: (value: Element) => boolean
	): [CollectionOperations<Element>, CollectionOperations<Element>];
}

export type Constructor<T = Record<string, unknown>> = new (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	...args: any[]
) => T;
