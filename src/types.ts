export interface Collection {
	/**
	 * Alias for {@link Collection.size}
	 */
	length: number;
	/**
	 * Returns the quantity of items stored
	 */
	size(): number;
	/**
	 * return true of false depending whether or not the stack contains any items
	 */
	empty(): boolean;
	/**
	 * remove all elements from the collection
	 */
	clear(): this;
}

/**
 * Collection operation
 */
export interface Transformation<Element> {
	/**
	 * Concatenate collections creating a new one
	 */
	concat(collection: Transformation<Element>): Transformation<Element>;
	/**
	 * Transform each element in a collection modifying its values according to
	 * callback function
	 *
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
	 */
	toArray(): Array<Element>;
	/**
	 * Partition collection following a criterea function
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
	 */
	search(finder: Comparable<T>): T | null;
}
