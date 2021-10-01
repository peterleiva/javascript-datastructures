import { Constructor } from "types";

/**
 * Defines methods to iterate over a collection of items
 */
export interface Iterable<T> {
	/**
	 * Defines IterableIterator return ordered collection of stack items
	 */
	[Symbol.iterator](): IterableIterator<T>;

	/**
	 * Returns an iterable of keys in the collection
	 */
	keys(): IterableIterator<number>;

	/**
	 * Returns an iterable of values in the collection
	 */
	values(): IterableIterator<T>;
	/**
	 * Returns an iterable of key, value pairs for every entry in collection
	 */
	entries(): IterableIterator<[number, T]>;
}

/**
 *
 * @param { Constructor} Base
 * @return {Iterable<T>}
 */
export function iterable<
	T,
	TBase extends Constructor<Pick<Iterable<T>, "entries">>
>(Base: TBase) {
	/**
	 * Iterable mixin
	 */
	return class extends Base implements Iterable<T> {
		/**
		 * Defines IterableIterator return ordered collection of stack items
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
	};
}
