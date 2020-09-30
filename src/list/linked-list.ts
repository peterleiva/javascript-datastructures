import { ListOutOfRange } from './errors';

type Node<T> = {
	data: T;
	next: Node<T> | null;
};

export default class LinkedList<T> implements Iterable<T> {
	protected head: Node<T> | null;
	protected _length: number;

	constructor() {
		this.head = null;
		this._length = 0;
	}

	*[Symbol.iterator](): Iterator<T> {
		for (const [i, data] of this.entries()) {
			yield data;
		}
	}

	*values(): Iterator<T> {
		return this[Symbol.iterator];
	}

	*keys(): Iterator<number> {
		for (const [i, data] of this.entries()) {
			yield i;
		}
	}

	*entries(): Generator<[number, T]> {
		for (const [i, previous, current] of this.nodeEntries()) {
			yield [i, current.data];
		}
	}

	private *nodeEntries(): Generator<[number, Node<T>, Node<T>]> {
		let previous: Node<T> = null;
		let current: Node<T> = this.head;
		let index = 0;

		while (current !== null) {
			yield [index, previous, current];
			index++;
			previous = current;
			current = current.next;
		}
	}

	get length(): number {
		return this._length;
	}

	append(data: T): this {
		let prev: Node<T> = null;
		let current: Node<T> = this.head;
		const appendedNode = this.createNode(data);

		while (current !== null) {
			prev = current;
			current = current.next;
		}

		if (prev === null) {
			this.head = appendedNode;
		} else {
			prev.next = appendedNode;
		}

		return this;
	}

	/**
	 * alias for .append
	 * @param data
	 */
	push(data: T): this {
		return this.append(data);
	}

	remove(index: number): T {
		if (index < 0 || index >= this.length) {
			throw new ListOutOfRange(this.length, index);
		}

		let i: number, previous: Node<T>, current: Node<T>;
		for ([i, previous, current] of this.nodeEntries()) {
			if (i === index) break;
		}

		const dataRemoved = current.data;

		previous.next = current.next;
		this._length--;

		return dataRemoved;
	}

	pop(): T {}

	dequeue(): T {}

	/**
	 * Get a data stored at some index or null if empty or out of range
	 *
	 * @throws ListOutOfRange
	 * @param {number} index
	 */
	getNode(index: number): Node<T> {
		if (index < 0 || index >= this.length) {
			throw new ListOutOfRange(this.length, index);
		}

		let i: number, previous: Node<T>, current: Node<T>;

		for ([i, previous, current] of this.nodeEntries()) {
			if (index === i) return current;
		}
	}

	get(index: number): T {
		return this.getNode(index).data;
	}

	prepend(data: T): this {
		const node = this.createNode(data);

		node.next = this.head;
		this.head = node;
		this._length++;

		return this;
	}

	clear(): this {
		this.head = null;
		this._length = 0;

		return this;
	}

	peek(): T | null {
		if (this.length === 0) return null;
		return this.head.data;
	}

	tail(): T | null {
		let i: number, prev: Node<T>, current: Node<T>;

		for ([i, prev, current] of this.nodeEntries());

		return current?.data || null;
	}

	/**
	 * Linear search on list
	 *
	 * @param data data to be search
	 */
	contains(data: T): boolean {
		for (const item of this) {
			if (item === data) return true;
		}

		return false;
	}

	protected createNode(data: T): Node<T> {
		return {
			data,
			next: null,
		};
	}
}
