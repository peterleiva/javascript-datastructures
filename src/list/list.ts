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

	constructor(...items: T[]) {
		this.head = null;
		this._length = 0;

		for (const item of items) this.enqueue(item);
	}

	*[Symbol.iterator](): IterableIterator<T> {
		for (const [, data] of this.entries()) {
			yield data;
		}
	}

	*values(): IterableIterator<T> {
		for (const item of this) {
			yield item;
		}
	}

	*keys(): IterableIterator<number> {
		for (const [i] of this.entries()) {
			yield i;
		}
	}

	// FIXME: T pode retornar null também aqui está como as T
	*entries(): IterableIterator<[number, T]> {
		for (const { index, current } of this.nodeEntries()) {
			yield [index, current.data as T];
		}
	}

	private *nodeEntries(): IterableIterator<NodeEntry<T>> {
		let current = this.head;
		let index = 0;

		while (current !== null) {
			yield { current, index };

			index++;
			current = current.right;
		}
	}

	map(fn: (value: T) => T): LinkedList<T> {
		const mappedList = new LinkedList<T>();

		for (const value of this) {
			mappedList.enqueue(fn(value));
		}

		return mappedList;
	}

	/**
	 * Modify the list concatenating a listing to end and returns it
	 */
	concat(list: LinkedList<T>): this {
		for (const value of list) {
			this.enqueue(value);
		}

		return this;
	}

	// reduce(fn: (accumulator: number, currentValue: T) => number, initial: number): T {
	// 	[].reduce
	// }

	partition(fn: (value: T) => boolean): [LinkedList<T>, LinkedList<T>] {
		const left = new LinkedList<T>();
		const right = new LinkedList<T>();

		for (const value of this) {
			fn(value) ? left.enqueue(value) : right.enqueue(value);
		}

		return [left, right];
	}

	indexOf(item: T): number {
		for (const [i, value] of this.entries()) {
			if (Object.is(value, item)) {
				return i;
			}
		}

		return -1;
	}

	toArray(): T[] {
		return [...this];
	}

	get length(): number {
		return this._length;
	}

	/**
	 * alias for .length
	 */
	size(): number {
		return this.length;
	}

	isEmpty(): boolean {
		return this.head === null;
	}

	remove(index: number): T;
	remove(data: T): T;
	remove(comparator: ComparableFn<T>): T | T[];
	remove(criterea: number | ComparableFn<T> | T): null | T | (T | null)[] {
		if (typeof criterea === "number") {
			return this.removeAt(criterea);
		} else {
			const removed: (T | null)[] = [];

			// FIXME: Só itera uma vez quando existe match, devido ao iterator entries
			for (const [i, data] of this.entries()) {
				const matchesCriterea =
					criterea instanceof Function
						? criterea(data as T)
						: Object.is(data, criterea);

				if (matchesCriterea) {
					console.log("before Remove", [...this]);
					removed.push(this.removeAt(i));
					console.log("After Remove", [...this]);
				}
			}

			return removed;
		}
	}

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

	private isOutOfIndex(index: number): boolean {
		return index < 0 || index >= this._length;
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
		return this.getNode(index)?.data || null;
	}

	/**
	 * Returns a node according to index or null if do not exists
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

	join(list: LinkedList<T>, index: number): this {
		throw new Error("Not implemented");

		return this;
	}

	insert(comparator: ComparableFn<T>, ...data: T[]): T | T[];
	insert(index: number, ...data: T[]): T | T[];
	insert(criterea: number | ComparableFn<T>, ...data: T[]): T | T[] | null {
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

	clear(): this {
		for (const entry of this.nodeEntries()) {
			this.markGarbageCollect(entry.current);
		}
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

		return node?.current?.data ?? null;
	}

	// sort(): this {}

	// insertAfter(data: T): T {}

	/**
	 * Linear search on list
	 *
	 * @param data data to be search
	 */
	contains(data: T): boolean {
		for (const item of this) {
			if (Object.is(item, data)) return true;
		}

		return false;
	}

	private createNode(data: T): NonNullable<Node<T>> {
		return {
			data,
			right: null,
			left: null,
		};
	}

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

	private markGarbageCollect(node: NonNullable<Node<T>>) {
		node.right = node.left = node.data = null;
	}
}
