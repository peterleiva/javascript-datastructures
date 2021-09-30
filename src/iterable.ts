/**
 * Defines methods to iterate over a collection of items
 */
export default abstract class Iterable<T> {
	/**
	 * Returns an iterable of key, value pairs for every entry in collection
	 */
	abstract entries(): IterableIterator<[number, T]>;
	/**
	 * Defines iterator return ordered collection of stack items
	 */
	*[Symbol.iterator](): IterableIterator<T> {
		yield* this.values();
	}

	/**
	 * Returns an iterable of keys in the collection
	 */
	*keys(): IterableIterator<number> {
		for (const [index] of this.entries()) {
			yield index;
		}
	}

	/**
	 * Returns an iterable of values in the collection
	 */
	*values(): IterableIterator<T> {
		for (const [, item] of this.entries()) {
			yield item;
		}
	}
}
