/**
 * Queue list to enqueue things and dequeue them
 */
export type List<T> = ArrayLike<T>;

/**
 * Collection operation
 */
export interface Collection<Element> {
	/**
	 * Concatenate collections creating a new one
	 * @param {Collection<Element>} collection
	 * @return {Collection<Element>}
	 */
	concat(collection: Collection<Element>): Collection<Element>;
	/**
	 * Transform each element in a collection modifying its values according to
	 * callback function
	 *
	 * @param {Function} callback Mapper function to
	 *    transform for each element from the collection
	 * @return {Collection<Element>}
	 */
	map(callback: (data: Element) => Element): Collection<Element>;
	/**
	 * @todo define it better
	 */
	reduce(
		callback: (data: Element) => Element,
		initialValue: unknown
	): Collection<Element>;
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
	 * @return {[Collection<Element>, Collection<Element>]}
	 */
	partition(
		fn: (value: Element) => boolean
	): [Collection<Element>, Collection<Element>];
}
