/**
 * @file Implementation of queue data structure usingo FIFO access collection
 * @version 0.3.0
 */

import type { List } from "types";

/**
 * Queue Abstract Data Type
 * @interface
 */
interface QueueADT<T> {
	/**
	 * return true of false depending whether or not the queue contains any items
	 */
	empty(): boolean;
	/**
	 * Insert several items in the queue, which can grow indefinitely
	 */
	insert(...items: Array<T>): T | List<T> | null;
	/**
	 * Remove the last first element inserted, applied when the queue is nonempty
	 * @throws {QueueUnderflow}
	 */
	remove(): T;
	/**
	 * returns the length of the queue
	 */
	size(): number;
	/**
	 * remove all elements from the queue
	 */
	clear(): this;
}

/**
 * Throws Underflow Error when dequeuing empty queue
 */
export class QueueUnderflow extends Error {
	/**
	 * created queue underflow error
	 */
	constructor() {
		super("Queue underflow");
	}
}

/**
 * The queue is implemented as a linked list, so node represents a list's node
 */
type Node<T> = {
	data: T;
	next: Node<T>;
} | null;

/**
 * A Queue is a linear structure which follows First In First Out order
 *
 * A queue is an ordered collection os items from  which  items may  be deleted
 * at one end (called front of the queue)  and into which items  may be
 * inserted  at other end (called rear of the queue), which are implemented as
 * a linked list
 *
 * @class
 * @implements {QueueADT}
 * @implements {Iterable<T>}
 *
 */
class Queue<T> implements QueueADT<T>, Iterable<T> {
	/**
	 * Keeps track of queue size
	 * @private
	 */
	#size: number;
	/**
	 * the front part of the queue, from where items gets removed
	 * @private
	 */
	#front: Node<T>;
	/**
	 * the rear is where items get inserted
	 * @private
	 */
	#rear: Node<T>;

	/**
	 * Create the queue with a list of optional elements
	 */
	constructor(...items: T[]) {
		this.#size = 0;
		this.#front = this.#rear = null;

		this.insert(...items);
	}

	/**
	 * Returns a iterator ordered as a queue
	 */
	*[Symbol.iterator](): Iterator<T> {
		let node = this.#front;

		while (node !== null) {
			yield node.data;
			node = node.next;
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
	 * Returns the quantity of stored items
	 *
	 * @return {number}
	 */
	size(): number {
		return this.#size;
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
	 * @param {List<T>} items elements to be enqueued
	 * @return {T | List<T> | null}
	 */
	insert(...items: Array<T>): T | List<T> | null {
		const inserted = [];

		for (const item of items) {
			const node = this.getnode(item);

			if (this.#rear === null) {
				this.#front = node;
			} else {
				this.#rear.next = node;
			}

			this.#rear = node;
			inserted.push(item);
			this.#size++;
		}

		return inserted.length === 0
			? null
			: inserted.length === 1
			? inserted[0]
			: inserted;
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
	 *
	 * @throws {QueueUnderflow}
	 * @return {T}
	 */
	remove(): T {
		if (this.empty()) {
			throw new QueueUnderflow();
		}

		const node = this.#front as NonNullable<Node<T>>;
		const item = node.data;

		this.#front = node.next;

		if (this.#front === null) {
			this.#rear = null;
		}

		this.#size--;
		return item;
	}

	/**
	 * Removes all elements turning the queue empty
	 *
	 * @return {this}
	 */
	clear(): this {
		this.#rear = this.#front = null;
		this.#size = 0;

		return this;
	}

	/**
	 * Check if the queue is empty
	 *
	 * @return {number}
	 */
	empty(): boolean {
		return this.size() === 0;
	}

	/**
	 * Create a list node to be inserted at the queue
	 *
	 * Each node is a item from the perpective of the internal linked list. A
	 * single node is then created by this method to be inserted at
	 * {@link Queue#insert}
	 *
	 * @private
	 * @param {T} data queue item information
	 * @return {Node<T>}
	 */
	private getnode(data: T): NonNullable<Node<T>> {
		return {
			data,
			next: null,
		};
	}
}

export default Queue;
