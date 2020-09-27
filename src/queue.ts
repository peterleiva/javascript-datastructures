/**
 * @file Queue data structure
 * @version 0.2.0
 */

/**
 * Queue list to enqueue things and dequeue them
 */
export type List<T> = ArrayLike<T>;

// retornar o memso objeto que seja
/**
 * Queue Abstract Data Type
 *
 * All kinds of queues must implement this interface, them it can behave like a
 * queue
 */
interface QueueADT<T> {
	top(): T;
	isEmpty(): boolean;
	enqueue(...elements: T[]): T | T[] | null;
	dequeue(quantity?: number): T[] | T | null;
	size(): number;
	clear(): this;
}

/**
 * Collection operation
 */
interface Collection<Element> {
	concat(collection: Collection<Element>): Collection<Element>;

	/**
	 * Transform each element in a collection modifying its values according to
	 * callback function
	 *
	 * @param {function(data: Element): Element} callback Mapper function to
	 *    transformer for each element from the collection
	 */
	map(callback: (data: Element) => Element): this;
}

/**
 * Max size queue error object
 */
export class QueueFullError extends Error {
	/**
	 * Creates a QueueMaxSizeError with default message
	 */
	constructor() {
		super('Queue reached the maximum size 4,294,967,295');
	}
}

/**
 * Priotity function to enqueue follwing this algorythm
 *
 * An priority queue must give this function as argument on enqueue function
 */
interface PriorityFunction<T> {
	(comparable: T): boolean;
}

/**
 * Define a queue data structure for queueing things
 *
 * @implements {QueueADT}
 *
 * TODO: Usar uma função ao enfileirar para tornar em uma fila de prioridade
 */
export class Queue<T> implements QueueADT<T>, Iterable<T> {
	static MAX_SIZE = 2 ** 32 - 1;
	#list: Array<T> = [];

	/**
	 * Create the queue with a list of optional elements
	 */
	constructor(...elements: Array<T>) {
		this.enqueue(...elements);
	}

	/**
	 * Returns a iterator ordered as a queue
	 */
	*[Symbol.iterator](): Iterator<T> {
		for (const item of this.#list) {
			yield item;
		}
	}

	/**
	 * Alias for .size method
	 *
	 * @return {number}
	 */
	get length(): number {
		return this.size();
	}

	/**
	 * Number of stored elements in the queue
	 *
	 * @return {number}
	 */
	size(): number {
		return this.#list.length;
	}

	/**
	 * Get the next element in line witouth dequeueing it
	 *
	 * Creates a new copy with only the first element of the queue, without
	 * removing it. For empty queue it gets a null object
	 *
	 * @return {T}
	 */
	top(): T {
		if (this.size() === 0) return null;
		return this.#list.slice(0, 1).pop();
	}

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
	 *
	 * @throws QueueMaxSizeError when exceeds the queue size
	 * @param {List<T>} elements elements to be enqueued
	 * @return {List<T>}
	 */
	enqueue(...elements: T[]): T | T[] | null {
		if (elements.length === 0) return null;

		if (this.size() + elements.length >= Queue.MAX_SIZE) {
			throw new QueueFullError();
		}

		this.#list.push(...elements);

		return elements.length === 1 ? elements[0] : elements;
	}

	/**
	 * Removes all elements turning the queue empty
	 *
	 * @return {this}
	 */
	clear(): this {
		this.#list = [];

		return this;
	}

	/**
	 * Dequeue a number of elements stored in the same order as enqueued
	 *
	 * Dequeue is an operation with effects. The elements no long exists in queue
	 * structure. Thereof, it removes n elements, specified by quantity argument,
	 * returning them on success. If the queue only have one element, them this
	 * single elements is returned otherwise it returns a array of deleted
	 * elements, sorted by queue order.
	 * Notice empty queue always returns null
	 * When quantity <= 0 dequeue returns null
	 * When quantity >= n dequeue is empty
	 *
	 * @param {number} quantity [1] number of elements to dequeue
	 * @return {T[] | T | null}
	 */
	dequeue(quantity = 1): T[] | T | null {
		if (quantity <= 0 || this.size() === 0) return null;
		quantity = Math.min(quantity, this.length);

		let dequeued: T[] = [];
		dequeued = this.#list.splice(0, quantity);

		return dequeued.length === 1 ? dequeued.pop() : dequeued;
	}

	/**
	 * Check if the queue is empty
	 *
	 * @return {number}
	 */
	isEmpty(): boolean {
		return this.size() === 0;
	}
}

export default Queue;
