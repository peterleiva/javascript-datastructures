/**
 * Node represents a single node item with two link to next node
 */
export type Node<T> = {
	item: T;
	next: Node<T>;
} | null;

/**
 * Node represents a single node item with two link to previous and next node
 * stored in the queue
 */
export type DoublyNode<T> = {
	item: T;
	left: DoublyNode<T>;
	right: DoublyNode<T>;
} | null;

/**
 * Queue Abstract Data Type
 */
export interface QueueADT<T> {
	/**
	 * Enqueue single or list of elements
	 *
	 * Enqueue always add a elements to the end of list inside datastructure. The
	 * argument accepts a single or a list of them. enqueuem them in the order
	 * they are, alweays at the end. A full error can be throw if the queue
	 * exceeds. The internal structure accepts a list of 2**32 items, which is
	 * the maximum size a array element can have in javascript. If those elements
	 * are enqueue successfuly a copy of them is retuned as an array or a single
	 * element
	 */
	insert(...items: Array<T>): T | Array<T> | null;
	/**
	 * Dequeue a number of elements stored in the same order as enqueued
	 *
	 * Dequeue is an operation with effects. The elements no long exists in queue
	 * structure. Thereof, it removes n elements, specified by quantity argument,
	 * returning them on success. If the queue only have one element, them this
	 * single elements is returned otherwise it returns a array of deleted
	 * elements, sorted by queue order.
	 * Notice empty queue always returns null
	 *
	 * @throws {@link Underflow}
	 * Throws when empty
	 */
	remove(): T;
	/**
	 * Retrieve the first element from the queue, the next to be removed
	 *
	 * @throws {@link Underflow}
	 * Throws for empty queue
	 */
	peek(): T;
}

export interface StackADT<T> {
	/**
	 * O(1). Extract the first element of a stack, which must be non-empty
	 *
	 * @example
	 * const s = new Stack(1, 2, 3)
	 * s.top() // returns 1
	 *
	 * const l = new Stack()
	 * s.top() // Error: Underflow
	 *
	 * @throws {@link Underflow}
	 * Throws when empty
	 *
	 */
	top(): T;
	/**
	 * O(1). Remove the last item inserted
	 * @throws {@link Underflow}
	 * Throws when Empty
	 *
	 * @returns item popped
	 */
	pop(): T;
	/**
	 * O(1). Insert item at the beginning of the stack
	 *
	 * @returns item pushed
	 */
	push(item: T): T;
}

export interface DequeADT<T> {
	/**
	 * Insert item at the left end
	 */
	insertLeft(item: T): T;
	/**
	 * Insert item at the right end
	 */
	insertRight(item: T): T;
	/**
	 * Delete last item from the left end
	 */
	deleteLeft(): T;
	/**
	 * Delete last item from the right end
	 */
	deleteRight(): T;
}
