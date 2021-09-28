/**
 * Queue list to enqueue things and dequeue them
 */
export type List<T> = ArrayLike<T>;

/**
 * Collection operation
 */
export interface Collection<Element> {
	concat(collection: Collection<Element>): Collection<Element>;

	/**
	 * Transform each element in a collection modifying its values according to
	 * callback function
	 *
	 * @param {function(data: Element): Element} callback Mapper function to
	 *    transform for each element from the collection
	 */
	map(callback: (data: Element) => Element): this;
}
