/**
 * List implemented with doubly linked list
 * @version 0.2.0
 */

import type { DoublyNode as Node } from "linear/types";
import { IndexOutOfRange, Underflow } from "linear/errors";
import type { List as ADT } from "./types";
import { iterable, Iterable } from "iterable";

@iterable
/**
 * Ordered generic list
 */
export default class List<T> implements ADT<T> {
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
	 * FIXME: T pode retornar null também aqui está como as T
	 */
	*entries(): IterableIterator<[number, T]> {
		for (const [index, current] of this.nodeEntries()) {
			yield [index, current.item as T];
		}
	}

	/**
	 * Return index of stored element
	 * @param {T} item
	 * @return {number}
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
	 * @return {T[]}
	 */
	toArray(): T[] {
		return [...this];
	}

	/**
	 *  Returns the number of elements stored in the collection
	 */
	get length(): number {
		return this.#length;
	}

	/**
	 * alias for .length
	 * @return {number}
	 */
	size(): number {
		return this.length;
	}

	/**
	 * Return whether the collection has element stored or not
	 * @return {boolean}
	 */
	empty(): boolean {
		return this.#head === null;
	}

	/**
	 * O(n). Extract the first element of a list, which must be non-empty. Alias
	 * for {@link Stack.top}. For no argument it gives O(1)
	 *
	 * @example <caption>Head of list</caption>
	 * const l = new List(1, 2, 3)
	 * l.head() // returns 1
	 *
	 * @example <caption>Head of empty list throws Underflow</caption>
	 * const l = new List()
	 * l.head() // Error: Underflow
	 *
	 * @example <caption>Fist n elements</caption>
	 * const l = new List(1, 2, 3, 4)
	 * l.head(3) // returns [1, 2, 3]
	 *
	 * @example <caption>Head of Negative length throws IndexOutOfRange</caption>
	 * const l = new List(1, 2, 3)
	 * l.head(-1) // Error: IndexOutOfRange
	 *
	 * @throws {Underflow}
	 * @throws {IndexOutOfRange}
	 * @param {number} [length = 1]
	 * @return {!T | T[]}
	 */
	head(length?: number): T | T[] {
		throw new Error("must be implemented");
	}

	/**
	 * O(n). Extract the last element of a list, which must non-empty. For no
	 * argument it gives O(1)
	 *
	 * @example <caption>Last element of list</caption>
	 * const l = new List(1, 2, 3)
	 * l.last() // returns 1
	 *
	 * @example <caption>Empty list throws Underflow</caption>
	 * const l = new List()
	 * l.last() // Error: Underflow
	 *
	 * @example <caption>Last n elements</caption>
	 * const l = new List(1, 2, 3, 4)
	 * l.last(3) // returns [1, 2, 3]
	 *
	 * @example <caption>Negative length throws IndexOutOfRange</caption>
	 * const l = new List(1, 2, 3)
	 * l.last(-1) // Error: IndexOutOfRange
	 *
	 * @throws {Underflow}
	 * @throws {IndexOutOfRange}
	 * @param {number} [length = 1]
	 * @return {!T | T[]}
	 */
	last(length?: number): T | T[] {
		throw new Error("must be implemented");
	}

	/**
	 * O(1). Extract the elements after the head of non-empty list
	 *
	 * @example
	 * const l = new List(1, 2, 3);
	 * l.tail(); // [2, 3]
	 *
	 * const l = new List(1);
	 * l.tail(); // []
	 *
	 * const l = new List();
	 * l.tail(); // Error: Underflow
	 *
	 * @throws {Underflow}
	 * @return {List<T>}
	 */
	tail(): List<T> {
		throw new Error("must be implemented");
	}

	/**
	 * O(1). Remove the first element of non-empty list and return the value
	 *
	 * @example <caption>Removing first element</caption>
	 * const l = new List(1, 2, 3)
	 * l.shift() // returns 1 -> List: [1, 2]
	 *
	 * @example <caption>Throws Underflow when list is empty</caption>
	 * const l = new List()
	 * l.shift() // Error: Underflow
	 *
	 * @example <caption>Leaves empty list</caption>
	 * const l = new List(1)
	 * l.shift() // returns 1 -> List: []
	 *
	 * @throws {Underflow}
	 * @return {!T}
	 */
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

