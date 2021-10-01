/**
 * Queue list to enqueue things and dequeue them
 */
export type List<T> = ArrayLike<T>;

/**
 * Node represents a single node item with two link to next node
 * @template T
 * @typedef {?Object} Node
 * @property {T} data - The actual item
 * @property {Node} next - next item of the queue
 */
export type Node<T> = {
	item: T;
	next: Node<T>;
} | null;

/**
 * Node represents a single node item with two link to previous and next node
 * stored in the queue
 * @template T
 * @typedef {?Object} Node
 * @property {T} data - The actual item
 * @property {Node} prev - prev item of the queue
 * @property {Node} next - next item of the queue
 */
export type DoublyNode<T> = {
	item: T;
	prev: DoublyNode<T>;
	next: DoublyNode<T>;
} | null;

/**
 * Implementa
 */

/**
 * Queue Abstract Data Type
 * @interface
 * @template T
 */
export interface Queue<T> {
	/**
	 * Insert several items in the queue, which can grow indefinitely
	 */
	insert(...items: Array<T>): T | List<T> | null;
	/**
	 * Remove the last first element inserted, applied when the queue is nonempty
	 * @throws {QueueUnderflow}
	 * @return {T}
	 */
	remove(): T;
	/**
	 * Retrieve the first element from the queue, the next to be removed
	 * @throws {QueueUnderflow}
	 * @return {T}
	 */
	peek(): T;
}

export interface Stack<T> {
	/**
	 * Returns the top of the stack
	 * @throws {StackUnderflow}
	 */
	top(): T;
	/**
	 * Remove the last item inserted
	 * @throws {StackUnderflow}
	 */
	pop(): T;
	/**
	 * Insert item at the beginning of the stack
	 *
	 * @param {T} item new data to be inserted
	 * @return {T}
	 */
	push(item: T): T;
}
