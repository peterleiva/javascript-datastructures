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
export interface Transformation<Element> {
	/**
	 * Concatenate collections creating a new one
	 * @param {Transformation<Element>} collection
	 * @return {Transformation<Element>}
	 */
	concat(collection: Transformation<Element>): Transformation<Element>;
	/**
	 * Transform each element in a collection modifying its values according to
	 * callback function
	 *
	 * @param {Function} callback Mapper function to
	 *    transform for each element from the collection
	 * @return {Transformation<Element>}
	 */
	map(callback: (data: Element) => Element): Transformation<Element>;
	/**
	 * @todo define it better
	 */
	reduce(
		callback: (data: Element) => Element,
		initialValue: unknown
	): Transformation<Element>;
	/**
	 * Transform collection to internal javascript array element
	 * @return {T[]}
	 */
	toArray(): Array<Element>;
	/**
	 * Partition collection following a criterea function
	 * @param {Function} fn partition criterea
	 * @return {[Transformation<Element>, Transformation<Element>]}
	 */
	partition(
		fn: (value: Element) => boolean
	): [Transformation<Element>, Transformation<Element>];
}

export type Constructor<T = Record<string, unknown>> = new (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	...args: any[]
) => T;

export type Comparable<T> = (data: T) => number;

export interface Searchable<T> {
	/**
	 * Find a data inside a tree according to finder callback
	 *
	 * @param {(data: T) => boolean} finder
	 * @return {?T}
	 */
	search(finder: Comparable<T>): T | null;
}