	/**
	 * O(n). Return all the elements of non-empty list except the last one
	 *
	 * @example
	 * const l = new List(1, 2, 3);
	 * l.init() // returns [1, 2]
	 *
	 * const l = new List(1);
	 * l.init() // returns []
	 *
	 * const l = new List();
	 * l.init() // Error: Underflow
	 *
	 * @throws {Underflow}
	 * @return {List<T>}
	 */
	init(): List<T> {
		throw new Error("must be implemented");
	}

	/**
	 * Get a data stored at some index or null if empty or out of range
	 *
	 * @throws {ListOutOfRange}
	 * @param {number} index
	 * @return {?T}
	 */
	get(index: number): T | null {
		return this.getNode(index)?.item || null;
	}

	/**
	 * Returns a node according to index or null if do not exists
	 * @param {number} index}
	 * @return {Node<T>}
	 */
	private getNode(index: number): Node<T> {
		if (index < 0 || index >= this.length) {
			throw new IndexOutOfRange(this.length, index);
		}

		for (const [i, current] of this.nodeEntries()) {
			if (i === index) return current;
		}

		return null;
	}

	/**
	 * O(1). Insert item at the beginning of the stack
	 *
	 * @param {T} item new data to be inserted
	 * @return {T}
	 */
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
	 * O(n). Insert multiple elements at the end, keeping the specified order
	 * Also a alias for {@link Stack.push} with multiple items
	 *
	 * @example <caption>Modifying list</caption>
	 * const l = new List(1, 2, 3)
	 * l.append(4, 5, 6) // gives [1, 2, 3, 4, 5, 6];
	 *
	 * @example <caption>Immutable interface</caption>
	 * const l = new List(1, 2, 3)
	 * l.append(new List(3, 4, 5)) // returns list: [1, 2, 3, 4, 5, 6];
	 *
	 * @param {...T[]} item
	 * @return {this | List<T>}
	 */
	append(...items: T[]): this {
		for (const item of items) {
			this.push(item);
		}

		return this;
	}

	/**
	 * O(n). Adds element	 to the beginning of an array and returns the new length
	 * of the array.
	 *
	 * @example <caption>Modify list</caption>
	 * const l = new List()
	 * l.prepend(1, 2, 3) // > List [1, 2, 3]
	 *
	 * @example <caption>Immutable list</caption>
	 * const l = new List(4, 5, 6)
	 * l.prepend(new List(1, 2, 3)) // returns [1, 2, 3, 4, 5, 6]
	 *
	 * @param {...T[]} element
	 * @return {this}
	 */
	prepend(...items: T[]): this {
		for (const item of items) {
			this.unshift(item);
		}

		return this;
	}

	/**
	 * Insert a element at the end of the list
	 * @param {T} data
	 * @return {T}
	 */
	insertLeft(data: T): T {
		const node = this.createNode(data);

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
	 * O(1). Remove the last item inserted
	 * @throws {Underflow}
	 * @return {T}
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

	/**
	 * Remove all elements from the list
	 * @return {this}
	 */
	clear(): this {
		for (const [, node] of this.nodeEntries()) {
			this.markGarbageCollect(node);
		}

		this.#head = this.#tail = null;
		this.#length = 0;

		return this;
	}

	/**
	 * Returns the top of the stack
	 *
	 * @throws {Underflow}
	 * @return {T}
	 */
	top(): T {
		if (this.#head === null) {
			throw new Underflow();
		}

		return this.#head.item;
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
	 * @param {number} index
	 * @return {boolean}
	 */
	private isOutOfIndex(index: number): boolean {
		return index < 0 || index >= this.#length;
	}

	/**
	 * Create node for doubly linked list
	 * @param {T} item
	 * @return {!Node<T>}
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
	 * @param {T[]} items
	 * @return {Array<!Node<T>>}
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
	 * @param {!Node<T>} node
	 */
	private markGarbageCollect(node: NonNullable<Node<T>>) {
		node.right = node.left = null;
	}
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface LinkedList<T> extends Iterable<T> {}
