/**
 * @file Deque data structure, which insert and delete at both ends
 * @version 0.1.0
 */

import type { Deque as DequeADT } from "./types";

/**
 * A Deque is an ordered set of items from which items may be deleted at either
 * end and into which items may be inserted at either end
 */
export default class Deque<T> implements DequeADT<T> {
	/**
	 * Insert item at the left end
	 * @param {T} item
	 */
	insertLeft(item: T): T {
		throw new Error("must be implemented");
	}

	/**
	 * Insert item at the right end
	 * @param {T} item
	 */
	insertRight(item: T): T {
		throw new Error("must be implemented");
	}

	/**
	 * Delete last item from the left end
	 */
	deleteLeft(): T {
		throw new Error("must be implemented");
	}

	/**
	 * Delete last item from the right end
	 */
	deleteRight(): T {
		throw new Error("must be implemented");
	}
}
