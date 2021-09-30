/**
 * List implemented with doubly linked list
 * @version 1.0.0
 */

import { EmptyListException, IndexOutOfRangeException } from "./errors";
import ListADT, { ComparableFn } from "./list-adt.interface";

type Node<T> = null | {
	data: T | null;
	right: Node<T>;
	left: Node<T>;
};

interface NodeEntry<T> {
	current: NonNullable<Node<T>>;
	index: number;
}

/**
 * Doubly Linked list
 */
export default class LinkedList<T> implements ListADT<T>, Iterable<T> {
	protected head: Node<T>;
	protected _length: number;

	/**
	 * Initializes list optionally with multiple items
	 * @param {...T} items
	 */
	constructor(...items: T[]) {
		this.head = null;
		this._length = 0;

		for (const item of items) this.enqueue(item);
	}

	/**
	 * Iterate over the list of items
	 */
	*[Symbol.iterator](): IterableIterator<T> {
		for (const [, data] of this.entries()) {
			yield data;
		}
	}

	/**
	 * Iterate over the values stored
	 */
	*values(): IterableIterator<T> {
		for (const item of this) {
			yield item;
		}
	}

	/**
	 * Iterate over index
	 */
	*keys(): IterableIterator<number> {
		for (const [i] of this.entries()) {
			yield i;
		}
	}

	/**
	 * FIXME: T pode retornar null também aqui está como as T
	 */
	*entries(): IterableIterator<[number, T]> {
		for (const { index, current } of this.nodeEntries()) {
			yield [index, current.data as T];
		}
	}

	/**
	 * Iterator helper, which iterates over node entries, used by other iterators
	 */
	private *nodeEntries(): IterableIterator<NodeEntry<T>> {
		let current = this.head;
		let index = 0;

		while (current !== null) {
			yield { current, index };

			index++;
			current = current.right;
		}
	}
	/**
	 * Transform each element in a collection modifying its values according to
	 * callback function
	 *
	 * @param {Function} callback call for every item
	 * @return {Collection<Element>}
	 */
	map(callback: (value: T) => T): LinkedList<T> {
		const mappedList = new LinkedList<T>();

		for (const value of this) {
			mappedList.enqueue(callback(value));
		}

		return mappedList;
	}

	/**
	 * Concatenate collections creating a new one
	 * @param {LinkedList<T>} list
	 * @return {LinkedList<T>}
	 */
	concat(list: LinkedList<T>): this {
		for (const value of list) {
			this.enqueue(value);
		}

		return this;
	}
	/**
	 * Partition collection following a criterea function
	 *
	 * @param {Function} fn partition criterea
	 * @return {[Collection<Element>, Collection<Element>]}
	 */
	partition(fn: (value: T) => boolean): [LinkedList<T>, LinkedList<T>] {
		const left = new LinkedList<T>();
		const right = new LinkedList<T>();

		for (const value of this) {
			fn(value) ? left.enqueue(value) : right.enqueue(value);
		}

		return [left, right];
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
		return this._length;
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
	isEmpty(): boolean {
		return this.head === null;
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
		let current = this.head as NonNullable<Node<T>>;
		let i = 0;

		while (i !== index) {
			const { value } = iterator.next();
			precedence = current;
			({ index: i, current } = value);
		}

		const { data } = current;

		// the next node after the removed one
		const following = current.right;

		// the head (index = 0) must be deleted
		if (!precedence) {
			this.head = following;
		} else {
			precedence.right = following;
		}

		following && (following.left = precedence);

		this._length--;
		this.markGarbageCollect(current);

		return data;
	}

	/**
	 * Checks whether some index is out of order
	 * @param {number} index
	 * @return {boolean}
	 */
	private isOutOfIndex(index: number): boolean {
		return index < 0 || index >= this._length;
	}

	/**
	 * Get a data stored at some index or null if empty or out of range
	 *
	 * @throws {ListOutOfRange}
	 * @param {number} index
	 * @return {?T}
	 */
	get(index: number): T | null {
		return this.getNode(index)?.data || null;
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

		for (const entry of this.nodeEntries()) {
			if (entry.index === index) return entry.current;
		}

		return null;
	}

	/**
	 * Retrieve element at some position
	 * @param {number} index
	 * @return {?T}
	 */
	at(index: number): T | null {
		if (index > 0) {
			return this.get(index);
		} else {
			const absIndex = Math.abs(index);

			if (absIndex > this.size()) {
				throw new IndexOutOfRangeException(this.size(), index);
			}

			return this.at(this.size() - absIndex);
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
			this.head = firstNode;
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
	 * Insert a new data at the beginning of the list
	 * @param {T} data
	 * @return {this}
	 */
	push(data: T): this {
		const node: Node<T> = this.createNode(data);

		if (this.head) {
			node.right = this.head;
			this.head.left = node;
		}

		this.head = node;
		this._length++;

		return this;
	}

	/**
	 * Insert a element at the end of the list
	 * @param {T} data
	 * @return {this}
	 */
	enqueue(data: T): this {
		const node = this.createNode(data);

		if (this.head) {
			let lastNode = this.head;

			for (const entry of this.nodeEntries()) {
				lastNode = entry.current;
			}

			lastNode.right = node;
			node.left = lastNode;
		} else {
			this.head = node;
		}

		this._length++;

		return this;
	}
	/**
	 * Remove the first element of the list, which means with index 0
	 * @return {?T}
	 */
	dequeue(): T | null {
		if (!this.head) {
			throw new EmptyListException();
		}

		const { data } = this.head;
		const nodeToBeRemoved = this.head;
		this.head = nodeToBeRemoved.right;
		this.markGarbageCollect(nodeToBeRemoved);

		this._length--;

		return data;
	}

	/**
	 * Remove the last element from the list and return it
	 * @throws EmptyListException
	 * @return {?T}
	 */
	pop(): T | null {
		if (!this.head) {
			throw new EmptyListException();
		}

		let node: NonNullable<Node<T>> = this.head;

		for (const entry of this.nodeEntries()) {
			node = entry.current;
		}

		const { data } = node;

		if (!node.left) {
			this.head = null;
		} else {
			node.left.right = null;
		}

		this._length--;

		this.markGarbageCollect(node);

		return data;
	}

	/**
	 * Remove all elements from the list
	 * @return {this}
	 */
	clear(): this {
		for (const entry of this.nodeEntries()) {
			this.markGarbageCollect(entry.current);
		}
		this.head = null;
		this._length = 0;

		return this;
	}

	/**
	 * Returns the first element of the list
	 * @return {?T}
	 */
	peek(): T | null {
		return this.head?.data ?? null;
	}

	/**
	 *  Returns the last element of the list
	 * @return {?T}
	 */
	tail(): T | null {
		let node: NodeEntry<T> | null = null;
		for (node of this.nodeEntries());

		return node?.current?.data ?? null;
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
	 * Create node for doubly linked list
	 * @param {T} data
	 * @return {!Node<T>}
	 */
	private createNode(data: T): NonNullable<Node<T>> {
		return {
			data,
			right: null,
			left: null,
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
		node.right = node.left = node.data = null;
	}
}
