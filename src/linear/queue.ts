/**
 * @file Implementation of queue data structure usingo FIFO access collection
 * @version 0.5.0
 */

import type { Collection } from "../types";
import type { List, Queue as QueueADT, Node } from "./types";
import { iterable, Iterable } from "../iterable";

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

@iterable
/**
 * A Queue is a linear structure which follows First In First Out order
 *
 * A queue is an ordered collection os items from  which  items may  be deleted
 * at one end (called front of the queue)  and into which items  may be
 * inserted  at other end (called rear of the queue), which are implemented as
 * a linked list
 *
 * @template T
 * @implements {Iterable<T>}
 *
 * @example <caption>Enqueing item</caption>
 * const queue = new Queue()
 * queue.insert('item') // size === 1
 *
 * @example <caption>Inserting multiple items</caption>
 * const items = [1, 2, 3, 4]
 * const queue = new Queue()
 * queue.insert(...items) // size === 4
 *
 * @example <caption>Removing item</caption>
 * const queue = new Queue(1)
 * queue.insert(2)
 * const x = queue.remove() // x === 1
 *
 */
export default class Queue<T> implements QueueADT<T>, Collection {
	/**
	 * Keeps track of queue size
	 * @type {number}
	 * @private
	 */
	#size: number;
	/**
	 * Place where items get removed
	 * @type {Queue~Node}
	 * @private
	 */
	#front: Node<T>;
	/**
	 * Place where items get inserted
	 * @type {Queue~Node}
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
	*entries(): IterableIterator<[number, T]> {
		let node = this.#front;
		let index = 0;

		while (node !== null) {
			yield [index, node.item];
			node = node.next;
			index++;
		}
	}

	/**
	 * Retrieve the first element from the queue, the next to be removed
	 * @throws {QueueUnderflow}
	 * @return {T}
	 */
	peek(): T {
		if (this.#rear === null) {
			throw new QueueUnderflow();
		}

		return this.#rear.item;
	}

	/**
	 * Alias for .size method
	 *
	 * @readonly
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
	 * @template T
	 * @param {...T} items elements to be enqueued
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
		const item = node.item;

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
	 * @return {boolean}
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
	 * @param {T} item queue item information
	 * @return {Node<T>}
	 */
	private getnode(item: T): NonNullable<Node<T>> {
		return {
			item,
			next: null,
		};
	}
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface Queue<T> extends Iterable<T> {}
