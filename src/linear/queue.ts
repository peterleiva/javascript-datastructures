import type { Collection } from "../types";
import type { QueueADT, Node } from "./types";
import { iterable, Iterable } from "../iterable";
import { Underflow } from "./errors";

@iterable
/**
 * A Queue is a linear structure which follows First In First Out order
 *
 * A queue is an ordered collection os items from  which  items may  be deleted
 * at one end (called front of the queue)  and into which items  may be
 * inserted  at other end (called rear of the queue), which are implemented as
 * a linked list
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
	 * tracks queue size to give O(1) complexity
	 */
	#size: number;
	/**
	 * Head of the queue
	 */
	#front: Node<T>;
	/**
	 * Rear of the queue. Place where items get inserted
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

	get length(): number {
		return this.size();
	}

	size(): number {
		return this.#size;
	}

	clear(): this {
		this.#rear = this.#front = null;
		this.#size = 0;

		return this;
	}

	empty(): boolean {
		return this.size() === 0;
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

	peek(): T {
		if (this.#rear === null) {
			throw new Underflow();
		}

		return this.#rear.item;
	}

	insert(...items: Array<T>): T | Array<T> | null {
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

	remove(): T {
		if (this.empty()) {
			throw new Underflow();
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
	 * Create a list node to be inserted at the queue
	 *
	 * Each node is a item from the perpective of the internal linked list. A
	 * single node is then created by this method to be inserted at
	 * {@link Queue.insert}
	 *
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
