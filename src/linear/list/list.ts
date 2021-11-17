/**
 * List implemented with doubly linked list
 * @version 0.2.0
 */

import type { DoublyNode as Node, ListADT } from "linear";
import { iterable, Iterable } from "../../iterable";
import { IndexOutOfRange, Underflow } from "../errors";

@iterable
/**
 * Ordered generic list
 */
export default class List<T> implements ListADT<T> {
	#head: Node<T>;
	#tail: Node<T>;
	#length: number;

	/**
	 * Initializes list optionally with multiple items
	 * @param {...T} items
	 */
	constructor(...items: T[]) {
		this.#head = this.#tail = null;
		this.#length = 0;

		this.append(...items);
	}

	/**
	 * Creates a List from a given iterable
	 */
	static of<T>(items: Iterable<T>): List<T> {
		return new List(...items);
	}

	/**
	 * FIXME: T pode retornar null também aqui está como as T
	 */
	*entries(): IterableIterator<[number, T]> {
		for (const [index, current] of this.nodeEntries()) {
			yield [index, current.item as T];
		}
	}

	/**
	 * Return index of stored element
	 */
	indexOf(item: T): number {
		for (const [i, value] of this.entries()) {
			if (Object.is(value, item)) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * transform collection to array
	 */
	toArray(): T[] {
		return [...this];
	}

	get length(): number {
		return this.#length;
	}

	size(): number {
		return this.length;
	}

	empty(): boolean {
		return this.#head === null;
	}

	head(): T;
	head(length: number): List<T>;
	head(length?: number): List<T> | T {
		if (length == undefined && this.#head) {
			return this.#head.item;
		}

		length ??= 1;

		const list = new List<T>();
		let node = this.#head;
		let i = 0;

		while (node && i++ < length) {
			list.append(node.item);
			node = node.right;
		}

		return list;
	}

	last(): T;
	last(length: number): ListADT<T>;
	last(length?: number): ListADT<T> | T {
		throw new Error("must be implemented");
	}

	tail(): List<T> {
		if (!this.#head) {
			throw new Underflow();
		}

		let node = this.#head.right;
		const list = new List<T>();

		while (node) {
			list.push(node.item);
			node = node.right;
		}

		return list;
	}

	shift(): T {
		const node: Node<T> = this.#head;

		if (node === null) {
			throw new Underflow();
		}

		this.#head = node.right;

		if (this.#head) {
			this.#head.left = null;
		} else {
			this.#tail = null;
		}

		this.#length--;
		this.markGarbageCollect(node);

		return node.item;
	}

	init(): List<T> {
		throw new Error("must be implemented");
	}

	/**
	 * O(n). Get a data stored at some index or null if empty or out of range
	 *
	 */
	get(index: number): T | null {
		return this.getNode(index)?.item ?? null;
	}

	/**
	 * Returns a node according to index or null if do not exists
	 *
	 * @throws {@link IndexOutOfRange}
	 * When index is negative or index \>= list.length
	 *
	 * @returns get the (index + 1)th item of the ordered list
	 */
	private getNode(index: number): Node<T> {
		if (this.isOutOfIndex(index)) {
			throw new IndexOutOfRange(this.length, index);
		}

		for (const [i, current] of this.nodeEntries()) {
			if (i === index) return current;
		}

		return null;
	}

	push(item: T): T {
		const node = this.createNode(item);

		if (this.#tail) {
			this.#tail.right = node;
			node.left = this.#tail;
		} else {
			this.#head = node;
		}

		this.#tail = node;
		this.#length++;

		return node.item;
	}

	/**
	 * O(1). insert the element at the beginning of the list
	 *
	 * @returns inserted item
	 */
	private unshift(item: T): T {
		const node = this.createNode(item);

		if (this.#head) {
			this.#head.left = node;
			node.right = this.#head;
		} else {
			this.#tail = node;
		}

		this.#head = node;
		this.#length++;

		return node.item;
	}

	append(...items: T[]): this {
		for (const item of items) {
			this.push(item);
		}

		return this;
	}

	prepend(...items: T[]): this {
		for (const item of items) {
			this.unshift(item);
		}

		return this;
	}

	/**
	 * O(1). Remove the last item inserted
	 */
	pop(): T {
		const node: Node<T> = this.#tail;

		if (node === null) {
			throw new Underflow();
		}

		this.#tail = node.left;

		if (this.#tail) {
			this.#tail.right = null;
		} else {
			this.#head = null;
		}

		this.#length--;
		this.markGarbageCollect(node);

		return node.item;
	}

	clear(): this {
		this.#head = this.#tail = null;
		this.#length = 0;

		return this;
	}

	top(): T {
		if (!this.#tail) {
			throw new Underflow();
		}

		return this.#tail.item;
	}

	/**
	 * Iterator helper, which iterates over node entries, used by other iterators
	 */
	private *nodeEntries(): IterableIterator<[number, NonNullable<Node<T>>]> {
		let node = this.#head;
		let index = 0;

		while (node !== null) {
			yield [index, node];

			index++;
			node = node.right;
		}
	}

	/**
	 * Checks whether some index is out of order
	 */
	private isOutOfIndex(index: number): boolean {
		return index < 0 || index >= this.#length;
	}

	/**
	 * Create node for doubly linked list
	 */
	private createNode(item: T): NonNullable<Node<T>> {
		return {
			item,
			left: null,
			right: null,
		};
	}

	/**
	 * Creates list of node items
	 */
	private createNodeList(items: T[]): NonNullable<Node<T>>[] {
		const list: NonNullable<Node<T>>[] = [];

		for (const [i, item] of items.entries()) {
			const node = this.createNode(item);
			const preceding = list[i - 1] || null;

			if (preceding) {
				node.left = preceding;
				preceding.right = node;
			}

			list.push(node);
		}

		return list;
	}

	/**
	 * Mark item to be freed
	 */
	private markGarbageCollect(node: NonNullable<Node<T>>) {
		node.right = node.left = null;
	}
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface LinkedList<T> extends Iterable<T> {}
