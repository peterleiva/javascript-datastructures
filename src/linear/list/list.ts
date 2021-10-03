/**
 * List implemented with doubly linked list
 * @version 0.2.0
 */

import { iterable, Iterable } from "iterable";
import type { DoublyNode as Node } from "../types";
import { IndexOutOfRangeException } from "./errors";
import { List as ListADT, ComparableFn } from "./list-adt.interface";
import { Underflow } from "../errors";

interface NodeEntry<T> {
	current: NonNullable<Node<T>>;
	index: number;
}

@iterable
/**
 * Doubly Linked list
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
	 * FIXME: T pode retornar null também aqui está como as T
	 */
	*entries(): IterableIterator<[number, T]> {
		for (const { index, current } of this.nodeEntries()) {
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

	remove(index: number): T;
	remove(data: T): T;
	remove(comparator: ComparableFn<T>): T | T[];
	/**
	 * Remove item from the list
	 * @param {number | ComparableFn<T>} criterea
	 * @return {T | T[] | null}
	 */
	remove(criterea: number | ComparableFn<T> | T): T | T[] | null {
		// if (typeof criterea === "number") {
		// 	return this.removeAt(criterea);
		// } else {
		// 	const removed = [];

		// 	// FIXME: Só itera uma vez quando existe match, devido ao iterator entries
		// 	for (const [i, data] of this.entries()) {
		// 		const matchesCriterea =
		// 			criterea instanceof Function
		// 				? criterea(data as T)
		// 				: Object.is(data, criterea);

		// 		if (matchesCriterea) {
		// 			console.log("before Remove", [...this]);
		// 			removed.push(this.removeAt(i));
		// 			console.log("After Remove", [...this]);
		// 		}
		// 	}

		// 	return removed;
		// }
		throw new Error("Must be fixed");
		return null;
	}

	/**
	 * Removes item from specified position
	 * @param {number} index
	 * @return {?T}
	 */
	private removeAt(index: number): T | null {
		if (this.isOutOfIndex(index)) {
			throw new IndexOutOfRangeException(this.size(), index);
		}

		const iterator = this.nodeEntries();
		let precedence = null;
		let current = this.#head as NonNullable<Node<T>>;
		let i = 0;

		while (i !== index) {
			const { value } = iterator.next();
			precedence = current;
			({ index: i, current } = value);
		}

		const { item } = current;

		// the next node after the removed one
		const following = current.right;

		// the head (index = 0) must be deleted
		if (!precedence) {
			this.#head = following;
		} else {
			precedence.right = following;
		}

		following && (following.left = precedence);

		this.#length--;
		this.markGarbageCollect(current);

		return item;
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
			throw new IndexOutOfRangeException(this.length, index);
		}

		for (const { current, index: i } of this.nodeEntries()) {
			if (i === index) return current;
		}

		return null;
	}

	/**
	 * Retrieve element at some position
	 * @param {number} index
	 * @return {?T}
	 */
	at(index: number): T | null {
		if (index >= 0) {
			return this.get(index);
		} else {
			return this.at(Math.abs(index) - 1);
		}
	}

	insert(index: number, ...data: T[]): T | T[] | null;
	insert(comparator: ComparableFn<T>, ...data: T[]): T | T[];
	/**
	 * Insert a group data at the list
	 *
	 * @throws {IndexOutOfRangeException}
	 * @param {number | ComparableFn<T>} criterea
	 * @param {...T} data
	 * @return {T | T[]}
	 */
	insert(criterea: number | ComparableFn<T>, ...data: T[]): T[] | T | null {
		const newNodes = this.createNodeList(data);
		if (newNodes.length === 0) return null;

		let index = -1;

		if (typeof criterea === "function") {
			for (const [i, data] of this.entries()) {
				if (criterea(data)) index = i;
			}
		}

		const insertionPoint = this.getNode(index);
		const firstNode = newNodes[0];
		const lastNode = newNodes[newNodes.length - 1];

		if (!insertionPoint || !insertionPoint.left) {
			this.#head = firstNode;
		} else {
			// must be added to the head
			if (insertionPoint.left) {
				firstNode.left = insertionPoint.left;
			}

			insertionPoint.left = lastNode;
			lastNode.right = insertionPoint;
		}

		return data;
	}

	/**
	 * Insert a new data at the end of the list
	 * @param {T} data
	 * @return {T}
	 */
	push(data: T): T {
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
	 * append items to the end of the List
	 * @param {...T} items
	 * @return {this}
	 */
	append(...items: T[]): this {
		for (const item of items) {
			this.push(item);
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
	 * Remove the first element of the list, which means with index 0
	 * @return {?T}
	 */
	dequeue(): T | null {
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
	 * Remove the last element from the list and return the element
	 * @throws {Underflow}
	 * @return {?T}
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
		for (const { current: node } of this.nodeEntries()) {
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
	 *  Returns the last element of the list
	 *
	 * @return {?T}
	 */
	last(): T | null {
		return this.#tail?.item ?? null;
	}

	/**
	 * Linear search on list
	 *
	 * @param {T} data data to be search
	 * @return {boolean}
	 */
	contains(data: T): boolean {
		for (const item of this) {
			if (Object.is(item, data)) return true;
		}

		return false;
	}

	/**
	 * Iterator helper, which iterates over node entries, used by other iterators
	 */
	private *nodeEntries(): IterableIterator<NodeEntry<T>> {
		let node = this.#head;
		let index = 0;

		while (node !== null) {
			yield { current: node, index };

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
