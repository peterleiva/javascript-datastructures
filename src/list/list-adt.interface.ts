export interface ComparableFn<T> {
	(data: T): boolean;
}

export default interface ListADT<T> {
	/**
	 * Checks if the list has any element
	 */
	isEmpty(): boolean;
	/**
	 * Remove the last element from the list and return it
	 * @throws EmptyListException
	 * @return {?T}
	 */
	pop(): T | null;
	/**
	 * Insert a new data at the beginning of the list
	 * @param {T} data
	 * @return {this}
	 */
	push(data: T): this;
	/**
	 * Insert a element at the end of the list
	 * @param {T} data
	 * @return {this}
	 */
	enqueue(data: T): this;
	/**
	 * Remove the first element of the list, which means with index 0
	 * @return {?T}
	 */
	dequeue(): T | null;
	/**
	 * Linear search on list
	 *
	 * @param {T} data data to be search
	 * @return {boolean}
	 */
	contains(data: T): boolean;
	/**
	 * Returns the first element of the list without removing it
	 */
	peek(): T | null;
	/**
	 * Returns the last element of the list without removing it
	 */
	tail(): T | null;
	/**
	 * Get the numbers of elements stored in the list
	 */
	size(): number;
	/**
	 * Get the index of the first apparition of the element or -1 if isn't there
	 *
	 * @param {T} data Data to be compared to
	 */
	indexOf(data: T): number;
	/**
	 * Get the element at given index throwing a error if it's out of range
	 *
	 * It gets any integer value and returns the corresponding data. itemAt can
	 * read negative values as well
	 *
	 * @param index
	 */
	at(index: number): T | null;
	/**
	 * Remove permanently elements of the list
	 *
	 * @throws {IndexOutOfRangeException}
	 * @throws {ElementDoNotExists}
	 * @param comparable
	 */
	remove(data: T): T | null;
	remove(index: number): T;
	remove(comparator: ComparableFn<T>): T | T[];
	/**
	 * Insert a group data at the list
	 *
	 * @throws {IndexOutOfRangeException}
	 * @param {number | ComparableFn<T>} criterea
	 * @param {...T} data
	 * @return {T | T[]}
	 */
	insert(index: number, ...data: T[]): T[] | T | null;
	insert(comparator: ComparableFn<T>, ...data: T[]): T | T[];
}
