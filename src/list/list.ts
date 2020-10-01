import { ListOutOfRange } from './errors';

type Node<T> = {
	data: T;
	right: Node<T> | null;
	left: Node<T> | null;
};

interface NodeEntry<T> {
	current: Node<T>;
	index: number;
}

/**
 * TODO: creates with a spread operator with list of items
 */
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
		for (const node of this.nodeEntries()) {
			if (node.current) yield [node.index, node.current.data];
		}
	}

	private *nodeEntries(): Generator<NodeEntry<T>> {
		let current = this.head;
		let index = 0;

		while (current !== null) {
			yield { current, index };

			index++;
			current = current.right;
		}
	}

	get length(): number {
		return this._length;
	}

	/**
	 * Verifiy if list is empty
	 */
	isEmpty(): boolean {
		return this.head === null;
	}

	append(data: T): this {
		let entry: NodeEntry<T> | null = null;
		const node = this.createNode(data);

		for (entry of this.nodeEntries());

		if (!entry?.current) {
			this.head = node;
		} else {
			node.left = entry.current;
			entry.current.right = node;
		}

		this._length++;

		return this;
	}

	remove(index: number): T | null {
		if (index < 0 || index >= this.length) {
			throw new ListOutOfRange(this.length, index);
		}

		let current: Node<T> | null = null;
		let i: number;

		for ({ current, index: i } of this.nodeEntries()) {
			if (i === index) break;
		}

		const previous = current?.left;
		const next = current?.right;

		if (!(current && previous && next)) {
			return null;
		}

		previous.right = next;
		next.left = previous;

		current.right = current.left = null;
		this._length--;

		return current.data;
	}

	// pop(): T {}

	// dequeue(): T {}

	/**
	 * Get a data stored at some index or null if empty or out of range
	 *
	 * @throws ListOutOfRange
	 * @param {number} index
	 */
	get(index: number): T | null {
		if (index < 0 || index >= this.length) {
			throw new ListOutOfRange(this.length, index);
		}

		for (const entry of this.nodeEntries()) {
			if (entry.index === index) return entry.current.data;
		}

		return null;
	}

	prepend(data: T): this {
		const node = this.createNode(data);

		if (!this.head) {
			this.head = node;
		} else {
			node.right = this.head;
			this.head.left = node;
			this.head = node;
		}

		this._length++;

		return this;
	}

	clear(): this {
		this.head = null;
		this._length = 0;

		return this;
	}

	peek(): T | null {
		return this.head?.data ?? null;
	}

	tail(): T | null {
		let node: NodeEntry<T> | null = null;
		for (node of this.nodeEntries());

		return node?.current.data ?? null;
	}

	// removeAfter(data: T): T {}

	// sort(): this {}

	// insertAfter(data: T): T {}

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

	private createNode(data: T): Node<T> {
		return {
			data,
			right: null,
			left: null,
		};
	}
}
