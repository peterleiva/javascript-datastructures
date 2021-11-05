import { iterable, Iterable } from "../iterable";
import type { Collection } from "../types";
import type { StackADT as StackADT, Node } from "./types";
import { Underflow } from "./errors";

@iterable
/**
 * A Stack is a linear structure which follows First In Last Out order
 *
 * A queue is an ordered collection os items from  which  items may be deleted
 * and inserted only at the top of the stack (called front of the top). An
 * operation of {@link Stack#pop} and {@link Stack#top} can throws
 * {@link Underflow} exception when the stack is empty
 *
 * @template T
 * @implements {Iterable<T>}
 *
 * @example <caption>Pushing item</caption>
 * const queue = new Stack()
 * queue.push('item') // size === 1
 *
 * @example <caption>Constructing with multiple items</caption>
 * const items = [1, 2, 3, 4]
 * const stack = new Stack(...items)
 * [...stack] // 4, 3, 2, 1
 *
 * @example <caption>Popping item</caption>
 * const queue = new Stack(1, 2)
 * const x = queue.pop() // x === 2
 */
export default class Stack<T> implements StackADT<T>, Collection {
	/**
	 * Head of the stack
	 * @private
	 */
	#top: Node<T>;
	/**
	 * Keeps track of stack size
	 * @private
	 */
	#size: number;

	/**
	 * Initializes new stack
	 */
	constructor(...items: Array<T>) {
		this.#size = 0;
		this.#top = null;

		for (const item of items) {
			this.push(item);
		}
	}

	/**
	 * Returns an iterable of key, value pairs for every entry in collection
	 */
	*entries(): IterableIterator<[number, T]> {
		let node = this.#top;
		let index = 0;

		while (node !== null) {
			yield [index, node.item];
			node = node.next;
			index++;
		}
	}

	/**
	 * Remove all elements from the collection
	 * @return {this}
	 */
	clear(): this {
		this.#size = 0;
		this.#top = null;

		return this;
	}

	/**
	 * Returns the size of the stack
	 * @return {number}
	 */
	size(): number {
		return this.#size;
	}

	/**
	 * Aliasess for {@link Stack#size}
	 * @return {number}
	 */
	get length(): number {
		return this.size();
	}

	/**
	 * return true or false depending whether or not the stack contains any items
	 * @return {boolean}
	 */
	empty(): boolean {
		return this.#top === null;
	}

	/**
	 * Returns the top of the stack
	 *
	 * @throws {Underflow}
	 * @return {T}
	 */
	top(): T {
		if (this.#top === null) {
			throw new Underflow();
		}

		return this.#top.item;
	}

	/**
	 * Insert item at the beginning of the stack
	 *
	 * @param {T} item new data to be inserted
	 * @return {T}
	 */
	push(item: T): T {
		const node = this.getnode(item);
		node.next = this.#top;
		this.#top = node;
		this.#size++;

		return node.item;
	}

	/**
	 * Remove the last item inserted
	 *
	 * @throws {Underflow}
	 * @return {T}
	 */
	pop(): T {
		if (this.#top === null) {
			throw new Underflow();
		}

		const node = this.#top;
		this.#top = node.next;
		this.#size--;

		return node.item;
	}

	/**
	 * Create new node to be inserted at the linked list of items
	 *
	 * @private
	 * @param {T} data
	 * @return {!Node<T>}
	 */
	private getnode(data: T): NonNullable<Node<T>> {
		return {
			item: data,
			next: null,
		};
	}
}

// Due to mixin iterable must define a merged interface for stack
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface Stack<T> extends Iterable<T> {}
